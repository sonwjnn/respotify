'use server'

import { db } from '@/db/drizzle'
import { getSubscription } from '@/db/queries'
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
    return { error: 'Unauthorized' }
  }

  const subscription = await getSubscription()

  if (!subscription?.isActive) {
    return { error: 'Subscription' }
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
      return { error: 'Unauthorized' }
    }

    const subscription = await getSubscription()

    if (!subscription?.isActive) {
      return { error: 'Subscription' }
    }

    const oldPlaylistImage = playlist.imagePath

    if (oldPlaylistImage && oldPlaylistImage !== '/images/playlist.svg') {
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
    return { error: 'Unauthorized' }
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
  revalidatePath(`/playlist/${playlistId}`)
})

export const createLikedPlaylist = cache(async (playlistId: string) => {
  const user = await currentUser()

  if (!user || !user.id) {
    return { error: 'Unauthorized' }
  }

  const existingPlaylist = await db.query.playlists.findFirst({
    where: and(eq(playlists.id, playlistId)),
    with: {
      user: true,
    },
  })

  if (!existingPlaylist) {
    throw new Error('Playlist not found')
  }

  await db.insert(likedPlaylists).values({
    userId: user.id,
    playlistId,
    createdAt: new Date(),
  })

  revalidatePath('/')
  revalidatePath(`/playlist/${playlistId}`)
})

export const updatePlaylist = cache(
  async (values: z.infer<typeof PlaylistSchema>, playlistId: string) => {
    const validatedFields = PlaylistSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: 'Invalid fields!' }
    }

    const { title, description, image } = validatedFields.data

    if (!title || !description || !playlistId) {
      return { error: 'Missing fields!' }
    }
    const user = await currentUser()

    if (!user || !user.id) {
      return { error: 'Unauthorized' }
    }

    const subscription = await getSubscription()

    if (!subscription?.isActive) {
      return { error: 'Subscription' }
    }

    const existingPlaylist = await db.query.playlists.findFirst({
      where: and(eq(playlists.id, playlistId), eq(playlists.userId, user.id)),
    })

    if (!existingPlaylist) {
      throw new Error('Playlist not found')
    }

    const oldImagePath = existingPlaylist.imagePath

    // Delete old image
    if (
      oldImagePath &&
      oldImagePath !== '/images/playlist.svg' &&
      oldImagePath !== image
    ) {
      try {
        await fetch('api/uploadthing', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: existingPlaylist.imagePath,
          }),
        })
      } catch {}
    }

    await db
      .update(playlists)
      .set({
        title,
        description,
        imagePath: image || '/images/playlist.svg',
      })
      .where(
        and(
          eq(playlists.id, existingPlaylist.id),
          eq(playlists.userId, user.id)
        )
      )

    revalidatePath('/')
    revalidatePath(`/playlist/${playlistId}`)
  }
)
