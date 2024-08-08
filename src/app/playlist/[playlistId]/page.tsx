import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'

import { PlaylistContent } from './playlist-content'
import { HeaderContent } from './header-content'
import {
  getLikedPlaylists,
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
  const likedPlaylistsData = getLikedPlaylists()
  const playlistSongsData = getSongsByPlaylistId(params.playlistId)

  const [playlist, likedPlaylists, playlistSongs] = await Promise.all([
    playlistData,
    likedPlaylistsData,
    playlistSongsData,
  ])

  if (!playlist) {
    return <Alert type="notfound" />
  }

  return (
    <div className="h-full w-full">
      <Navbar type="playlist" data={playlist} hasPlayBtn />
      <Header data={playlist} type="playlist">
        <HeaderContent
          likedPlaylists={likedPlaylists}
          playlist={playlist}
          songs={playlistSongs}
        />
      </Header>
      <PlaylistContent
        playlist={playlist}
        likedPlaylists={likedPlaylists}
        playlistSongs={playlistSongs}
      />
      <Footer />
    </div>
  )
}

export default PlaylistPage
