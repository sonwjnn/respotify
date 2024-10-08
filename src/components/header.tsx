'use client'

import { usePalette } from 'color-thief-react'
import { useEffect, useRef, useState } from 'react'

import { useComponentSize } from '@/store/use-component-size'
import { useHeader } from '@/store/use-header'
import { useMainLayout } from '@/store/use-main-layout'
import { PlaylistType } from '@/types'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { useCurrentUser } from '@/hooks/use-current-user'

type HeaderProps = {
  children: React.ReactNode
  className?: string
  data?: PlaylistType
  bgColor?: string
  type?: string
}

export const Header = ({
  children,
  className,
  data,
  bgColor,
  type,
}: HeaderProps) => {
  const user = useCurrentUser()

  const { theme } = useTheme()
  const { bgColor: bgColorHeader } = useHeader()
  const { setHeight } = useHeader()
  const { width } = useMainLayout()

  const headerRef = useRef<HTMLDivElement>(null)

  const size = useComponentSize(headerRef)

  const [bgColorUser, setBgColorUser] = useState<string>('')

  const { data: dataColor } = usePalette(user?.image as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  useEffect(() => {
    setHeight(size.height)
  }, [size.height, setHeight])

  useEffect(() => {
    if (dataColor) {
      setBgColorUser(dataColor?.[2] ?? '#e0e0e0')
    }
  }, [dataColor])
  const isDark = theme === 'dark'
  const defaultBgColor = isDark ? bgColor || '#171717' : '#F1F2F4'
  const bgColorFinal = data?.bgColor || defaultBgColor

  let backgroundColor
  if (type === 'home') {
    backgroundColor = bgColorHeader
  } else if (type === 'user') {
    backgroundColor = bgColorUser
  } else {
    backgroundColor = bgColorFinal
  }

  const headerStyles = {
    transition: 'background-color 1s ease',
    backgroundColor: backgroundColor,
  }

  return (
    <div
      className={cn(
        ` flex h-fit items-end justify-center p-6  pt-16 md:justify-start ${
          type === 'playlist' && width <= 768 ? '550px' : '340px'
        } `,
        className,
        {
          'header-bg-img-sm justify-center':
            type === 'playlist' || type === 'user',
          'header-bg-img-md justify-start': type === 'home' && isDark,
          'header-bg-img-md-light justify-start': type === 'home' && !isDark,
        }
      )}
      style={headerStyles}
      ref={headerRef}
    >
      {children}
    </div>
  )
}
