import { relations } from 'drizzle-orm'
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
} from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'

export const users = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image').notNull().default('/images/user.svg'),
  password: text('password'),
})

export const accounts = pgTable(
  'account',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  verificationToken => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: uuid('credential_ID').notNull().unique(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('provider_account_id').notNull(),
    credentialPublicKey: text('credential_public_key').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credential_device_type').notNull(),
    credentialBackedUp: boolean('credential_backed_up').notNull(),
    transports: text('transports'),
  },
  authenticator => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

export const songs = pgTable('songs', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  duration: integer('duration'),
  songPath: text('song_path').notNull(),
  imagePath: text('image_path').notNull().default('/images/song.svg'),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
})

export const songsRelations = relations(songs, ({ one, many }) => ({
  user: one(users, {
    fields: [songs.userId],
    references: [users.id],
  }),
}))

export const playlists = pgTable('playlists', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  imagePath: text('image_path').notNull().default('/images/playlist.svg'),
  description: text('description'),
  bgColor: text('bg_color').notNull().default('#171717'),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
})

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  user: one(users, {
    fields: [playlists.userId],
    references: [users.id],
  }),
}))

export const playlistSongs = pgTable(
  'playlist_songs',
  {
    playlistId: uuid('playlist_id')
      .notNull()
      .references(() => playlists.id),
    songId: uuid('song_id')
      .notNull()
      .references(() => songs.id),
    createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  },
  playlistsSongs => ({
    compositePK: primaryKey({
      columns: [playlistsSongs.playlistId, playlistsSongs.songId],
    }),
  })
)

export const playlistsSongsRelations = relations(playlistSongs, ({ one }) => ({
  playlist: one(playlists, {
    fields: [playlistSongs.playlistId],
    references: [playlists.id],
  }),
  song: one(songs, {
    fields: [playlistSongs.songId],
    references: [songs.id],
  }),
}))

export const likedSongs = pgTable(
  'liked_songs',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    songId: uuid('song_id')
      .notNull()
      .references(() => songs.id),
    createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  },
  likedSong => ({
    compositePK: primaryKey({
      columns: [likedSong.userId, likedSong.songId],
    }),
  })
)

export const likedSongsRelations = relations(likedSongs, ({ one }) => ({
  user: one(users, {
    fields: [likedSongs.userId],
    references: [users.id],
  }),
  song: one(songs, {
    fields: [likedSongs.songId],
    references: [songs.id],
  }),
}))

export const likedPlaylists = pgTable(
  'liked_playlists',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    playlistId: uuid('playlist_id')
      .notNull()
      .references(() => playlists.id),
    createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  },
  likedPlaylist => ({
    compositePK: primaryKey({
      columns: [likedPlaylist.userId, likedPlaylist.playlistId],
    }),
  })
)

export const likedPlaylistsRelations = relations(likedPlaylists, ({ one }) => ({
  user: one(users, {
    fields: [likedPlaylists.userId],
    references: [users.id],
  }),
  playlist: one(playlists, {
    fields: [likedPlaylists.playlistId],
    references: [playlists.id],
  }),
}))

export const subscriptions = pgTable('subscription', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  subscriptionId: text('subscription_id').notNull(),
  customerId: text('customer_id').notNull(),
  priceId: text('price_id').notNull(),
  status: text('status').notNull(),
  currentPeriodEnd: timestamp('current_period_end', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull(),
})
