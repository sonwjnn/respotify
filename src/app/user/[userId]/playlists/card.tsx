'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { usePlayer } from '@/store/use-player'
import { MusicNote } from '@/public/icons'
import { PlaylistType } from '@/types'

import { PlayButton } from '@/components/play-button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { ImageLazy } from '@/components/ui/image'

type CardProps = {
  data: PlaylistType
  onClick?: (id: string) => void
  type: 'track' | 'playlist'
}

export const Card = ({
  data,
  // onClick,
  type = 'track',
}: CardProps) => {
  const { currentTrack, isPlaying, handlePlay } = usePlayer()
  const user = useCurrentUser()
  const router = useRouter()

  const isPlayingCurrentTrack = currentTrack?.id === data.id && isPlaying

  return (
    <div
      onClick={() => router.push(`/playlist/${data.id}`)}
      className="group relative mb-3 flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-4 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md shadow-base">
        <ImageLazy
          src={data.imagePath || '/images/playlist.svg'}
          alt="song img"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold text-zinc-600 dark:text-white">
          {data.title}
        </p>
        <p className="w-full truncate pb-4 text-sm text-zinc-500 dark:text-neutral-400">
          By {user?.name}
        </p>
      </div>
      <div className="absolute bottom-[102px] right-6">
        <PlayButton onClick={handlePlay} isPlaying={isPlayingCurrentTrack} />
      </div>
    </div>
  )
}
