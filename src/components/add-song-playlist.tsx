'use client'

import { useTransition } from 'react'
import { toast } from 'react-hot-toast'

import { usePlaylist } from '@/store/use-playlist'
import type { PlaylistType, SongType } from '@/types/types'

import { Spinner } from '@/components/spinner'
import { Tooltip } from '@/components/ui/tooltip'
import { AiOutlinePlus } from 'react-icons/ai'
import { createSongOfPlaylist } from '@/actions/song'

type AddSongPlaylistProps = {
  song: SongType
  playlist: PlaylistType
}

export const AddSongPlaylist = ({ song, playlist }: AddSongPlaylistProps) => {
  const { addPlaylistSong } = usePlaylist()

  const [isPending, startTransition] = useTransition()

  const handleLike = async () => {
    startTransition(() => {
      createSongOfPlaylist(song.id, playlist.id)
        .then(response => {
          if (!response) {
            toast.error('Failed to add song of playlist')
            return
          }

          addPlaylistSong(song)
          toast.success('Added!')
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  return (
    <Tooltip text="Add to playlist">
      <div
        onClick={handleLike}
        className={`flex h-8 min-w-[50px] cursor-pointer items-center justify-center rounded-full border border-neutral-400 bg-transparent p-2  font-semibold text-white  transition hover:scale-105 active:scale-100 ${
          isPending ? 'cursor-not-allowed opacity-50' : null
        }`}
      >
        {isPending ? <Spinner /> : <AiOutlinePlus color="#a3a3a3" />}
      </div>
    </Tooltip>
  )
}
