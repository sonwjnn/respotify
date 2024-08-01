'use client'

import { memo, useEffect, useMemo, useState } from 'react'

import { useHeader } from '@/store/use-header'
import { useMainLayout } from '@/store/use-main-layout'
import { PlaylistType } from '@/types/types'
import { cn } from '@/lib/utils'

import { Recommend } from './recommend'

type GreetingProps = {
  playlists: PlaylistType[]
}

export const Greeting = memo(({ playlists }: GreetingProps) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours())
  const [isHover, setHover] = useState(false)
  const { width } = useMainLayout()
  const { setBgBase } = useHeader()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour(new Date().getHours())
    }, 1000 * 60)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if (isHover) {
      if (playlists[0]?.bgColor) {
        setBgBase(playlists[0]?.bgColor)
      }
    }
  }, [isHover, setBgBase, playlists])

  const greeting = useMemo(() => {
    if (currentHour >= 5 && currentHour <= 11) return 'Good morning'
    if (currentHour >= 12 && currentHour <= 17) return 'Good afternoon'
    return 'Good evening'
  }, [currentHour])

  return (
    <div>
      <h1 className="text-3xl font-semibold text-white">
        <p>{greeting}</p>
      </h1>
      <div
        className={cn(`mt-4 grid grid-cols-3 gap-3`, {
          'grid-cols-1': width <= 519,
          'grid-cols-2': width <= 878,
        })}
      >
        {playlists
          ?.slice(0, 6)
          .map((item, index) => (
            <Recommend
              key={index}
              data={item}
              index={index}
              isHover={isHover}
              setHover={setHover}
            />
          ))}
      </div>
    </div>
  )
})
