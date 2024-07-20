import { create } from 'zustand'

import type { PlaylistType, SongType, UserDetails } from '@/types/types'
import { playlists, songs } from '@/db/schema'

type UserStore = {
  userDetails: UserDetails | null
  likedSongs: SongType[]
  playlists: PlaylistType[]
  likedPlaylists: PlaylistType[]
  setUserDetails: (userDetails: UserDetails | null) => void
  setFullName: (full_name: string) => void
  setAvatarUrl: (avatar_url: string) => void
  setBgColor: (bgColor: string) => void
  setLikedSongs: (songs: SongType[]) => void
  setLikedPlaylists: (playlists: PlaylistType[]) => void
  setPlaylists: (playlists: PlaylistType[]) => void
  addLikedSong: (song: SongType) => void
  addLikedPlaylist: (playlist: PlaylistType) => void
  addPlaylist: (playlist: PlaylistType) => void
  removeLikedSong: (id: string) => void
  removeLikedPlaylist: (id: string) => void
  removePlaylist: (id: string) => void
  updatePlaylist: (updatedPlaylist: PlaylistType) => void
  reset: () => void
}

export const useUserStore = create<UserStore>()((set, get) => ({
  userDetails: null,
  likedSongs: [],
  likedPlaylists: [],
  playlists: [],
  setUserDetails: (userDetails: UserDetails | null) => set({ userDetails }),
  setFullName: (full_name: string) => {
    const { userDetails } = get()
    set({ userDetails: { ...userDetails, full_name } as UserDetails })
  },
  setAvatarUrl: (avatar_url: string) => {
    const { userDetails } = get()
    set({
      userDetails: { ...userDetails, avatar_url } as UserDetails,
    })
  },
  setBgColor: (bgColor: string) => {
    const { userDetails } = get()
    set({ userDetails: { ...userDetails, bg_color: bgColor } as UserDetails })
  },
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
