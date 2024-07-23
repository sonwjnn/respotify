'use client'

import Image from 'next/image'
import { FiEdit2 } from 'react-icons/fi'

import { useAuthModal } from '@/store/modals/use-auth-modal'
import { useSubscribeModal } from '@/store/modals/use-subcribe-modal'
import { useUserModal } from '@/store/modals/use-user-modal'
import { useMainLayout } from '@/store/use-main-layout'
// import { useUser } from '@/hooks/use-user'
import { PlaylistType } from '@/types/types'
import { cn } from '@/lib/utils'
import { useCurrentUser } from '@/hooks/use-current-user'

type UserHeaderContentProps = {
  data?: PlaylistType[]
}
export const UserHeaderContent = ({ data }: UserHeaderContentProps) => {
  const { width } = useMainLayout()
  // const { user, subscription, userDetails } = useUser()
  const user = useCurrentUser()
  const authModal = useAuthModal()
  const userModal = useUserModal()

  const subcribeModal = useSubscribeModal()

  const onClick = (): void => {
    if (!user) {
      return authModal.onOpen()
    }
    // if (!subscription) {
    //   return subcribeModal.onOpen()
    // }

    return userModal.onOpen()
  }

  return (
    <div className="flex flex-col  items-center gap-x-5  md:flex-row md:items-end">
      <div
        className={cn(
          `group relative flex h-[232px] w-[232px] cursor-pointer items-center justify-center rounded-full bg-[#282828] text-white shadow-base`,
          width <= 875 && '!h-[192px] !w-[192px]'
        )}
        onClick={userModal.onOpen}
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-2 rounded-full bg-[rgba(0,0,0,.7)] opacity-0 transition group-hover:opacity-100">
          <FiEdit2 size={36} color="#ffffff" />
          <p className="text-base text-white">Choose photo</p>
        </div>

        <div className="relative  aspect-square h-full w-full overflow-hidden rounded-full">
          <Image
            className="
            object-cover
          "
            src={user?.image || '/images/note.svg'}
            fill
            alt="user image"
            sizes="100%"
            priority={true}
          />
        </div>
      </div>
      <div className="mt-4 flex  flex-col gap-y-3 md:mt-0 md:gap-y-6">
        <p className="hidden text-base text-white  md:visible md:block">
          Profile
        </p>
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
          <p className="hidden text-sm text-desc md:visible md:block">
            {`${data?.length} Public Playlists`}
          </p>
        </div>
      </div>
    </div>
  )
}
