'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useModal } from '@/store/use-modal-store'
import { createStripeUrl } from '@/actions/subscription'

export const AccountContent = () => {
  const [isPending, startTransition] = useTransition()
  const { open } = useModal()

  const router = useRouter()

  const user = useCurrentUser()

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user, router])

  const redirectToCustomerPortal = () => {
    startTransition(() => {
      createStripeUrl()
        .then(response => {
          if (response.data) {
            window.location.href = response.data
          }
        })
        .catch(() => toast.error('Something went wrong!'))
    })
  }

  return (
    <div className="mb-7 min-h-[80vh] px-6">
      {!user?.isSubscribed ? (
        <div className="flex flex-col gap-y-4 ">
          <p className="text-white ">No active plan.</p>
          <Button onClick={() => open('subscribe')} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 text-white ">
          <p>You are currency on the premium plan.</p>

          <Button
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
            variant="primary"
            disabled={isPending}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  )
}
