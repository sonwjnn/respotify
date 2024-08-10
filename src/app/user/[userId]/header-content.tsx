'use client'

import Image from 'next/image'
import { FiEdit2 } from 'react-icons/fi'

import { useMainLayout } from '@/store/use-main-layout'
import { PlaylistType } from '@/types'
import { cn } from '@/lib/utils'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useModal } from '@/store/use-modal-store'
import { ImageLazy } from '@/components/ui/image'

type HeaderContentProps = {
  data?: PlaylistType[]
}
export const HeaderContent = ({ data }: HeaderContentProps) => {
  const { open } = useModal()
  const { width } = useMainLayout()
  const user = useCurrentUser()

  const onClick = (): void => {
    if (!user) return

    return open('editUser')
  }

  return (
    <div className="flex flex-col  items-center gap-x-5  md:flex-row md:items-end">
      <div
        className={cn(
          `group relative flex h-[232px] w-[232px] cursor-pointer items-center justify-center rounded-full bg-white text-white shadow-base dark:bg-[#282828]`,
          width <= 875 && '!h-[192px] !w-[192px]'
        )}
        onClick={onClick}
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-2 rounded-full bg-[rgba(0,0,0,.7)] opacity-0 transition group-hover:opacity-100">
          <FiEdit2 size={36} color="#ffffff" />
          <p className="text-base text-white">Choose photo</p>
        </div>

        <div className="relative  aspect-square h-full w-full overflow-hidden rounded-full">
          <ImageLazy src={user?.image || '/images/user.svg'} alt="user image" />
        </div>
      </div>
      <div className="mt-4 flex  flex-col gap-y-3 md:mt-0 md:gap-y-6">
        <p className="hidden text-base text-white   md:block">Profile</p>
        <h1
          onClick={onClick}
          className={cn(
            'flex cursor-pointer text-center text-7xl font-bold text-white hover:underline md:text-left',
            width <= 1012 && '!text-5xl',
            width <= 901 && '!text-3xl'
          )}
        >
          {user?.name}
        </h1>
        <div className="flex flex-col items-center gap-y-2 md:items-start ">
          <p className="hidden text-sm text-desc  md:block">
            {`${data?.length} Public Playlists`}
          </p>
        </div>
      </div>
    </div>
  )
}
