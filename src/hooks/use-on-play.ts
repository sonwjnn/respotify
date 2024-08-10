import { usePathname } from 'next/navigation'

import { usePlayer } from '@/store/use-player'
import { useSelectedPlayer } from '@/store/use-selected-player'
import { SongType } from '@/types'

import { useCurrentUser } from './use-current-user'

export const useOnPlay = (songs: SongType[]): ((id: string) => void) => {
  const {
    setId,
    setCurrentTrackIndex,
    setCurrentTrack,
    setQueue,
    calNextTrackIndex,
    setPlaylistActiveId,
    setIds,
  } = usePlayer()

  const pathName = usePathname()

  const { setSelected } = useSelectedPlayer()

  // const subcribeModal = useSubscribeModal()

  // const { user } = useUser()
  const user = useCurrentUser()

  const onPlay = (id: string): void => {
    if (!user) {
      return
    }

    // if (!subscription) {
    //   subcribeModal.onOpen()
    //   return
    // }

    if (!pathName.includes('/playlist')) {
      setPlaylistActiveId(undefined)
    }

    setSelected(true)

    // handle player store
    setId(id)

    const currentTrack = songs.find((song, index) => {
      if (song.id === id) {
        setCurrentTrackIndex(index)
        return true
      }
      return false
    })

    setCurrentTrack(currentTrack)
    setQueue(songs)
    calNextTrackIndex()
    setIds(songs.map(item => item.id))
  }

  return onPlay
}
