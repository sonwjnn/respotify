import type { NextPage } from 'next'

import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { PlaylistType } from '@/types/types'
import { List } from './list'

type UserPlaylistPageProps = {
  params: {
    id: string
  }
}

const UserPlaylistPage: NextPage<UserPlaylistPageProps> = async ({
  params,
}: UserPlaylistPageProps) => {
  // const playlists = await getOtherUserPlaylists(params.id)
  const playlists = [] as PlaylistType[]
  if (!playlists.length) {
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
      <div className="w-full px-6">
        <List data={playlists} />
      </div>
      <Footer />
    </PageWrapper>
  )
}

export default UserPlaylistPage
