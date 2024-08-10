import { PlaylistWithUser, SongType } from '@/types'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { LikeButton } from './like-button'
import { PlayButton } from '@/components/play-button'
import { useOnPlay } from '@/hooks/use-on-play'
import { usePlayer } from '@/store/use-player'
import { usePlayingView } from '@/store/use-playing-view'
import { useSelectedPlayer } from '@/store/use-selected-player'

import { Dots } from './dots'
import { useCurrentUser } from '@/hooks/use-current-user'

type ActionsProps = {
  playlist: PlaylistWithUser
  likedPlaylists: PlaylistWithUser[]
  songs: SongType[]
}

export const Actions = ({ playlist, songs, likedPlaylists }: ActionsProps) => {
  const user = useCurrentUser()
  const onPlay = useOnPlay(songs)
  const {
    playlistPlayingId,
    isPlaying: isPlayerPlaying,
    setPlaylistActiveId,
    handlePlay,
  } = usePlayer()
  const { resetMaxWidth } = usePlayingView()
  const { setSelected } = useSelectedPlayer()

  const [isPlaying, setPlaying] = useState(false)
  const params = useParams()

  useEffect(() => {
    if (playlistPlayingId?.toString() === params.id) {
      setPlaying(isPlayerPlaying)
    }
  }, [isPlayerPlaying, playlistPlayingId, params.id])

  const handleClickPlay = (): void => {
    if (playlistPlayingId?.toString() !== params.id && songs?.length !== 0) {
      setPlaylistActiveId(params.id as string)
      resetMaxWidth()
      onPlay(songs[0]?.id!)
    } else {
      setSelected(true)
      handlePlay()
    }
  }

  const isOtherUser = user?.id !== playlist?.userId
  const isCurrentUser = user?.id === playlist?.userId

  return (
    <div className="relative flex w-full gap-x-6 p-5 px-10">
      <div
        style={{ backgroundColor: `${playlist?.bgColor}` }}
        className="header-bg-img-md-light dark:header-bg-img-md absolute inset-x-0 top-0 z-0 h-[232px]"
      ></div>
      <PlayButton
        className="h-14 w-14 translate-y-0 opacity-100"
        onClick={handleClickPlay}
        isPlaying={isPlaying}
      />
      {/* <MediaDropdown /> */}
      {isOtherUser && (
        <div className="z-10 flex h-14 w-14 items-center justify-center">
          <LikeButton likedPlaylists={likedPlaylists} size={36} />
        </div>
      )}
      {isCurrentUser && <Dots data={playlist} />}
    </div>
  )
}
