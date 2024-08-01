import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'

import { PlaylistContent } from './playlist-content'
import { HeaderContent } from './header-content'
import { getPlaylistById, getSongsByPlaylistId } from '@/db/queries'

type PlaylistPageProps = {
  params: {
    id: string
  }
}

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
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
        <HeaderContent />
      </Header>
      <PlaylistContent playlist={playlist} playlistSongs={playlistSongs} />
      <Footer />
    </div>
  )
}

export default PlaylistPage
