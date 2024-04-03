import jwt from 'jsonwebtoken'

export function validarToken(token: string) {
  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    return true
  } catch (error) {
    return false
  }
}
