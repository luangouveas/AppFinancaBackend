import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { CategoriaProps, LancamentoProps, UsuarioProps } from './utils/types'
import {
  buscarLancamentosRecentes,
  cadastrarLancamento,
  buscarTiposLancamento,
} from './services/Lancamento_Service'
import UsuarioService from './services/Usuario_Service'
import CategoriaService from './services/Categoria_Service'

export async function routes(fastify: FastifyInstance) {
  fastify.get(
    '/status',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return reply.send({ status: 'API Online' })
    },
  )

  fastify.get(
    '/tiposLancamento',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const response = await buscarTiposLancamento()
      return reply.send(response)
    },
  )

  fastify.get(
    '/ultimosLancamentos',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { idUsuario, qtd_dias } = request.query as {
        idUsuario: string
        qtd_dias: number
      }
      const response = await buscarLancamentosRecentes(idUsuario, qtd_dias)
      return reply.send(response)
    },
  )

  fastify.get(
    '/dadosUsuario',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { idUsuario } = request.query as { idUsuario: string }
      const response = await new UsuarioService().buscarDadosUsuario(idUsuario)
      return reply.send(response)
    },
  )

  fastify.get(
    '/categorias',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { idUsuario } = request.query as { idUsuario: string }
      const response = await new CategoriaService().buscarListaDeCategorias(
        idUsuario,
      )
      return reply.send(response)
    },
  )

  fastify.post(
    '/autenticar',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password } = request.body as {
        email: string
        password: string
      }
      const response = await new UsuarioService().autenticar(email, password)
      return reply.send(response)
    },
  )

  fastify.post(
    '/cadastrarUsuario',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const novo_usuario = request.body as UsuarioProps
      console.log(novo_usuario)
      const response = await new UsuarioService().criarUsuario(novo_usuario)
      return reply.send(response)
    },
  )

  fastify.post(
    '/novoLancamento',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const novo_lancamento = request.body as LancamentoProps
      const response = await cadastrarLancamento(novo_lancamento)
      return reply.send(response)
    },
  )

  fastify.post(
    '/novaCategoria',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const nova_categoria = request.body as CategoriaProps
      const response = await new CategoriaService().cadastrarCategoria(
        nova_categoria,
      )
      return reply.send(response)
    },
  )

  fastify.post(
    '/atualizarCategoria',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const categoria = request.body as CategoriaProps
      const response = await new CategoriaService().atualizarCategoria(
        categoria,
      )
      return reply.send(response)
    },
  )

  fastify.post(
    '/excluirCategoria',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.query as { id: string }
      const response = await new CategoriaService().excluirCategoria(id)
      return reply.send(response)
    },
  )
}
