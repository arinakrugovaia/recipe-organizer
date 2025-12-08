import NextAuth from 'next-auth'
import { ZodError } from 'zod'
import bcrypt from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import { getUserFromDb } from '@/shared/lib/user'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/shared/lib/prisma'
import { signInSchema } from '@/schema/zod'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required.')
          }

          const { email, password } = await signInSchema.parseAsync(credentials)

          const user = await getUserFromDb(email)

          if (!user) {
            throw new Error('Invalid credentials.')
          }

          const isPasswordValid = await bcrypt.compare(password, user.password)

          if (!isPasswordValid) {
            throw new Error('Invalid credentials.')
          }

          return { id: user.id, email: user.email }
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 10800,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
