import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { UserContent } from './user-content'
import { HeaderContent } from './header-content'
import { PlaylistType } from '@/types/types'

type UserPageProps = {
  params: {
    id: string
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  // const playlists = await getOtherUserPlaylists(params.id)

  const playlists = [] as PlaylistType[]
  if (!playlists) {
    return <Alert type="notfound" />
  }

  return (
    <PageWrapper>
      <Navbar type="user" hasUsername />
      <Header type="user">
        <HeaderContent data={playlists} />
      </Header>
      <UserContent data={playlists} id={params.id} />
      <Footer />
    </PageWrapper>
  )
}

export default UserPage
