'use client'

import type { PlaylistWithUser, SongType } from '@/types'

import { useCurrentUser } from '@/hooks/use-current-user'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { MediaList } from '@/components/media-list'
import { useDebounce } from '@/hooks/use-debounce'
import { useMainLayout } from '@/store/use-main-layout'
import { SearchIcon } from '@/public/icons'
import { getSongsByTitle } from '@/actions/song'
import { Actions } from './actions'

type PlaylistContentProps = {
  playlist: PlaylistWithUser
  likedPlaylists: PlaylistWithUser[]
  playlistSongs: SongType[]
}

export const PlaylistContent = ({
  playlist,
  playlistSongs,
  likedPlaylists,
}: PlaylistContentProps) => {
  const user = useCurrentUser()

  const { width } = useMainLayout()

  // const { playlistSongs } =

  const [value, setValue] = useState<string>('')
  const [songs, setSongs] = useState<SongType[]>([])
  const debouncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    const fetchDataByTitle = async () => {
      // if (!debouncedValue) {
      //   setSongs([])
      //   return
      // }
      const data = await getSongsByTitle(debouncedValue)

      if (data) {
        const playlistSongIds = playlistSongs.map(item => item.id)
        const unplaylistSongs = data.filter(
          song => !playlistSongIds.includes(song.id)
        )

        setSongs(unplaylistSongs)
      }
    }

    fetchDataByTitle()
  }, [debouncedValue, playlistSongs])

  const canAddTrack = user?.id === playlist.userId

  return (
    <>
      <Actions
        playlist={playlist}
        likedPlaylists={likedPlaylists}
        songs={playlistSongs}
      />

      <MediaList songs={playlistSongs} playlist={playlist} type="playlist" />

      {canAddTrack && (
        <>
          <div className="mb-4 px-6">
            <div className='relative mt-2 line-clamp-2 w-full py-6 text-3xl font-semibold text-zinc-600 before:absolute  before:left-0 before:top-0 before:h-[1px] before:w-full before:bg-neutral-800  before:content-[""] dark:text-white'>
              Lets find content for your playlist !
            </div>
            <Input
              placeholder="Search for your song to want to listen to !"
              value={value}
              onChange={e => setValue(e.target.value)}
              className={`w-[40%] rounded-full px-4 pl-10  ${
                width <= 780 && 'w-[60%]'
              } ${width <= 550 && 'w-full'}`}
              startIcon={
                <SearchIcon
                  size={18}
                  className="text-zinc-600 dark:text-white"
                />
              }
            />
          </div>

          <MediaList
            type="search"
            playlist={playlist}
            songs={songs}
            hasAddTrackBtn
          />
        </>
      )}
    </>
  )
}
