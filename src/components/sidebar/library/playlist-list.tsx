'use client'

import { PlaylistWithUser } from '@/types'

import { PlaylistItem } from '@/components/sidebar/library/playlist-item'

type PlaylistListProps = {
  data: PlaylistWithUser[]
}
export const PlaylistList = ({ data }: PlaylistListProps) => {
  return (
    <div className="mt-2 flex flex-col px-3 pb-2">
      {data.map(item => (
        <PlaylistItem key={item.id} data={item} />
      ))}
    </div>
  )
}
