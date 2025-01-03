import { sign, verify } from 'jsonwebtoken'

export const signJwt = (payload: object) => {
  return sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: "1d"}
  )
}

export const verifyJWT = (token: string) => {
  return verify(token, process.env.JWT_SECRET as string)
}