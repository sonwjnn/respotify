import Image from 'next/image'
import Link from 'next/link'

import { PlaylistType } from '@/types/types'

type CollapseListProps = {
  playlists: PlaylistType[]
}

type CollapseListItemProps = {
  playlist: PlaylistType
}

const CollapseListItem = ({ playlist }: CollapseListItemProps) => {
  return (
    <div className="flex items-center justify-center  rounded-lg  py-2  transition hover:bg-neutral-800 ">
      <div className="relative aspect-square h-12 w-12 overflow-hidden rounded-sm shadow-base">
        <Image
          fill
          src={playlist.imagePath || '/images/playlist.svg'}
          sizes="100%"
          alt="Media-Item"
          className="object-cover"
        />
      </div>
    </div>
  )
}

export const CollapseList = ({ playlists }: CollapseListProps) => {
  return (
    <div className="flex h-full w-full flex-col ">
      {playlists.map(playlist => (
        <Link
          href={`/playlist/${playlist.id}`}
          key={playlist.id}
          className="px-1"
        >
          <CollapseListItem playlist={playlist} />
        </Link>
      ))}

      <Link href={`/liked`} className="  px-1 ">
        <div className="flex items-center justify-center rounded-lg py-2 shadow-base transition hover:bg-neutral-800 ">
          <div className="relative aspect-square h-12 w-12 overflow-hidden rounded-sm shadow-base">
            <Image
              fill
              src={'/images/liked.png'}
              sizes="100%"
              alt="like img"
              className="object-cover"
            />
          </div>
        </div>
      </Link>
    </div>
  )
}
