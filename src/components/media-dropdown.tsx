'use client'

import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { BsThreeDots } from 'react-icons/bs'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePlaylist } from '@/store/use-playlist'
import { DeleteIcon } from '@/public/icons'
import { PlaylistType, SongType } from '@/types/types'
import { useConfirm } from '@/hooks/use-confirm'
import { useCurrentUser } from '@/hooks/use-current-user'
import { deleteSongOfPlaylist } from '@/actions/song'
import { cn } from '@/lib/utils'

type MediaDropdownProps = {
  song: SongType
  playlist: PlaylistType
  className?: string
}

export const MediaDropdown = ({
  song,
  playlist,
  className,
}: MediaDropdownProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this song from playlist'
  )

  const user = useCurrentUser()
  const { removePlaylistSong, setDuration } = usePlaylist()
  const [isDropdown, setDropdown] = useState(false)
  const [isPending, startTransition] = useTransition()

  const onRemove = () => {
    startTransition(() => {
      deleteSongOfPlaylist(song.id, playlist.id)
        .then(response => {
          if (!response) {
            toast.error('Failed to delete song of playlist')
            return
          }

          removePlaylistSong(song.id)
          toast.success('Removed!')
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  const onChange = (open: boolean): void => {
    if (!open) {
      setDropdown(false)
    }
  }

  const handleRemove = async () => {
    const ok = await confirm()

    if (ok) {
      onRemove()
    }
  }

  return (
    <>
      <ConfirmDialog />

      <DropdownMenu
        open={isDropdown}
        defaultOpen={isDropdown}
        onOpenChange={onChange}
      >
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              `relative h-8 w-8 rounded-full transition hover:bg-neutral-800`,
              className
            )}
          >
            <button
              className="absolute right-[1px] flex h-full  w-full cursor-pointer items-center justify-center border-none bg-transparent text-neutral-400 outline-none transition hover:text-white focus:outline-none"
              aria-label="Customise options"
              onClick={() => setDropdown(!isDropdown)}
            >
              <BsThreeDots size={20} />
            </button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            className=" mr-12 min-w-[220px] rounded-md bg-neutral-800 py-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
            sideOffset={5}
            // hidden={uploadModal.isOpen}
            side="top"
          >
            {user?.id === playlist.userId ? (
              <DropdownMenuItem
                onSelect={handleRemove}
                className="dropdown-menu-item text-white"
                disabled={isPending}
              >
                <DeleteIcon color="#991b1b" />
                Remove from this playlist
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </>
  )
}
