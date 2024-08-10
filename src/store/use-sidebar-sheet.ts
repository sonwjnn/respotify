import { PlaylistWithUser, SongType } from '@/types'
import { create } from 'zustand'

type SidebarSheetStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSidebarSheet = create<SidebarSheetStore>()(set => ({
  isOpen: false,
  data: {},
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
