import { db } from '@/db/drizzle'
import { accounts } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.userId, userId),
    })

    return account
  } catch {
    return null
  }
}
