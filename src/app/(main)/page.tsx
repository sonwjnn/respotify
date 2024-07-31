import { Footer } from '@/components/footer'
import { Greeting } from './greeting'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { MainContent } from './main-content'
import { getPlaylists, getSongs, getSubscription } from '@/db/queries'

const MainPage = async () => {
  const songsData = getSongs()
  const playlistsData = getPlaylists()
  const subscriptionsData = getSubscription()

  const [songs, playlists, subscription] = await Promise.all([
    songsData,
    playlistsData,
    subscriptionsData,
  ])

  const isPro = !!subscription?.isActive
  return (
    <PageWrapper>
      <Navbar type="home" hasActiveSubscription={isPro} />
      <Header type="home">
        <div className="mb-2 w-full">
          <Greeting playlists={playlists} />
        </div>
      </Header>
      <div className="mt-2 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-600 dark:text-white">
            Newest songs
          </h1>
        </div>
        <MainContent songs={songs || []} />
        <Footer />
      </div>
    </PageWrapper>
  )
}

export default MainPage
