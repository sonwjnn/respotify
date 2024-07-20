import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { PlaylistWithUser, SongType } from '@/types/types'

type PlaylistStore = {
  playlist: PlaylistWithUser | null
  playlistSongs: SongType[]
  setPlaylist: (playlist: PlaylistWithUser) => void
  setPlaylistSongs: (songs: SongType[]) => void
  setTitle: (title: string) => void
  setImagePath: (imagePath: string) => void
  setDescription: (description: string) => void
  setBgColor: (bgColor: string) => void
  setLikes: (likes: number) => void
  setDuration: (duration: number) => void
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
      setTitle: (title: string) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, title } as PlaylistWithUser })
      },
      setImagePath: (imagePath: string) => {
        const { playlist } = get()
        set({
          playlist: { ...playlist, imagePath: imagePath } as PlaylistWithUser,
        })
      },
      setBgColor: (bgColor: string) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, bgColor: bgColor } as PlaylistWithUser })
      },
      setDescription: (description: string) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, description } as PlaylistWithUser })
      },

      setLikes: (likes: number) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, likes } as PlaylistWithUser })
      },
      setDuration: (duration: number) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, duration } as PlaylistWithUser })
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
