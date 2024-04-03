import prisma from '@/utils/prisma'
import { CategoriaProps } from '@/utils/types'

export default class CategoriaService {
  buscarListaDeCategorias = async (idUsuario: string) => {
    try {
      const categorias = await prisma.categoria.findMany({
        where: {
          idUsuario: idUsuario,
        },
      })

      return categorias
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  cadastrarCategoria = async (nova_categoria: CategoriaProps) => {
    try {
      let categoria = await prisma.categoria.findFirst({
        where: {
          nome: nova_categoria.nome,
          idUsuario: nova_categoria.idUsuario,
        },
      })

      if (categoria) {
        throw new Error('Já existe uma categoria com esse nome.')
      }

      categoria = await prisma.categoria.create({
        data: {
          nome: nova_categoria.nome,
          idUsuario: nova_categoria.idUsuario,
        },
      })

      return categoria
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  atualizarCategoria = async (categoria: CategoriaProps) => {
    if (!categoria.id) {
      throw new Error(
        'Erro inesperado: Não foi possivel atualizar a categoria.',
      )
    }

    let cat = await prisma.categoria.findFirst({
      where: {
        id: categoria.id,
      },
    })

    if (cat) {
      cat = await prisma.categoria.update({
        where: {
          id: cat.id,
        },
        data: {
          nome: categoria.nome,
        },
      })

      return cat
    } else {
      throw new Error(
        'Erro inesperado: Não foi possivel atualizar a categoria.',
      )
    }
  }

  excluirCategoria = async (id: string) => {
    try {
      await prisma.categoria.delete({
        where: {
          id: id,
        },
      })
      return { message: 'Categoria excluida com sucesso' }
    } catch (error) {
      throw new Error('Erro ao tentar excluir a categoria')
    }
  }
}
