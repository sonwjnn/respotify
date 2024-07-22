'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { usePlayer } from '@/store/use-player'
import { SoundIconSolid } from '@/public/icons'
import { PlaylistWithUser } from '@/types/types'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

type PlaylistItemProps = {
  data: PlaylistWithUser
  type?: 'myPlaylist' | 'otherPlaylist'
}

export const PlaylistItem = ({ data }: PlaylistItemProps) => {
  const { theme } = useTheme()
  const router = useRouter()

  const { playlistPlayingId, isPlaying } = usePlayer()

  const { id } = useParams()

  const onClick = (): void => {
    router.push(`/playlist/${data.id}`)
  }

  const fullName = data.user?.name
  const isActived = playlistPlayingId === data.id
  const isDark = theme === 'dark'
  return (
    <div
      className={cn(
        ` flex w-full cursor-pointer items-center justify-between rounded-md p-2 transition  `,
        id === data.id.toString() &&
          'bg-zinc-700/20 hover:bg-zinc-700/30 active:bg-zinc-700/40 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-800/75',
        id !== data.id.toString() &&
          'hover:bg-zinc-700/10 active:bg-zinc-700/20 dark:hover:bg-neutral-800/50 dark:active:bg-black'
      )}
      onClick={onClick}
    >
      <div className="flex min-w-0 items-center gap-x-3">
        <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
          <Image
            fill
            src={data.imagePath || '/images/note.svg'}
            sizes="100%"
            alt="Media-Item"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden ">
          <p
            className={` truncate  ${
              isActived
                ? 'text-green-600 dark:text-[#2ed760]'
                : 'text-zinc-600 dark:text-white'
            }`}
          >
            {data.title}
          </p>
          <p className="truncate text-sm text-zinc-500 dark:text-neutral-400">
            {`Playlist - ${fullName}`}
          </p>
        </div>
      </div>
      {isActived && isPlaying ? (
        <div className="pr-2">
          <SoundIconSolid color={isDark ? '#2ed760' : '#16a34a'} />
        </div>
      ) : null}
    </div>
  )
}
