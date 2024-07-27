'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useHeader } from '@/store/use-header'
import { PlaylistType } from '@/types/types'

import { PlayButton } from '@/components/play-button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useModal } from '@/store/use-modal-store'

type RecommendProps = {
  data: PlaylistType
  index: number
  isHover: boolean
  setHover: React.Dispatch<React.SetStateAction<boolean>>
}
export const Recommend = ({ data, isHover, setHover }: RecommendProps) => {
  const { open } = useModal()
  const router = useRouter()
  // const { user, subscription } = useUser()
  const user = useCurrentUser()
  const { bgBase, bgColor, setBgColor } = useHeader()

  const handleHover = (): void => {
    if (!isHover) setHover(true)

    setBgColor(data?.bgColor || bgColor)
  }
  const onClick = (): void => {
    if (!user) {
      open('auth')
      return
    }

    // Add authentication befire push
    router.push(`playlist/${data.id}`)
  }

  return (
    <div
      className="group relative flex cursor-pointer items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/20 transition hover:bg-neutral-100/20 dark:bg-neutral-100/10 "
      onMouseEnter={handleHover}
      onMouseLeave={() => setBgColor(bgBase)}
      onClick={onClick}
    >
      <div className="relative min-h-[64px] min-w-[64px] shadow-base">
        <Image
          className="object-cover"
          fill
          src={data.imagePath || '/images/playlist.svg'}
          alt="Image"
          sizes="100%"
        />
      </div>
      <p className="truncate py-5 pr-2 text-base font-bold text-zinc-600 dark:text-white">
        {data.title}
      </p>

      <div className="absolute right-4">
        <PlayButton className="translate-y-0 p-[14px]" />
      </div>
    </div>
  )
}
