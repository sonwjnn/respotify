import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { List } from './list'
import { getPlaylistsByUserId } from '@/db/queries'

type Props = {
  params: {
    userId: string
  }
}

const UserPlaylistPage = async ({ params }: Props) => {
  const playlists = await getPlaylistsByUserId(params.userId)

  if (!playlists.length) {
    return <Alert type="noData" text="No playlists found!" />
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
