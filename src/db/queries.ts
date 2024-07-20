import { db } from '@/db/drizzle'
import { userSubscription } from '@/db/schema'

import {
  likedPlaylists,
  likedSongs,
  playlistSongs,
  playlists,
  songs,
} from '@/db/schema'
import { eq, ilike } from 'drizzle-orm'
import { cache } from 'react'
import { getSelf } from '@/data/auth'

export const getSongs = cache(async () => {
  try {
    const songs = await db.query.songs.findMany()
    return songs
  } catch (error) {
    return null
  }
})

export const getUserSongs = cache(async () => {
  const self = await getSelf()

  if (!self || !self.id) {
    return null
  }
  const data = await db.query.songs.findMany({
    where: eq(songs.userId, self.id),
    orderBy: (songs, { asc }) => [asc(songs.createdAt)],
  })
  return data
})

export const getSongsByTitle = cache(async (title: string) => {
  const data = await db.query.songs.findMany({
    where: ilike(songs.title, title),
    orderBy: (songs, { desc }) => [desc(songs.createdAt)],
  })
  return data
})

export const getLikedSongs = cache(async () => {
  const self = await getSelf()

  if (!self || !self.id) {
    return null
  }

  const data = await db.query.likedSongs.findMany({
    where: eq(likedSongs.userId, self.id),
    with: {
      song: true,
    },
    orderBy: (likedSongs, { desc }) => [desc(likedSongs.createdAt)],
  })

  if (!data) return []

  return data.map(item => ({
    ...item.song,
  }))
})

export const getPlaylists = cache(async () => {
  const data = await db.query.playlists.findMany()
  return data
})

export const getLikedPlaylists = cache(async () => {
  const self = await getSelf()

  if (!self || !self.id) {
    return null
  }

  const data = await db.query.likedPlaylists.findMany({
    where: eq(likedPlaylists.userId, self.id),
    with: {
      playlist: {
        with: {
          user: true,
        },
      },
    },
    orderBy: (likedPlaylists, { desc }) => [desc(likedPlaylists.createdAt)],
  })

  if (!data) return []

  return data.map(item => ({
    ...item.playlist,
  }))
})

export const getPlaylistById = cache(async (id: string) => {
  const data = await db.query.playlists.findFirst({
    where: eq(playlists.id, id),
    with: {
      user: true,
    },
  })
  return data
})

export const getUserPlaylists = cache(async () => {
  const self = await getSelf()

  if (!self || !self.id) {
    return null
  }

  const data = await db.query.playlists.findMany({
    where: eq(playlists.userId, self.id),
    with: {
      user: true,
    },
    orderBy: (playlists, { desc }) => [desc(playlists.createdAt)],
  })

  return data
})

export const getSongsByPlaylistId = cache(async (playlistId: string) => {
  const data = await db.query.playlistSongs.findMany({
    where: eq(playlistSongs.playlistId, playlistId),
    with: {
      song: true,
    },
    orderBy: (playlistSongs, { desc }) => [desc(playlistSongs.createdAt)],
  })
  return data.map(item => ({
    ...item.song,
  }))
})

const DAY_IN_MS = 86_400_000

export const getUserSubscription = cache(async () => {
  const self = await getSelf()

  if (!self || !self.id) {
    return null
  }

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, self.id),
  })

  if (!data) return null

  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return { ...data, isActive: !!isActive }
})
