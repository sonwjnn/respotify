import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { SongType } from '@/types/types'

export const useGetSongById = (
  id?: string
): {
  isLoading: boolean
  song: SongType | undefined
} => {
  const [song, setSong] = useState<SongType | undefined>(undefined)

  const [isLoading, setIsLoading] = useState(false)

  const { supabaseClient } = useSessionContext()

  useEffect(() => {
    if (!id) return

    setIsLoading(true)

    const fetchData = async (): Promise<void> => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setIsLoading(false)
        toast.error(error.message)
        return
      }
      setSong(data as SongType)
      setIsLoading(false)
    }
    fetchData()
  }, [id, supabaseClient])

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  )
}
