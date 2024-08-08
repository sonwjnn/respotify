import './globals.css'

import localFont from 'next/font/local'

import { MainContent } from '@/components/main-content'
import { Modals } from '@/components/modals'
import { Toaster } from '@/providers/toaster'
import { Sheets } from '@/components/sheets'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Providers } from '@/providers'
import {
  getLikedPlaylists,
  getLikedSongs,
  getUserPlaylists,
  getUserSongs,
} from '@/db/queries'

const circularSp = localFont({
  src: [
    {
      path: '../../public/fonts/CircularSp-Book.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/CircularSp-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-circularSp',
})

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  const userPlaylistsData = getUserPlaylists()
  const likedSongsData = getLikedSongs()
  const likedPlaylistsData = getLikedPlaylists()

  const [userPlaylists, likedSongs, likedPlaylists] = await Promise.all([
    userPlaylistsData,
    likedSongsData,
    likedPlaylistsData,
  ])

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${circularSp.variable} font-sans`}>
          <Providers>
            <Toaster />
            <Modals />
            <Sheets
              playlists={[...userPlaylists, ...likedPlaylists]}
              likedSongs={likedSongs}
            />
            <MainContent
              playlists={userPlaylists}
              likedPlaylists={likedPlaylists}
              likedSongs={likedSongs}
            >
              {children}
            </MainContent>
          </Providers>
        </body>
      </html>
    </SessionProvider>
  )
}
