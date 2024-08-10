'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Alert } from '@/components/alert'
import { PageWrapper } from '@/components/page-wrapper'

import { useCurrentUser } from '@/hooks/use-current-user'

type PlaylistLayoutProps = {
  children: React.ReactNode
}

const PlaylistLayout = ({ children }: PlaylistLayoutProps) => {
  const router = useRouter()

  // const { user, isLoading, subscription } = useUser()
  const user = useCurrentUser()
  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user, router])
  return (
    <>
      {/* {user && subscription ? (
        <PageWrapper>{children}</PageWrapper>
      ) : (
        <Alert type="noAuth" />
      )} */}
      {user ? <PageWrapper>{children}</PageWrapper> : <Alert type="noAuth" />}
    </>
  )
}

export default PlaylistLayout
