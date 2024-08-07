import { create } from 'zustand'

import type { PlaylistWithUser, SongType } from '@/types/types'

type UserStore = {
  likedSongs: SongType[]
  playlists: PlaylistWithUser[]
  likedPlaylists: PlaylistWithUser[]
  setLikedSongs: (songs: SongType[]) => void
  setLikedPlaylists: (playlists: PlaylistWithUser[]) => void
  setPlaylists: (playlists: PlaylistWithUser[]) => void
  addLikedSong: (song: SongType) => void
  addLikedPlaylist: (playlist: PlaylistWithUser) => void
  addPlaylist: (playlist: PlaylistWithUser) => void
  removeLikedSong: (id: string) => void
  removeLikedPlaylist: (id: string) => void
  removePlaylist: (id: string) => void
  updatePlaylist: (updatedPlaylist: PlaylistWithUser) => void
  reset: () => void
}

export const useUserStore = create<UserStore>()((set, get) => ({
  userDetails: null,
  likedSongs: [],
  likedPlaylists: [],
  playlists: [],
  setLikedSongs: songs => set({ likedSongs: songs }),
  setLikedPlaylists: playlists => set({ likedPlaylists: playlists }),
  setPlaylists: playlists => set({ playlists }),
  addLikedSong: song => set({ likedSongs: [...get().likedSongs, song] }),
  addPlaylist: playlist => set({ playlists: [...get().playlists, playlist] }),
  addLikedPlaylist: playlist =>
    set({ likedPlaylists: [...get().likedPlaylists, playlist] }),
  removeLikedSong: (id: string) => {
    const { likedSongs } = get()
    const filteredLikedSongs = likedSongs.filter(song => song.id !== id)
    set({ likedSongs: filteredLikedSongs })
  },
  removeLikedPlaylist: (id: string) => {
    const { likedPlaylists } = get()
    const filteredLikedPlaylists = likedPlaylists.filter(
      playlist => playlist.id !== id
    )
    set({ likedPlaylists: filteredLikedPlaylists })
  },
  removePlaylist: (id: string) => {
    const { playlists } = get()
    const filteredPlaylists = playlists.filter(playlist => playlist.id !== id)
    set({ playlists: filteredPlaylists })
  },
  updatePlaylist: updatedPlaylist => {
    const { playlists } = get()
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === updatedPlaylist.id) {
        return updatedPlaylist
      }
      return playlist
    })
    set({ playlists: updatedPlaylists })
  },
  reset: () => {
    set({ playlists: [] })
    set({ likedPlaylists: [] })
    set({ likedSongs: [] })
  },
}))
