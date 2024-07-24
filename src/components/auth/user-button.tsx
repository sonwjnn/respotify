'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { LuLogOut } from 'react-icons/lu'
import { RiVipCrownLine } from 'react-icons/ri'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUploadModal } from '@/store/modals/use-upload-modal'
// import { useUser } from '@/hooks/use-user'
import { Tooltip } from '@/components/ui/tooltip'
import { ThemeOptions } from '@/components/theme-options'
import { useCurrentUser } from '@/hooks/use-current-user'
import { LogoutButton } from './logout-button'

export const UserButton = () => {
  // const { user, subscription, userDetails } = useUser()
  const user = useCurrentUser()

  const uploadModal = useUploadModal()
  const [isDropdown, setDropdown] = useState(false)

  const router = useRouter()

  const onChange = (open: boolean): void => {
    if (!open) {
      setDropdown(false)
    }
  }

  const subscription = false

  return (
    <DropdownMenu
      open={isDropdown}
      defaultOpen={isDropdown}
      onOpenChange={onChange}
    >
      <Tooltip text={user?.name || 'No name'}>
        <DropdownMenuTrigger asChild>
          <div
            className="flex items-center justify-center"
            onClick={() => setDropdown(!isDropdown)}
          >
            {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
            <div className="flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-white bg-opacity-30 p-1 transition hover:bg-opacity-20 hover:brightness-110 ">
              <div className="relative h-9 w-9 cursor-pointer overflow-hidden rounded-full bg-white">
                <Image
                  className="object-cover"
                  fill
                  alt="avatar img"
                  sizes="100%"
                  src={user?.image!}
                />
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
      </Tooltip>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className="mr-7 min-w-[220px]  rounded-md border-none p-[5px]"
          sideOffset={5}
          hidden={uploadModal.isOpen}
        >
          <DropdownMenuItem onSelect={() => router.push('/account')}>
            <RiVipCrownLine
              size={18}
              className={`mr-2 ${
                subscription ? 'text-yellow-500' : 'text-neutral-400'
              }`}
            />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push(`/user/${user?.id}`)}>
            <CgProfile size={18} className="mr-2 text-neutral-400" />
            Profile
          </DropdownMenuItem>

          <ThemeOptions />
          <DropdownMenuSeparator className="mx-1 bg-zinc-300 dark:bg-neutral-800" />

          <LogoutButton>
            <DropdownMenuItem>
              <div className=" text-red-500">
                <LuLogOut size={18} className="mr-2" />
              </div>
              Log out
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
