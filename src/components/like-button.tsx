'use client'

import { useEffect, useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

// import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
import { SongType } from '@/types/types'

import { Tooltip } from '@/components/ui/tooltip'
import { useCurrentUser } from '@/hooks/use-current-user'
import { createLikedSong, deleteLikedSong } from '@/actions/song'
import { cn } from '@/lib/utils'

type LikeButtonProps = {
  song: SongType
  size?: number
  className?: string
  isSelected?: boolean
}

export const LikeButton = ({
  song,
  size = 25,
  className,
  isSelected,
}: LikeButtonProps) => {
  const { likedSongs, addLikedSong, removeLikedSong } = useUserStore()

  // const { user } = useUser()
  const user = useCurrentUser()

  const [isPending, startTransition] = useTransition()

  const [isLiked, setIsLiked] = useState<boolean>(false)

  useEffect(() => {
    const isSongLiked = likedSongs.some(item => item.id === song.id)
    setIsLiked(isSongLiked)
  }, [likedSongs])

  const handleLike = () => {
    startTransition(() => {
      if (isLiked) {
        deleteLikedSong(song.id)
          .then(response => {
            if (!response) {
              toast.error('Failed to delete liked song')
              return
            }

            setIsLiked(false)
            removeLikedSong(song.id)
          })
          .catch(() => toast.error('Something went wrong!'))
      } else {
        createLikedSong(song.id)
          .then(response => {
            if (!response) {
              toast.error('Failed to like song')
              return
            }

            setIsLiked(true)
            addLikedSong(song)
          })
          .catch(() => toast.error('Something went wrong!'))
      }
    })
  }
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  if (!user) return null

  return (
    <Tooltip
      text={`${isLiked ? 'Remove from Your Library' : 'Save to Your Library'}`}
      asChild
    >
      <button
        onClick={handleLike}
        className={cn(
          `items-center justify-center transition active:scale-110 group-hover:flex`,
          isLiked || isSelected ? 'flex' : 'hidden',
          className
        )}
        disabled={isPending}
      >
        <Icon
          className={cn(
            'transition',
            isLiked && 'text-[#22c55e] hover:brightness-125',
            !isLiked &&
              'text-zinc-500 hover:text-zinc-600 dark:text-neutral-400 dark:hover:text-white'
          )}
          size={size}
        />
      </button>
    </Tooltip>
  )
}
