import { JWT } from '@auth/core/jwt'
import NextAuth, { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  // isTwoFactorEnabled: boolean
  isOAuth: boolean
  isSubscribed: boolean
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends ExtendedUser {}
}
