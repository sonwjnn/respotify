'use client'

import { SidebarSheet } from '@/components/sheets/sidebar-sheet'
import { PlaylistWithUser, SongType } from '@/types'
import { useMountedState } from 'react-use'

type Props = {
  playlists: PlaylistWithUser[]
  likedSongs: SongType[]
}

export const Sheets = ({ playlists, likedSongs }: Props) => {
  const isMounted = useMountedState()

  if (!isMounted) return null

  return (
    <>
      <SidebarSheet playlists={playlists} likedSongs={likedSongs} />
    </>
  )
}
