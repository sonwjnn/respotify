'use client'

import { Card } from './card'
import { useMainLayout } from '@/store/use-main-layout'
import { PlaylistType } from '@/types'

type CartListProps = {
  data: PlaylistType[]
}

export const List = ({ data }: CartListProps): JSX.Element => {
  const { width, quantityCol } = useMainLayout()

  const columnWidth = (width - 2 * 24 - (quantityCol - 1) * 24) / quantityCol
  return (
    <div
      className={` mt-4 grid gap-4 `}
      style={{
        gridTemplateColumns: `repeat(${quantityCol}, minmax(0,1fr))`,
        columnWidth,
      }}
    >
      {data.map(item => (
        <Card key={item.id} data={item} type="playlist" />
      ))}
    </div>
  )
}
