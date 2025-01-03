// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string
      id: string
      username: string
      emailVerified: boolean
      phoneNumber: string
      password: string
      dateJoined: string
      updatedAt: string
      data: string // token
      iat: number
      exp: number
      jti: string
    }
  }
}