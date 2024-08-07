import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { PlaylistWithUser, SongType } from '@/types/types'

type PlaylistStore = {
  playlist: PlaylistWithUser | null
  playlistSongs: SongType[]
  setPlaylist: (playlist: PlaylistWithUser) => void
  setPlaylistSongs: (songs: SongType[]) => void
  setBgColor: (bgColor: string) => void
  addPlaylistSong: (song: SongType) => void
  removePlaylistSong: (id: string) => void
}

export const usePlaylist = create<PlaylistStore>()(
  persist(
    (set, get) => ({
      playlist: null,
      playlistSongs: [],
      setPlaylist: playlist => set({ playlist }),
      setPlaylistSongs: songs => set({ playlistSongs: songs }),
      setBgColor: (bgColor: string) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, bgColor: bgColor } as PlaylistWithUser })
      },
      addPlaylistSong: song => {
        const { playlistSongs: songs } = get()
        set({ playlistSongs: [...songs, song] })
      },
      removePlaylistSong: (id: string) => {
        const { playlistSongs: songs } = get()
        set({ playlistSongs: songs.filter(song => song.id !== id) })
      },
    }),
    {
      name: 'playlist-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
