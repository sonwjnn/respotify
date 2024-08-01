'use client'

import { usePalette } from 'color-thief-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { useHeader } from '@/store/use-header'
import { useMainLayout } from '@/store/use-main-layout'
import { useNavbar } from '@/store/use-navbar'
import { useOnPlay } from '@/hooks/use-on-play'
import { usePlayer } from '@/store/use-player'
import { useSelectedPlayer } from '@/store/use-selected-player'
// import { useUser } from '@/hooks/use-user'
import { PlaylistType, SongType } from '@/types/types'

import { PlayButton } from '@/components/play-button'
import { PremiumButton } from '@/components/premium-button'
import { Button } from '@/components/ui/button'
import { UserButton } from '@/components/auth/user-button'
import MobileToggle from './mobile-toggle'
import { useCurrentUser } from '@/hooks/use-current-user'
import { LoginButton } from '@/components/auth/login-button'
import { RegisterButton } from '@/components/auth/register-button'

type NavbarProps = {
  type?:
    | 'default'
    | 'home'
    | 'section'
    | 'search'
    | 'artist'
    | 'genre'
    | 'playlist'
    | 'user'
  songs?: SongType[]
  className?: string
  darker?: boolean
  data?: PlaylistType
  bgColor?: string
  hasPlayBtn?: boolean
  hasUsername?: boolean
  title?: string
  showTitle?: boolean
}

export const Navbar = (props: NavbarProps) => {
  const {
    type = 'default',
    songs,
    className,
    data,
    darker = true,
    bgColor,
    hasPlayBtn = false,
    hasUsername = false,
  } = props

  const router = useRouter()
  // const { user, userDetails } = useUser()
  const user = useCurrentUser()
  const player = usePlayer()
  const params = useParams()

  const { bgColor: bgColorHome } = useHeader()
  const { opacity, playBtnVisible, usernameVisible } = useNavbar()
  const { setSelected } = useSelectedPlayer()
  const { width } = useMainLayout()

  const onPlay = useOnPlay(songs as SongType[])
  const [isPlaying, setPlaying] = useState(false)
  const [bgColorUser, setBgColorUser] = useState<string>('#171717')

  const { data: dataColor } = usePalette(user?.image as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  useEffect(() => {
    if (
      type === 'playlist' &&
      player.playlistPlayingId?.toString() === params.id
    ) {
      setPlaying(player.isPlaying)
    }
  }, [type, player.isPlaying, player.playlistPlayingId, params.id])

  useEffect(() => {
    if (dataColor) {
      setBgColorUser(dataColor?.[2] ?? '#e0e0e0')
    }
  }, [dataColor])

  const handleClickPlay = (): void => {
    if (player.playlistPlayingId?.toString() !== params.id && songs?.length) {
      player.setPlaylistActiveId(params.id as string)
      if (songs[0]) onPlay(songs[0].id)
    } else {
      setSelected(true)
      player.handlePlay()
    }
  }

  return (
    <div
      className={twMerge(
        `absolute left-0 right-0 top-0 z-50  h-16 rounded-t-lg`,
        className
      )}
    >
      <div
        className={twMerge(
          `absolute left-0 top-0 h-full rounded-t-lg  ${
            darker && 'brightness-50'
          }  right-0 z-10`
        )}
        style={{
          transition: 'background-color 1s ease',
          opacity,
          backgroundColor:
            // eslint-disable-next-line no-nested-ternary
            type === 'home'
              ? bgColorHome
              : type === 'user'
                ? bgColorUser
                : bgColor || data?.bgColor,
        }}
      ></div>

      <div className=" absolute inset-x-0 top-0 z-10 mb-4 flex  h-full w-full  items-center justify-between  px-6">
        <div className="hidden  min-w-0 items-center gap-x-2   md:flex">
          <button
            className="items-center justify-center rounded-full  bg-[#171717] transition active:scale-95 disabled:cursor-not-allowed disabled:select-none dark:bg-black"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="items-center justify-center rounded-full bg-[#171717] transition active:scale-95 dark:bg-black"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>

          {playBtnVisible && hasPlayBtn ? (
            <div
              className={`ml-1  flex w-full min-w-0 max-w-[400px] grow items-center gap-x-2 transition ${
                playBtnVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <PlayButton
                className="h-12 w-12  translate-y-0 opacity-100 hover:scale-105"
                onClick={handleClickPlay}
                isPlaying={isPlaying}
              />

              <span className="mr-1 truncate text-2xl font-bold text-white">
                {data?.title}
              </span>
            </div>
          ) : null}

          {type === 'user' && hasUsername && usernameVisible ? (
            <span
              className={`mr-1 truncate text-2xl font-bold text-white transition ${
                usernameVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {user?.name}
            </span>
          ) : null}
        </div>

        <MobileToggle />

        <div className="flex items-center justify-between   gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              {width >= 459 && <PremiumButton />}

              <UserButton />
            </div>
          ) : (
            <>
              <RegisterButton mode="modal">
                <Button
                  className="bg-transparent text-sm font-medium text-zinc-500 dark:text-neutral-300"
                  variant="ghost"
                >
                  Sign up
                </Button>
              </RegisterButton>
              <LoginButton mode="modal">
                <Button className=" px-5 py-2 text-sm">Log in</Button>
              </LoginButton>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
