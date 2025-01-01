import { sign } from 'jsonwebtoken'

export const signJwt = (payload: object) => {
  return sign(
    payload,
    process.env.JWT_SECRET as string,
    { expiresIn: "1d"}
  )
}
