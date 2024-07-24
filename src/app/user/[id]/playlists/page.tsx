import type { NextPage } from 'next'

import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { UserPlaylistContent } from './user-playlist-content'
import { PlaylistType } from '@/types/types'

type UserPlaylistPageProps = {
  params: {
    id: string
  }
}

export const revalidate = 0

const UserPlaylistPage: NextPage<UserPlaylistPageProps> = async ({
  params,
}: UserPlaylistPageProps) => {
  // const playlists = await getOtherUserPlaylists(params.id)
  const playlists = [] as PlaylistType[]
  if (!playlists) {
    return <Alert type="notfound" />
  }
  return (
    <PageWrapper>
      <Navbar bgColor={'#171717'} darker={false} />
      <Header bgColor="#171717">
        <div className="mb-2  w-full ">
          <h1 className="pt-10 text-3xl font-bold text-zinc-600 dark:text-white">
            Public Playlists
          </h1>
        </div>
      </Header>
      <UserPlaylistContent data={playlists} />
      <Footer />
    </PageWrapper>
  )
}

export default UserPlaylistPage
