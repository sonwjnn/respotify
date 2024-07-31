'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlinePlus } from 'react-icons/ai'
import { LuListMusic } from 'react-icons/lu'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AddPlaylistIcon } from '@/public/icons'

import { Tooltip } from '@/components/ui/tooltip'
import { createPlaylist } from '@/actions/playlist'
import { useModal } from '@/store/use-modal-store'
import { useCurrentUser } from '@/hooks/use-current-user'

export const UploadDropdown = () => {
  const user = useCurrentUser()
  const { open, isOpen } = useModal()
  const [isDropdown, setDropdown] = useState(false)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const onUploadSong = (): void => {
    setDropdown(false)

    return open('uploadSong')
  }

  const onUploadPlaylist = () => {
    startTransition(() => {
      setDropdown(false)
      createPlaylist()
        .then(data => {
          if ('error' in data) {
            toast.error(data.error as string)
          } else {
            router.push(`/playlist/${data.id}`)
          }
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  const onChange = (open: boolean): void => {
    if (!open) {
      setDropdown(false)
    }
  }

  const onClick = () => {
    if (!user) {
      open('auth', { authType: 'login' })
    }

    // TODO: Subscription

    setDropdown(!isDropdown)
  }
  return (
    <DropdownMenu
      open={isDropdown}
      defaultOpen={isDropdown}
      onOpenChange={onChange}
    >
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center">
          <Tooltip text="Create song or playlist">
            <div
              className={
                'relative h-8 w-8 rounded-full transition hover:bg-zinc-700/10 dark:hover:bg-neutral-800'
              }
            >
              <div
                className="absolute right-[1px] flex h-full  w-full cursor-pointer items-center justify-center border-none bg-transparent text-zinc-500 outline-none transition hover:text-white focus:outline-none dark:text-neutral-400"
                aria-label="Customise options"
                onClick={onClick}
              >
                <AiOutlinePlus size={20} />
              </div>
            </div>
          </Tooltip>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className="min-w-[220px] rounded-md border-none  p-[5px]"
          sideOffset={5}
          hidden={isOpen}
        >
          <DropdownMenuItem onSelect={onUploadSong}>
            <div className="mr-2   ">
              <LuListMusic size={20} color="#ec4899" />
            </div>
            Create a new song
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onUploadPlaylist} disabled={isPending}>
            <div className="mr-2   ">
              <AddPlaylistIcon color="#3b82f6" />
            </div>
            Create a new playlist
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
