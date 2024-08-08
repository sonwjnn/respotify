import { create } from 'zustand'

import type { SongType } from '@/types/types'

type UserStore = {
  likedSongs: SongType[]
  setLikedSongs: (songs: SongType[]) => void
  addLikedSong: (song: SongType) => void
  removeLikedSong: (id: string) => void
  reset: () => void
}

export const useUserStore = create<UserStore>()((set, get) => ({
  likedSongs: [],
  setLikedSongs: songs => set({ likedSongs: songs }),
  addLikedSong: song => set({ likedSongs: [...get().likedSongs, song] }),
  removeLikedSong: (id: string) => {
    const { likedSongs } = get()
    const filteredLikedSongs = likedSongs.filter(song => song.id !== id)
    set({ likedSongs: filteredLikedSongs })
  },

  reset: () => {
    set({ likedSongs: [] })
  },
}))
