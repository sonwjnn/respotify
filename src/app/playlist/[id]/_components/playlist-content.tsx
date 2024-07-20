'use client'

import { useEffect } from 'react'

import { usePlaylist } from '@/store/use-playlist'
// import { useUser } from '@/hooks/use-user'
import type { PlaylistType, PlaylistWithUser, SongType } from '@/types/types'

import { SearchPlaylist } from './search-playlist'
import { SongPlaylist } from './song-playlist'
import { useCurrentUser } from '@/hooks/use-current-user'

type PlaylistContentProps = {
  playlist: PlaylistWithUser
  playlistSongs: SongType[]
}

export const PlaylistContent = ({
  playlist,
  playlistSongs,
}: PlaylistContentProps) => {
  // const { user } = useUser()
  const user = useCurrentUser()

  const { setPlaylist, setPlaylistSongs } = usePlaylist()

  useEffect(() => {
    setPlaylist(playlist)
  }, [playlist])

  useEffect(() => {
    setPlaylistSongs(playlistSongs)
  }, [playlistSongs])

  return (
    <>
      <SongPlaylist />
      {user?.id === playlist.userId ? <SearchPlaylist /> : null}
    </>
  )
}
