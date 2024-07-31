import Image from 'next/image'

import { SongType } from '@/types/types'

import { LikeButton } from '@/components/like-button'
import { ImageLazy } from '../ui/image'

type SongDetailsProps = {
  data: SongType
}

export const SongDetails = ({ data }: SongDetailsProps) => {
  return (
    <div className="flex w-full items-center gap-x-4   md:pr-6">
      <div
        className={`min-w-[200px] gap-x-2  rounded-md transition md:min-w-0`}
      >
        <div
          className="flex items-center gap-x-3
      "
        >
          <div className="relative size-[56px] overflow-hidden rounded-md">
            <ImageLazy
              src={data.imagePath || '/images/song.svg'}
              alt="Media-Item"
            />
            )
          </div>
          <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="truncate text-sm text-zinc-600 dark:text-white">
              {data.title}
            </p>
            <p className="truncate text-xs text-zinc-500 dark:text-neutral-400">
              {data.author}
            </p>
          </div>
        </div>
      </div>
      <LikeButton className="flex" song={data} size={22} />
    </div>
  )
}
