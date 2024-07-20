'use client'

import { useEffect, useState } from 'react'

import { usePlayer } from '@/store/use-player'
// import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
// import type { Playlist, Song } from '@/types/types'
import { cn } from '@/lib/utils'

import { GlobalLoading } from '@/components/loading-layout/global-loading'
import { PlayingView } from '@/components/playing-view'
import { Sidebar } from '@/components/sidebar'
import { MainLayout } from '@/components/main-content/main-layout'
import { useCurrentUser } from '@/hooks/use-current-user'
import { playlists, songs } from '@/db/schema'

type MainContentProps = {
  children: React.ReactNode
  songs: (typeof songs.$inferSelect)[] | null
  playlists: (typeof playlists.$inferSelect)[] | null
  likedSongs: (typeof songs.$inferSelect)[] | null
  likedPlaylists: (typeof playlists.$inferSelect)[] | null
}

export const MainContent = ({
  children,
  playlists,
  likedSongs,
  likedPlaylists,
}: MainContentProps) => {
  const player = usePlayer()
  // const { user } = useUser()
  const user = useCurrentUser()
  const { setPlaylists, setLikedSongs, setLikedPlaylists } = useUserStore()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    setPlaylists(playlists || [])
  }, [playlists, setPlaylists])

  useEffect(() => {
    setLikedPlaylists(likedPlaylists || [])
  }, [likedPlaylists, setLikedPlaylists])

  useEffect(() => {
    setLikedSongs(likedSongs || [])
  }, [likedSongs, setLikedSongs])

  if (!mounted) {
    return <GlobalLoading />
  }

  return (
    <div
      className={cn(`flex h-full flex-row`, {
        'h-[calc(100%-80px)]': user && player.activeId,
      })}
    >
      <Sidebar />

      <MainLayout>
        <main className="relative h-full grow overflow-y-auto bg-white py-2 dark:bg-black">
          {children}
        </main>
      </MainLayout>

      <PlayingView />
    </div>
  )
}
