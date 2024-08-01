import authConfig from '@/auth.config'
import { getAccountByUserId } from '@/data/account'
// import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { getUserById } from '@/data/user'
import { db } from '@/db/drizzle'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import { getSubscriptionByUserId } from './db/queries'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  // events: {
  //   async linkAccount({ user }) {
  //     await db.users.update({
  //       where: { id: user.id },
  //       data: {
  //         emailVerified: new Date(),
  //       },
  //     })
  //   },
  // },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        return true
      }

      if (!user?.id) {
        return false
      }

      const existingUser = await getUserById(user.id)

      if (!existingUser) return false

      // if (!existingUser?.emailVerified) return false

      // if (existingUser.isTwoFactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      //     existingUser.id
      //   )

      //   if (!twoFactorConfirmation) return false

      // Delete two factor confirmation for next sign in
      // await db.twoFactorConfirmation.delete({
      //   where: { id: twoFactorConfirmation.id },
      // })
      // }
      return true
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }

      if (session.user) {
        session.user.name = token.name
        // session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
        session.user.isSubscribed = token.isSubscribed as boolean
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      const existingSubscription = await getSubscriptionByUserId(
        existingUser.id
      )

      token.isOAuth = !!existingAccount
      token.isSubscribed = !!existingSubscription?.isActive
      token.name = existingUser.name
      token.email = existingUser.email
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
