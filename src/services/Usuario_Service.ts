import prisma from '../utils/prisma'
import { hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UsuarioProps } from '../utils/types'

export default class UsuarioService {
  buscarDadosUsuario = async (id: string) => {
    const dados = await prisma.dadosUsuario.findFirst({
      where: {
        id: id,
      },
    })

    const gastos = await prisma.lancamento.findMany({
      where: {
        codigoTipoLancamento: 2,
        idUsuario: id,
      },
    })

    let ttDespesa = 0

    gastos.map((desp) => {
      return (ttDespesa += desp.valor)
    })

    return {
      id: dados?.id,
      email: dados?.email,
      nome: dados?.nome,
      saldo: dados?.saldo,
      gastos: ttDespesa,
    }
  }

  autenticar = async (email: string, password: string) => {
    const usuario = await prisma.dadosUsuario.findFirst({
      where: {
        AND: {
          email: email,
        },
      },
    })

    if (!usuario) {
      throw new Error('Credenciais incorretas')
    }

    const isPasswordValid = await compare(password, usuario.hashSenha)

    if (!isPasswordValid) {
      throw new Error('Credenciais incorretas')
    }

    const jwtToken = jwt.sign(
      { sub: usuario.id, name: usuario.nome },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' },
    )

    const expiresDate = new Date()
    expiresDate.setDate(expiresDate.getDate() + 1)

    return {
      success: true,
      message: 'Usuário autenticado com sucesso.',
      data: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        token: jwtToken,
        expires: expiresDate,
      },
    }
  }

  criarUsuario = async (novo_usuario: UsuarioProps) => {
    let usuario = await prisma.dadosUsuario.findFirst({
      where: {
        email: novo_usuario.email,
      },
    })

    if (usuario) {
      throw new Error('Já existe uma conta com este email.')
    }

    const senhaCriptografada = await hash(novo_usuario.hashSenha, 10)
    usuario = await prisma.dadosUsuario.create({
      data: {
        nome: novo_usuario.nome,
        email: novo_usuario.email,
        hashSenha: senhaCriptografada,
        saldo: 0,
      },
    })

    return usuario
  }
}
