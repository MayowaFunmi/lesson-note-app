import CredentialsProvider from "next-auth/providers/credentials";
import apiEndpointCalls from './apiEndpointCalls'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Crdentials",
      credentials: {
        username: { label: "username", type: "username", placeholder: "username/email/phone number"},
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Email/username/phone number and Password are required");
        }

        try {
          const response = await apiEndpointCalls.signIn({
            username: credentials.username,
            password: credentials.password
          })
          const { user, data } = response.data;
          if (user && data) {
            const res = { ...user, data }
            return res;
          } else {
            throw new Error("Invalid login response")
          }
        } catch (error) {
          throw new Error("error occurred: ", error)
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user }
      }
      return token
    },

    async session({ session, token }) {
      session.user = token
      return session
    }
  }
}