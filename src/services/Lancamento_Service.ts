import prisma from '@/utils/prisma'
import { LancamentoProps } from '@/utils/types'

const buscarTiposLancamento = async () => {
  try {
    const tiposLancamento = await prisma.tipoLancamento.findMany()
    return tiposLancamento
  } catch (error) {
    throw new Error(error?.message)
  }
}

const buscarLancamentosRecentes = async (
  idUsuario: string,
  qtd_dias: number,
) => {
  try {
    // const ret = await prisma.lancamento.deleteMany()
    // const ret2 = await prisma.dadosUsuario.update({
    //   where: {
    //     id: '66061fd53229e1b5644faf64',
    //   },
    //   data: {
    //     nome: 'Luan Gouveas',
    //     email: 'luan@gmail.com',
    //     hashSenha: '123456',
    //     saldo: 0,
    //   },
    // })

    const today = new Date()
    const data_inicial = new Date(today)
    data_inicial.setDate(data_inicial.getDate() - qtd_dias).toString()

    const lancamentos = await prisma.lancamento.findMany({
      where: {
        AND: {
          idUsuario: idUsuario,
          dataLancamento: {
            lte: today,
            gte: data_inicial,
          },
        },
      },
      orderBy: {
        dataLancamento: 'desc',
      },
    })

    return lancamentos
  } catch (error) {
    throw new Error(error?.message)
  }
}

const cadastrarLancamento = async (novo_lancamento: LancamentoProps) => {
  try {
    let dadosUsuario = await prisma.dadosUsuario.findFirst()

    if (
      dadosUsuario!.saldo === 0 &&
      novo_lancamento.codigoTipoLancamento === 2
    ) {
      throw new Error(
        'Não é possível lançar uma saída com o saldo igual a R$ 0,00',
      )
    }

    const dataLancamento = new Date(novo_lancamento.dataLancamento)
    dataLancamento.setUTCHours(0)
    dataLancamento.setUTCMinutes(0)
    dataLancamento.setUTCSeconds(0)
    dataLancamento.setUTCMilliseconds(0)

    const lancamento = await prisma.lancamento.create({
      data: {
        idUsuario: novo_lancamento.idUsuario,
        idCategoria: novo_lancamento.idCategoria,
        nome: novo_lancamento.nome,
        valor: novo_lancamento.valor,
        dataLancamento: dataLancamento,
        codigoTipoLancamento: novo_lancamento.codigoTipoLancamento,
      },
    })

    if (dadosUsuario!.saldo === 0) {
      dadosUsuario = await prisma.dadosUsuario.update({
        where: {
          id: dadosUsuario!.id,
        },
        data: {
          saldo: novo_lancamento.valor,
        },
      })
    } else {
      const novoSaldo =
        lancamento.codigoTipoLancamento === 1
          ? dadosUsuario!.saldo! + lancamento.valor
          : dadosUsuario!.saldo! - lancamento.valor

      await prisma.dadosUsuario.update({
        where: {
          id: dadosUsuario!.id,
        },
        data: {
          saldo: novoSaldo,
        },
      })
    }

    return lancamento
  } catch (error) {
    throw new Error(error?.message)
  }
}

export { buscarTiposLancamento, buscarLancamentosRecentes, cadastrarLancamento }
