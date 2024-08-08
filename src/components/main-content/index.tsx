'use client'

import { cn } from '@/lib/utils'

import { PlayingView } from '@/components/playing-view'
import { Sidebar } from '@/components/sidebar'
import { MainLayout } from '@/components/main-content/main-layout'
import { songs } from '@/db/schema'
import { PlaylistWithUser } from '@/types/types'
import { MusicPlayer } from '@/components/music-player'
import { GlobalLoading } from '@/components/loading-layout/global-loading'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/use-user-store'

type Props = {
  children: React.ReactNode
  playlists: PlaylistWithUser[]
  likedPlaylists: PlaylistWithUser[]
  likedSongs: (typeof songs.$inferSelect)[]
}

export const MainContent = ({
  children,
  likedPlaylists,
  playlists,
  likedSongs,
}: Props) => {
  const [mounted, setMounted] = useState(false)
  const { setLikedSongs } = useUserStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setLikedSongs(likedSongs)
  }, [likedSongs, setLikedSongs])

  if (!mounted) {
    return <GlobalLoading />
  }
  return (
    <>
      <div
        className={cn(
          `flex h-full flex-row`,
          // user && player.activeId && 'h-[calc(100%-80px)]'
          'h-[calc(100%-80px)]'
        )}
      >
        <Sidebar
          playlists={[...playlists, ...likedPlaylists]}
          likedSongs={likedSongs}
        />

        <MainLayout>
          <main className="relative h-full grow overflow-y-auto bg-white py-2 dark:bg-black">
            {children}
          </main>
        </MainLayout>

        <PlayingView />
      </div>
      <MusicPlayer />
    </>
  )
}
