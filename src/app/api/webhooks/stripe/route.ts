import { db } from '@/db/drizzle'
import { subscriptions } from '@/db/schema'
import { stripe } from '@/lib/stripe'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.messaage}`, {
      status: 400,
    })
  }
  const session = event.data.object as Stripe.Checkout.Session
  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )
    if (!session?.metadata?.userId) {
      return new NextResponse('User Id is required', { status: 400 })
    }

    await db.insert(subscriptions).values({
      userId: session.metadata.userId,
      subscriptionId: subscription.id,
      customerId: subscription.customer as string,
      priceId: subscription.items.data[0].price.id, //we know its first in the array because our line_items has only one item
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      status: subscription.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await db
      .update(subscriptions)
      .set({
        priceId: subscription.items.data[0].price.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      })
      .where(eq(subscriptions.subscriptionId, subscription.id))
  }
  return new NextResponse(null, { status: 200 })
}
