'use client'

import { useTransition } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useModal } from '@/store/use-modal-store'
import { createStripeUrl } from '@/actions/subscription'

export const SubscribeModal = () => {
  const user = useCurrentUser()
  const { isOpen, type } = useModal()
  const [isPending, startTransition] = useTransition()

  const isModalOpen = isOpen && type === 'subscribe'

  // const { user, isLoading, subscription } = useUser()

  const onUpgrade = () => {
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

  let content = <div className="text-center">No products available</div>

  if (!user?.isSubscribed) {
    content = (
      <Button
        onClick={onUpgrade}
        disabled={isPending}
        className="mx-auto mb-4 "
      >
        {`Subscribe`}
      </Button>
    )
  }

  if (user?.isSubscribed) {
    content = <div className="text-center text-white">Already subscribed</div>
  }
  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={isModalOpen}
      onChange={close}
    >
      {content}
    </Modal>
  )
}
