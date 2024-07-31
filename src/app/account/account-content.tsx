'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { postData } from '@/lib/helpers'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useModal } from '@/store/use-modal-store'
import { createStripeUrl } from '@/actions/subscription'

export const AccountContent = () => {
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { open } = useModal()

  const router = useRouter()

  const user = useCurrentUser()

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user, router])

  const redirectToCustomerPortal: () => Promise<void> = async () => {
    setLoading(true)

    try {
      const { url } = await postData({
        url: '/api/create-portal-link',
      })

      window.location.assign(url)
    } catch (error) {
      if (error) {
        toast.error((error as Error).message)
        return
      }
    }
    setLoading(false)
  }

  const subscription = false
  return (
    <div className="mb-7 min-h-[80vh] px-6">
      {!subscription ? (
        <div className="flex flex-col gap-y-4 ">
          <p className="text-white ">No active plan.</p>
          <Button onClick={() => open('subscribe')} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 text-white ">
          {/* <p>
            You are currency on the <b>{subscription?.prices?.product?.name}</b>{' '}
            plan.
          </p> */}

          <Button
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
            variant="primary"
            disabled={loading}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  )
}
