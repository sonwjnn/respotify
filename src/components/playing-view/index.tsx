'use client'

import { useState } from 'react'

import { usePlayer } from '@/store/use-player'
import { usePlayingView } from '@/store/use-playing-view'
import { CloseIcon } from '@/public/icons'

import { LikeButton } from '@/components/like-button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { NextSong } from '@/components/playing-view/next-song'
import { PlayingViewResizer } from '@/components/playing-view/playing-view-resizer'
import { ImageLazy } from '@/components/ui/image'

export const PlayingView = () => {
  const { collapsed } = usePlayingView()
  const { currentTrack, queue, nextTrackIndex } = usePlayer()

  // find next song
  const nextSong = { ...queue[nextTrackIndex] }

  const [isScroll, setScroll] = useState<boolean>(false)

  if (!currentTrack) {
    return null
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  return (
    <PlayingViewResizer
      className={'hidden  md:block'}
      minWidth={300}
      maxWidth={400}
    >
      <div className="h-full bg-white  p-2 dark:bg-black ">
        <ScrollArea
          className="relative h-full w-full rounded-lg bg-[#F1F2F4] dark:bg-neutral-900"
          onScroll={handleScroll}
        >
          <div
            className={` sticky top-0  z-10 flex flex-row justify-end bg-[#F1F2F4] p-4 pb-3 dark:bg-neutral-900 ${
              isScroll ? 'shadow-2xl' : ''
            }`}
          >
            <div
              className={
                'relative h-8 w-8 rounded-full transition hover:bg-zinc-700/10 dark:hover:bg-neutral-800'
              }
            >
              <button
                className="absolute right-0 top-[1px] flex h-full w-full cursor-pointer items-center justify-center border-none bg-transparent text-neutral-400 outline-none transition hover:text-white focus:outline-none"
                onClick={collapsed}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 pt-0">
            <div className="relative aspect-square h-full w-full overflow-hidden rounded-lg shadow-base">
              <ImageLazy
                src={currentTrack?.imagePath || '/images/song.svg'}
                alt="Img"
              />
            </div>

            <div
              className={
                'mt-2 flex h-[64px] w-full flex-row items-center justify-between gap-6'
              }
            >
              <div className={'flex flex-1 flex-col overflow-hidden '}>
                <h2
                  className={
                    'm-0 truncate pb-2 text-2xl font-bold text-zinc-600 hover:underline hover:decoration-2 dark:text-white'
                  }
                >
                  {currentTrack?.title}
                </h2>
                <span>
                  <p className="w-full truncate pb-4 text-base text-zinc-500 dark:text-neutral-400">
                    {currentTrack?.author}
                  </p>
                </span>
              </div>
              <div
                className={
                  'w-8 cursor-pointer text-neutral-400 hover:text-white'
                }
              >
                <LikeButton className="flex" song={currentTrack} size={24} />
              </div>
            </div>

            <div
              className={
                'flex flex-row items-center gap-3 overflow-hidden rounded-lg '
              }
            >
              <NextSong song={nextSong} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </PlayingViewResizer>
  )
}
