import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { UserContent } from './user-content'
import { HeaderContent } from './header-content'
import { getPlaylistsByUserId } from '@/db/queries'

type UserPageProps = {
  params: {
    userId: string
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const playlists = await getPlaylistsByUserId(params.userId)

  if (!playlists.length) {
    return <Alert type="noData" text="No playlists found." />
  }

  return (
    <PageWrapper>
      <Navbar type="user" hasUsername />
      <Header type="user">
        <HeaderContent data={playlists} />
      </Header>
      <UserContent data={playlists} id={params.userId} />
      <Footer />
    </PageWrapper>
  )
}

export default UserPage
