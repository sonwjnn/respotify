import { db } from '@/db/drizzle'

import {
  likedPlaylists,
  likedSongs,
  playlistSongs,
  playlists,
  songs,
  subscriptions,
} from '@/db/schema'
import { eq, ilike } from 'drizzle-orm'
import { cache } from 'react'
import { getSelf } from '@/data/auth'
import { checkIsActive } from '@/lib/utils'

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
  if (title.trim() === '') {
    const allSongs = await db.query.songs.findMany({
      orderBy: (songs, { desc }) => [desc(songs.createdAt)],
    })
    return allSongs
  } else {
    const data = await db.query.songs.findMany({
      where: ilike(songs.title, title),
      orderBy: (songs, { desc }) => [desc(songs.createdAt)],
    })
    return data
  }
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

export const getLikedPlaylistCount = cache(async (id: string) => {
  const data = await db.query.likedPlaylists.findMany({
    where: eq(likedPlaylists.playlistId, id),
  })
  return data.length
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

export const getSubscription = cache(async () => {
  const self = await getSelf()

  if (!self || !self.id) {
    return null
  }

  const data = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, self.id),
  })

  if (!data) return null

  return { ...data, isActive: checkIsActive(data) }
})

export const getSubscriptionByUserId = cache(async (userId: string) => {
  const data = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  })

  if (!data) return null

  return { ...data, isActive: checkIsActive(data) }
})
