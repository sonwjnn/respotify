import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'

import { PlaylistContent } from './playlist-content'
import { HeaderContent } from './header-content'
import {
  getLikedPlaylistCount,
  getPlaylistById,
  getSongsByPlaylistId,
} from '@/db/queries'

type PlaylistPageProps = {
  params: {
    playlistId: string
  }
}

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
  const playlistData = getPlaylistById(params.playlistId)
  const likedPlaylistCountData = getLikedPlaylistCount(params.playlistId)
  const playlistSongsData = getSongsByPlaylistId(params.playlistId)

  const [playlist, likedPlaylistCount, playlistSongs] = await Promise.all([
    playlistData,
    likedPlaylistCountData,
    playlistSongsData,
  ])

  if (!playlist) {
    return <Alert type="notfound" />
  }

  return (
    <div className="h-full w-full">
      <Navbar type="playlist" data={playlist} hasPlayBtn />
      <Header data={playlist} type="playlist">
        <HeaderContent likedCount={likedPlaylistCount} playlist={playlist} />
      </Header>
      <PlaylistContent playlist={playlist} playlistSongs={playlistSongs} />
      <Footer />
    </div>
  )
}

export default PlaylistPage
