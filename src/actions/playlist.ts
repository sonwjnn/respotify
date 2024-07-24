'use server'

import { db } from '@/db/drizzle'
import { likedPlaylists, playlists } from '@/db/schema'
import { currentUser } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'

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

    if (playlist.imagePath) {
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
