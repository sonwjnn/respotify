import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'

import logo from '@/public/images/logos/spotify_logo.svg'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'

type AlertProps = {
  type?: 'notfound' | 'wrong' | 'noAuth' | 'noData'
  text?: string
}

export const Alert = (props: AlertProps) => {
  const { type = 'notfound', text = '' } = props

  const { message } = useMemo(() => {
    switch (type) {
      case 'notfound':
        return {
          documentTitle: 'Page not found',
          message: `We can't seem to find the page you are looking for.`,
        }
      case 'wrong':
        return {
          documentTitle: 'Oops!',
          message: `Sorry, we couldn't complete your request.\n Please try refreshing this page or contact us.`,
        }
      case 'noAuth':
        return {
          documentTitle: 'Unauthenticated!',
          message: 'Unauthenticated, please subcribe or login!',
        }
      case 'noData':
        return {
          documentTitle: 'No data found',
          message: text,
        }
      default:
        return {
          documentTitle: '',
          message: text,
        }
    }
  }, [type])

  const title = {
    notfound: 'Page not found',
    wrong: 'Oops! Something went wrong',
    noData: 'Data not found',
    noAuth: 'Unauthorized',
  }

  return (
    <Box className="flex h-full w-full flex-col items-center justify-center">
      <div className={`relative h-[60px] w-[60px] overflow-hidden`}>
        <Image
          src={logo}
          alt="spotify logo"
          sizes="100%"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center p-10 ">
        <h2 className=" mb-4 mt-1 text-center text-5xl font-bold text-zinc-600 dark:text-white">
          {title[type]}
        </h2>
        <p className="mb-10 text-base text-zinc-500 dark:text-neutral-400">
          {message}
        </p>
        {type !== 'noAuth' && (
          <Link href={'/'}>
            <Button className="mb-9  px-8 py-3">Home</Button>
          </Link>
        )}
        <a
          className="block text-base font-bold text-zinc-500 dark:text-white no-underline hover:underline"
          href="https://www.facebook.com/profile.php?id=100011436148089"
          target="_blank"
        >
          Help
        </a>
      </div>
    </Box>
  )
}
