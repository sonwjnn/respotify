'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { BsThreeDots } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip } from '@/components/ui/tooltip'
import { useAuthModal } from '@/store/modals/use-auth-modal'
import { usePlaylistModal } from '@/store/modals/use-playlist-modal'
import { useUserStore } from '@/store/use-user-store'
import { DeleteIcon } from '@/public/icons'
import { PlaylistType } from '@/types/types'
import { useConfirm } from '@/hooks/use-confirm'
import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'
import { deleteLikedPlaylist, deletePlaylist } from '@/actions/playlist'

type DotsProps = {
  data: PlaylistType
  className?: string
}

export const Dots = ({ data, className }: DotsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this playlist'
  )
  const user = useCurrentUser()
  const authModal = useAuthModal()
  const uploadModal = usePlaylistModal()

  const { removeLikedPlaylist, removePlaylist } = useUserStore()

  const [isDropdown, setDropdown] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  const onDeletePlaylist = () => {
    startTransition(() => {
      deletePlaylist(data)
        .then(() => {
          removePlaylist(data.id)

          if (pathname.includes(`playlist/${data.id}`)) {
            router.replace('/')
          }
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  const onEditPlaylist = () => {
    setDropdown(false)
    uploadModal.onOpen()
  }

  const onRemoveFromLibrary = () => {
    startTransition(() => {
      deleteLikedPlaylist(data.id)
        .then(() => {
          removeLikedPlaylist(data.id)
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }
  const onChange = (open: boolean): void => {
    if (!open) {
      setDropdown(false)
    }
  }

  const handleDeletePlaylist = async () => {
    const ok = await confirm()

    if (ok) {
      onDeletePlaylist()
    }
  }

  const handleDeleteFromLibrary = async () => {
    const ok = await confirm()

    if (ok) {
      onRemoveFromLibrary()
    }
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu modal={isDropdown} onOpenChange={onChange}>
        <DropdownMenuTrigger disabled={isPending} asChild>
          <div className="flex items-center justify-center">
            <Tooltip text={`More options for this playlist`}>
              <div
                className={cn(
                  `relative h-8 w-8 rounded-full transition hover:text-white`,
                  className
                )}
              >
                <div
                  className="absolute right-[1px] flex h-full  w-full cursor-pointer items-center justify-center border-none bg-transparent text-neutral-400 outline-none transition hover:text-white focus:outline-none"
                  aria-label="Customise options"
                >
                  <BsThreeDots size={32} />
                </div>
              </div>
            </Tooltip>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className="min-w-[220px] overflow-hidden rounded-md border-none py-[5px] ">
            <DropdownMenuItem onSelect={onEditPlaylist}>
              <FiEdit className="mr-2 text-neutral-400" size={16} />
              Edit details
            </DropdownMenuItem>

            {user?.id === data?.userId ? (
              <DropdownMenuItem onSelect={handleDeletePlaylist}>
                <div className="mr-2">
                  <DeleteIcon color="#991b1b" />
                </div>
                Remove from your profile
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onSelect={handleDeleteFromLibrary}>
                <div className="mr-2">
                  <DeleteIcon color="#991b1b" />
                </div>
                Remove from your library
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </>
  )
}
