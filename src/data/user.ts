import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })
    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    })
    return user
  } catch (error) {
    return null
  }
}

export const getUserByUsername = async (name: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.name, name),
    })

    return user
  } catch (error) {
    return null
  }
}
