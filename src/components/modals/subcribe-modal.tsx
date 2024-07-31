'use client'

import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'

// import { useUser } from '@/hooks/use-user'
import { postData } from '@/lib/helpers'
import { getStripe } from '@/lib/stripe-client'
import type { Price, ProductWithPrice } from '@/types/types'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useModal } from '@/store/use-modal-store'
import { createStripeUrl } from '@/actions/subscription'

type SubscribeModalProps = {
  products: ProductWithPrice[]
}

const formatPrice = (price: Price): string => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100)

  return priceString
}

export const SubscribeModal = ({ products }: SubscribeModalProps) => {
  const { isOpen, type } = useModal()
  const [isPending, startTransition] = useTransition()

  const isModalOpen = isOpen && type === 'subscribe'

  let content = <div className="text-center">No products available</div>

  // const { user, isLoading, subscription } = useUser()
  const user = useCurrentUser()
  const [priceIdLoading, setPriceIdLoading] = useState<string>()

  const onChange = (open: boolean): void => {
    if (!open) close()
  }

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then(response => {
          if (response.data) {
            window.location.href = response.data
          }
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  if (products.length) {
    content = (
      <div>
        {products.map(product => {
          if (!product.prices?.length) {
            return (
              <div className="text-white" key={product.id}>
                No prices available
              </div>
            )
          }

          return product.prices.map(price => (
            <Button
              key={price.id}
              onClick={onUpgrade}
              disabled={isPending}
              className="mb-4 "
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ))
        })}
      </div>
    )
  }

  // if (subscription) {
  //   content = <div className="text-center text-white">Already subscribed</div>
  // }
  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={isModalOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  )
}
