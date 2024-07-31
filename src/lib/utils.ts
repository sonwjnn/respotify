import { subscriptions } from '@/db/schema'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DAY_IN_MS = 86_400_000

export const checkIsActive = (
  subscription: typeof subscriptions.$inferSelect | undefined
) => {
  let active = false

  if (subscription && subscription.priceId && subscription.currentPeriodEnd) {
    active = subscription.currentPeriodEnd.getTime() + DAY_IN_MS > Date.now()
  }

  return active
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}
