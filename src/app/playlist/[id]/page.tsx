import type { NextPage } from 'next'

import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'

import { PlaylistContent } from './_components/playlist-content'
import { PlaylistHeaderContent } from './_components/playlist-header-content'
import { getPlaylistById, getSongsByPlaylistId } from '@/db/queries'

type PlaylistPageProps = {
  params: {
    id: string
  }
}

export const revalidate = 0

const PlaylistPage: NextPage<PlaylistPageProps> = async ({
  params,
}: PlaylistPageProps) => {
  const playlistData = getPlaylistById(params.id)
  const playlistSongsData = getSongsByPlaylistId(params.id)

  const [playlist, playlistSongs] = await Promise.all([
    playlistData,
    playlistSongsData,
  ])

  if (!playlist) {
    return <Alert type="notfound" />
  }

  return (
    <div className="h-full w-full">
      <Navbar type="playlist" data={playlist} hasPlayBtn />
      <Header data={playlist} type="playlist">
        <PlaylistHeaderContent />
      </Header>
      <PlaylistContent playlist={playlist} playlistSongs={playlistSongs} />
      <Footer />
    </div>
  )
}

export default PlaylistPage
