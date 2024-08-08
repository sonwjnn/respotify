'use client'

import { useEffect, useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { Tooltip } from '@/components/ui/tooltip'
import { createLikedPlaylist, deleteLikedPlaylist } from '@/actions/playlist'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'
import { PlaylistType } from '@/types/types'

type LikeButtonProps = {
  size?: number
  className?: string
  likedPlaylists: PlaylistType[]
}

export const LikeButton = ({
  size = 25,
  className,
  likedPlaylists,
}: LikeButtonProps) => {
  const params = useParams()

  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const isPlaylistLiked = likedPlaylists.some(
      item => item.id === params?.playlistId
    )
    setIsLiked(isPlaylistLiked)
  }, [likedPlaylists])

  const handleLike = () => {
    startTransition(() => {
      const playlistId = params?.playlistId as string

      if (!playlistId) return

      if (isLiked) {
        deleteLikedPlaylist(playlistId)
          .then(() => {
            setIsLiked(false)
            toast.success('Playlist liked!')
          })
          .catch(() => toast.error('Something went wrong!'))
      } else {
        createLikedPlaylist(playlistId)
          .then(data => {
            if (data?.error) {
              return toast.error(data.error)
            }
            setIsLiked(true)
            toast.success('Playlist liked!')
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
