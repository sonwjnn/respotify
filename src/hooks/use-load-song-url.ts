import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { SongType } from '@/types/types'

export const useLoadSongUrl = (song: SongType): string => {
  const supabaseClient = useSupabaseClient()

  if (!song) return ''

  const { data: songData } = supabaseClient.storage
    .from('songs')
    .getPublicUrl(song.songPath || '')

  return songData.publicUrl
}
