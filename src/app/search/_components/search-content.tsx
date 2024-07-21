'use client'

import { Alert } from '@/components/alert'
import { MediaList } from '@/components/media-list'
import { SongType } from '@/types/types'

type SearchContentProps = {
  songs: SongType[]
}

export const SearchContent = ({ songs }: SearchContentProps) => {
  if (songs.length === 0) {
    return <Alert type="noData" text="No songs found" />
  }

  return <MediaList type="search" songs={songs} />
}
