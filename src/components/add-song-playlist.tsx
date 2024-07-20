'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { useAuthModal } from '@/store/modals/use-auth-modal'
import { usePlaylist } from '@/store/use-playlist'
// import { useUser } from '@/hooks/use-user'
import type { PlaylistType, SongType } from '@/types/types'

import { Spinner } from '@/components/spinner'
import { Tooltip } from '@/components/ui/tooltip'
import { AiOutlinePlus } from 'react-icons/ai'
import { useCurrentUser } from '@/hooks/use-current-user'

type AddSongPlaylistProps = {
  song: SongType
  playlist: PlaylistType
}

export const AddSongPlaylist = ({ song, playlist }: AddSongPlaylistProps) => {
  const { supabaseClient } = useSessionContext()

  // const { user } = useUser()
  const user = useCurrentUser()

  const { setDuration, addPlaylistSong } = usePlaylist()

  const authModal = useAuthModal()

  const [isRequired, setRequired] = useState<boolean>(false)

  const handleLike = async (): Promise<string | void> => {
    if (!user) {
      authModal.onOpen()
      return
    }

    if (isRequired) return

    setRequired(true)

    const { error } = await supabaseClient
      .from('playlist_songs')
      .insert({ playlist_id: playlist.id, song_id: song.id })

    if (error) {
      toast.error(error.message)
      return
    }

    const songDuration = song.duration || 0

    const updatedDuration = (playlist?.duration || 0) + songDuration

    const { error: playlistError } = await supabaseClient
      .from('playlists')
      .update({ duration: updatedDuration })
      .eq('id', playlist.id)

    if (playlistError) {
      toast.error(playlistError.message)
      return
    }

    setDuration(updatedDuration >= 0 ? updatedDuration : songDuration)
    addPlaylistSong(song)

    toast.success('Added!')

    setRequired(false)
  }

  return (
    <Tooltip text="Add to playlist">
      <div
        onClick={handleLike}
        className={`flex h-8 min-w-[50px] cursor-pointer items-center justify-center rounded-full border border-neutral-400 bg-transparent p-2  font-semibold text-white  transition hover:scale-105 active:scale-100 ${
          isRequired ? 'cursor-not-allowed opacity-50' : null
        }`}
      >
        {isRequired ? <Spinner /> : <AiOutlinePlus color="#a3a3a3" />}
      </div>
    </Tooltip>
  )
}
