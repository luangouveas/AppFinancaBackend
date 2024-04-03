export interface LancamentoProps {
  idUsuario: string
  idCategoria: string
  nome: string
  dataLancamento: string
  valor: number
  codigoTipoLancamento: number
}

export interface CategoriaProps {
  id?: string
  idUsuario: string
  nome: string
}

export interface UsuarioProps {
  id?: string
  nome: string
  email: string
  hashSenha: string
  saldo?: number
}
