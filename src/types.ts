import { playlists, songs, users } from '@/db/schema'
import type Stripe from 'stripe'

export type PageType =
  | 'home'
  | 'playlist'
  | 'search'
  | 'artist'
  | 'album'
  | 'queue'
  | 'liked'

export type PlaylistType = typeof playlists.$inferSelect
export type PlaylistWithUser = typeof playlists.$inferSelect & {
  user: typeof users.$inferSelect
}

export type PlaylistWithSongWithUser = typeof playlists.$inferSelect & {
  songs: (typeof songs.$inferSelect)[]
  user: typeof users.$inferSelect
}

export type SongType = typeof songs.$inferSelect

export type Product = {
  id: string
  active?: boolean
  name?: string
  description?: string
  image?: string
  metadata?: Stripe.Metadata
}

export interface ProductWithPrice extends Product {
  prices?: Price[]
}

export type Price = {
  id: string
  product_id?: string
  active?: boolean
  description?: string
  unit_amount?: number
  currency?: string
  type?: Stripe.Price.Type
  interval?: Stripe.Price.Recurring.Interval
  interval_count?: number
  trial_period_days?: number | null
  metadata?: Stripe.Metadata
  product?: Product
}

export type Subscription = {
  id: string
  user_id: string
  status?: Stripe.Subscription.Status
  metadata?: Stripe.Metadata
  price_id?: string
  quantity?: number
  cancel_at_period_end?: boolean
  created: string
  current_period_start: string
  current_period_end: string
  ended_at?: string
  cancel_at?: string
  canceled_at?: string
  trial_start?: string
  trial_end?: string
  prices?: Price
}
