'use server'

import { SongSchema } from '@/schemas'
import { z } from 'zod'
import { db } from '@/db/drizzle'
import { likedSongs, playlistSongs, songs } from '@/db/schema'
import { currentUser } from '@/lib/auth'
import { cache } from 'react'
import { revalidatePath } from 'next/cache'
import { and, eq, ilike } from 'drizzle-orm'

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

export const createLikedSong = cache(async (songId: string) => {
  const user = await currentUser()

  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  const data = await db.insert(likedSongs).values({
    userId: user.id,
    songId,
    createdAt: new Date(),
  })

  return data
})

export const deleteLikedSong = cache(async (songId: string) => {
  const user = await currentUser()

  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  const data = await db
    .delete(likedSongs)
    .where(and(eq(likedSongs.songId, songId), eq(likedSongs.userId, user.id)))

  return data
})

export const createSongOfPlaylist = cache(
  async (songId: string, playlistId: string) => {
    const user = await currentUser()

    if (!user || !user.id) {
      throw new Error('Unauthorized')
    }

    const data = await db.insert(playlistSongs).values({
      playlistId,
      songId,
      createdAt: new Date(),
    })

    return data
  }
)

export const deleteSongOfPlaylist = cache(
  async (songId: string, playlistId: string) => {
    const user = await currentUser()

    if (!user || !user.id) {
      throw new Error('Unauthorized')
    }

    const data = await db
      .delete(playlistSongs)
      .where(
        and(
          eq(playlistSongs.songId, songId),
          eq(playlistSongs.playlistId, playlistId)
        )
      )

    return data
  }
)

export const getSongsByTitle = cache(async (title: string) => {
  const data = await db.query.songs.findMany({
    where: ilike(songs.title, `%${title}%`),
    orderBy: (songs, { desc }) => [desc(songs.createdAt)],
  })

  return data
})
