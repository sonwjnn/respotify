'use server'

import { db } from '@/db/drizzle'
import { likedPlaylists, playlists } from '@/db/schema'
import { currentUser } from '@/lib/auth'
import { PlaylistSchema } from '@/schemas'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import { z } from 'zod'

export const createPlaylist = cache(async () => {
  const user = await currentUser()

  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  const [data] = await db
    .insert(playlists)
    .values({
      userId: user.id,
      title: `My new playlist`,
      description: 'playlist description',
      bgColor: '#525252',
      createdAt: new Date(),
    })
    .returning()

  revalidatePath('/')

  return data
})

export const deletePlaylist = cache(
  async (playlist: typeof playlists.$inferSelect) => {
    const user = await currentUser()

    if (!user || !user.id) {
      throw new Error('Unauthorized')
    }

    const oldPlaylistImage = playlist.imagePath

    if (oldPlaylistImage && oldPlaylistImage !== '/images/note.svg') {
      await fetch('api/uploadthing', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: playlist.imagePath,
        }),
      })
    }

    await db
      .delete(playlists)
      .where(and(eq(playlists.id, playlist.id), eq(playlists.userId, user.id)))

    revalidatePath('/')
  }
)

export const deleteLikedPlaylist = cache(async (playlistId: string) => {
  const user = await currentUser()

  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  await db
    .delete(likedPlaylists)
    .where(
      and(
        eq(likedPlaylists.playlistId, playlistId),
        eq(likedPlaylists.userId, user.id)
      )
    )

  revalidatePath('/')
})

export const createLikedPlaylist = cache(async (playlistId: string) => {
  const user = await currentUser()

  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }

  const existingPlaylist = await db.query.playlists.findFirst({
    where: and(eq(playlists.id, playlistId), eq(playlists.userId, user.id)),
    with: {
      user: true,
    },
  })

  if (!existingPlaylist) {
    throw new Error('Playlist not found')
  }

  const data = await db.insert(likedPlaylists).values({
    userId: user.id,
    playlistId,
    createdAt: new Date(),
  })

  return existingPlaylist
})

export const updatePlaylist = cache(
  async (values: z.infer<typeof PlaylistSchema>, playlistId: string) => {
    const validatedFields = PlaylistSchema.safeParse(values)

    if (!validatedFields.success) {
      throw new Error('Invalid fields!')
    }

    const { title, description, image } = validatedFields.data

    if (!title || !description || !playlistId) {
      throw new Error('Missing fields!')
    }
    const user = await currentUser()

    if (!user || !user.id) {
      throw new Error('Unauthorized')
    }

    const existingPlaylist = await db.query.playlists.findFirst({
      where: and(eq(playlists.id, playlistId), eq(playlists.userId, user.id)),
    })

    if (!existingPlaylist) {
      throw new Error('Playlist not found')
    }

    const oldImagePath = existingPlaylist.imagePath

    // Delete old image
    if (oldImagePath && oldImagePath !== '/images/note.svg') {
      await fetch('api/uploadthing', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: existingPlaylist.imagePath,
        }),
      })
    }

    const [data] = await db
      .update(playlists)
      .set({
        title,
        description,
        imagePath: image || '/images/note.svg',
      })
      .where(
        and(
          eq(playlists.id, existingPlaylist.id),
          eq(playlists.userId, user.id)
        )
      )
      .returning()

    // revalidatePath('/')

    return data
  }
)
