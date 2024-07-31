'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Skeleton from 'react-loading-skeleton'

type Props = {
  src: string
  alt?: string
  inclSkeleton?: boolean
  colorRaw?: string
}

export const ImageLazy = ({
  src,
  alt = '',
  inclSkeleton = true,
  colorRaw = '',
}: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(false)

  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true })

  useEffect(() => {
    if (inView && !mounted) {
      setMounted(true)
    }
  }, [inView])

  useEffect(() => {
    if (mounted) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setLoading(false)
      }
    }
  }, [src, mounted])

  return (
    <div ref={ref} className="relative size-full">
      <div style={{ display: !isLoading ? 'none' : '' }}>
        {inclSkeleton ? (
          <Skeleton height={500} width="100%" />
        ) : (
          <div
            style={{ backgroundColor: colorRaw ? colorRaw : undefined }}
            className="absolute inset-0 opacity-25"
          ></div>
        )}
      </div>
      <img
        src={mounted ? src : ''}
        alt={alt}
        style={{
          display: isLoading ? 'none' : '',
        }}
        className="size-full animate-brighten-up object-cover"
      />
    </div>
  )
}
