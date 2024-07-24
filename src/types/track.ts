import { PlaylistType, PlaylistWithUser, SongType } from './types'

export type SongCardTagProps = {
  thumbnailUrl?: string
  name?: string
  isLoading?: boolean
  id?: string
  setBgColor: React.Dispatch<React.SetStateAction<string>>
  albumId?: string
}

export type MediaItemProps = {
  isLoading?: boolean
  isExplicit?: boolean
  type?: 'default' | 'playlist' | 'album' | 'search' | 'artist' | 'queue'
  id?: string
  song: SongType
  playlist?: PlaylistWithUser | null
  isPlaying?: boolean
  index?: number
  isSelected?: boolean
  isActived?: boolean
  hasAddTrackBtn?: boolean
}

export type MediaListProps = {
  songs: SongType[]
  playlist?: PlaylistType
  pivotTop?: number
  top?: number
  type?: 'default' | 'playlist' | 'album' | 'search' | 'artist' | 'queue'
  // albumImages?: ImageSource[]
  inclHeader?: boolean
  adjustOrder?: number
  hasAddTrackBtn?: boolean
}
