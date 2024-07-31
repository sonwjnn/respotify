'use server'

import { getSubscription } from '@/db/queries'
import { currentUser } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'

const returnUrl = absoluteUrl('/account') //TODO: when we deploy => https://my-dummy-website.com

export const createStripeUrl = async () => {
  const user = await currentUser()

  if (!user || !user.id) {
    throw new Error('Unauthorized')
  }
  const userSubscription = await getSubscription()

  if (userSubscription && userSubscription.customerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.customerId,
      return_url: returnUrl,
    })

    return { data: stripeSession.url }
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: user.email as string,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: 'Spotify Premium',
            description: 'The best music streaming service',
          },
          unit_amount: 2000, //equalivent to $20USD
          recurring: {
            interval: 'month',
          },
        },
      },
    ],
    metadata: {
      userId: user.id,
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  })

  return { data: stripeSession.url }
}
