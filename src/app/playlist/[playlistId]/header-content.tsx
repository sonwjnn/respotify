'use client'

import { useCallback } from 'react'
import { FiEdit2 } from 'react-icons/fi'

import { useMainLayout } from '@/store/use-main-layout'
import { usePlaylist } from '@/store/use-playlist'
import { cn } from '@/lib/utils'
import { getDurationSong } from '@/utils/duration-convertor'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useModal } from '@/store/use-modal-store'
import { ImageLazy } from '@/components/ui/image'
import { PlaylistWithUser } from '@/types/types'

type Props = {
  playlist: PlaylistWithUser
  likedCount: number
}

export const HeaderContent = ({ playlist, likedCount }: Props) => {
  const { open } = useModal()

  const { playlistSongs } = usePlaylist()
  const { width } = useMainLayout()
  const user = useCurrentUser()

  const onClick = () => {
    if (user?.id !== playlist?.userId) return

    if (!user) {
      return
    }

    open('editPlaylist', { playlist })
  }

  const totalDuration = useCallback(() => {
    const duration = playlistSongs.reduce((acc, song) => {
      const duration = song?.duration || 0
      return acc + duration
    }, 0)

    return getDurationSong({ milliseconds: duration, type: 'long' })
  }, [playlistSongs])

  return (
    <div className="flex flex-col  items-center gap-x-5  md:flex-row md:items-end">
      <div
        className={cn(
          ` group relative flex h-[232px] w-[232px] items-center justify-center rounded-sm bg-[#282828] text-white shadow-base `,
          width <= 875 && '!h-[192px] !w-[192px]'
        )}
        onClick={onClick}
      >
        {user?.id === playlist?.userId ? (
          <div className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-sm bg-[rgba(0,0,0,.7)] opacity-0 transition group-hover:opacity-100">
            <FiEdit2 size={36} color="#ffffff" />
            <p className="text-base text-white">Choose photo</p>
          </div>
        ) : null}
        <div
          className={cn(
            'relative aspect-square h-full w-full overflow-hidden rounded-sm'
          )}
        >
          <ImageLazy
            src={playlist?.imagePath || '/images/playlist.svg'}
            alt="playlist image"
          />
        </div>
      </div>
      <div className="mt-4 flex  flex-col gap-y-3 md:mt-0 md:gap-y-6">
        <p className="hidden text-base text-white   md:block">Playlist</p>
        <div
          onClick={onClick}
          className={cn(
            'line-clamp-3 text-center text-7xl font-bold text-white md:text-left',
            user?.id === playlist?.userId && 'cursor-pointer hover:underline',
            width <= 1012 && '!text-5xl',
            width <= 901 && '!text-3xl'
          )}
        >
          {playlist?.title || 'Playlist Title'}
        </div>
        <div className="flex flex-col items-center gap-y-2 md:items-start ">
          {playlist?.description && (
            <p className="hidden text-sm text-desc  md:block">
              {playlist?.description}
            </p>
          )}
          <div className="flex gap-x-2 text-sm text-white">
            <p>{`${playlist?.user?.name || 'No name'} - ${likedCount} likes - ${playlistSongs?.length} songs
            `}</p>
            <p className="text-desc">{`${totalDuration()}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
