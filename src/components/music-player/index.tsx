'use client'

import { usePlayer } from '@/store/use-player'

import { Player } from '@/components/music-player/player'
import { useCurrentUser } from '@/hooks/use-current-user'

export const MusicPlayer = () => {
  const player = usePlayer()

  const { currentTrack: song } = usePlayer()

  const user = useCurrentUser()

  if (!song || !song.songPath || !player.activeId || !user) {
    return null
  }

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-white px-4 py-2 dark:bg-black">
      <Player key={song.id} song={song} songUrl={song.songPath} />
    </div>
  )
}
