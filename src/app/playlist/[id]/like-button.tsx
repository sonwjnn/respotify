'use client'

import { useEffect, useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { usePlaylist } from '@/store/use-playlist'
import { useUserStore } from '@/store/use-user-store'

import { Tooltip } from '@/components/ui/tooltip'
import { createLikedPlaylist, deleteLikedPlaylist } from '@/actions/playlist'
import { cn } from '@/lib/utils'

type LikeButtonProps = {
  size?: number
  className?: string
}

export const LikeButton = ({ size = 25, className }: LikeButtonProps) => {
  const { likedPlaylists, removeLikedPlaylist, addLikedPlaylist } =
    useUserStore()

  const { playlist, setLikes } = usePlaylist()

  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const isPlaylistLiked = likedPlaylists.some(
      item => item.id === playlist?.id
    )
    setIsLiked(isPlaylistLiked)
  }, [likedPlaylists])

  const handleLike = () => {
    startTransition(() => {
      if (!playlist || !playlist?.id) return

      if (isLiked) {
        deleteLikedPlaylist(playlist.id)
          .then(() => {
            setIsLiked(false)
            removeLikedPlaylist(playlist?.id)
            toast.success('Playlist liked!')
          })
          .catch(() => toast.error('Something went wrong!'))
      } else {
        createLikedPlaylist(playlist.id)
          .then(data => {
            if (data) {
              setIsLiked(true)
              addLikedPlaylist(data)
              toast.success('Playlist liked!')
            }
          })
          .catch(() => toast.error('Something went wrong!'))
      }
    })
  }
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  return (
    <Tooltip
      text={`${isLiked ? 'Remove from Your Library' : 'Save to Your Library'}`}
      asChild
    >
      <button
        onClick={handleLike}
        className={cn(
          `items-center justify-center transition active:scale-110`,
          className
        )}
        disabled={isPending}
      >
        <Icon
          className={` transition ${
            isLiked
              ? 'text-[#22c55e] hover:brightness-125'
              : ' text-neutral-400 hover:text-white'
          }`}
          size={size}
        />
      </button>
    </Tooltip>
  )
}
