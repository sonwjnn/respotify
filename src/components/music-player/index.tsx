'use client'

import { useLoadSongUrl } from '@/hooks/use-load-song-url'
import { usePlayer } from '@/store/use-player'
// import { useUser } from '@/hooks/use-user'

import { Player } from '@/components/music-player/player'
import { useCurrentUser } from '@/hooks/use-current-user'

export const MusicPlayer = () => {
  const player = usePlayer()

  const { currentTrack: song } = usePlayer()

  // const { user } = useUser()
  const user = useCurrentUser()

  const songUrl = useLoadSongUrl(song!)

  if (!song || !songUrl || !player.activeId || !user) {
    return null
  }

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-white px-4 py-2 dark:bg-black">
      <Player key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}
