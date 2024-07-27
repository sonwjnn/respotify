'use server'

import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import { currentUser } from '@/lib/auth'
import { UserSchema } from '@/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const updateUser = async (values: z.infer<typeof UserSchema>) => {
  const validatedFields = UserSchema.safeParse(values)

  if (!validatedFields.success) {
    throw new Error('Invalid fields!')
  }

  const { name, image } = validatedFields.data

  if (!name) {
    throw new Error('Missing fields!')
  }

  const user = await currentUser()

  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  const [data] = await db
    .update(users)
    .set({
      name,
      image: image || '/images/user.svg',
    })
    .where(eq(users.id, user.id))
    .returning()

  return data
}
