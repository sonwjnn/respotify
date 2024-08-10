'use client'

import { usePlayer } from '@/store/use-player'
import { SongType } from '@/types'

import { PlayButton } from '@/components/play-button'
import { useInView } from 'react-intersection-observer'
import { ImageLazy } from './ui/image'

type SongCardProps = {
  data: SongType
  onClick: (id: string) => void
}

export const SongCard = ({ data, onClick }: SongCardProps) => {
  const { currentTrack, isPlaying, handlePlay } = usePlayer()
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })

  const isPlayingCurrentTrack = currentTrack?.id === data.id && isPlaying
  return (
    <div
      onClick={() => onClick(data.id)}
      className="group relative mb-3 flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-4 transition hover:bg-neutral-400/10"
      ref={ref}
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md shadow-base">
        <ImageLazy
          src={inView ? data.imagePath : '/images/song.svg'}
          alt="song img"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold text-zinc-600 dark:text-white">
          {data.title}
        </p>
        <p className="w-full truncate pb-4 text-sm text-zinc-500 dark:text-neutral-400">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-[102px] right-6">
        <PlayButton onClick={handlePlay} isPlaying={isPlayingCurrentTrack} />
      </div>
    </div>
  )
}
