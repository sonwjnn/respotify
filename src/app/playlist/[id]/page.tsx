import type { NextPage } from 'next'

import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'

import { PlaylistContent } from './playlist-content'
import { HeaderContent } from './header-content'
import {
  getPlaylistById,
  getSongsByPlaylistId,
  getSubscription,
} from '@/db/queries'

type PlaylistPageProps = {
  params: {
    id: string
  }
}

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
  const playlistData = getPlaylistById(params.id)
  const playlistSongsData = getSongsByPlaylistId(params.id)
  const subscriptionData = getSubscription()

  const [playlist, playlistSongs, subscription] = await Promise.all([
    playlistData,
    playlistSongsData,
    subscriptionData,
  ])

  if (!playlist) {
    return <Alert type="notfound" />
  }

  const isPro = !!subscription?.isActive

  return (
    <div className="h-full w-full">
      <Navbar
        type="playlist"
        data={playlist}
        hasPlayBtn
        hasActiveSubscription={isPro}
      />
      <Header data={playlist} type="playlist">
        <HeaderContent />
      </Header>
      <PlaylistContent playlist={playlist} playlistSongs={playlistSongs} />
      <Footer />
    </div>
  )
}

export default PlaylistPage
