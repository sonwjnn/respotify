'use server'

import { SongSchema } from '@/schemas'
import { z } from 'zod'
import { db } from '@/db/drizzle'
import { songs } from '@/db/schema'
import { currentUser } from '@/lib/auth'
import { cache } from 'react'
import { revalidatePath } from 'next/cache'

export const createSong = cache(
  async (values: z.infer<typeof SongSchema>, duration: number | undefined) => {
    const validatedFields = SongSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: 'Invalid fields!' }
    }

    const { title, author, song, image } = validatedFields.data

    if (!title || !author || !song) {
      return { error: 'Missing field!' }
    }

    if (!duration) {
      return { error: 'Invalid duration!' }
    }

    const user = await currentUser()

    if (!user || !user.id) {
      throw new Error('Unauthorized')
    }

    const data = await db.insert(songs).values({
      title,
      author,
      userId: user.id,
      imagePath: image || '/images/note.svg',
      songPath: song,
      duration,
      createdAt: new Date(),
    })

    if (!data) {
      throw new Error('Failed to create song')
    }

    revalidatePath('/')
    revalidatePath('/search')
  }
)
