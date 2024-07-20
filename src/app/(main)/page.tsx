import type { NextPage } from 'next'

import { Footer } from '@/components/footer'
import { Greeting } from './_components/greeting'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { MainContent } from './_components/main-content'
import { getPlaylists, getSongs } from '@/db/queries'

export const revalidate = 0

const MainPage: NextPage = async () => {
  const songsData = getSongs()
  const playlistsData = getPlaylists()

  const [songs, playlists] = await Promise.all([songsData, playlistsData])
  return (
    <PageWrapper>
      <Navbar type="home" />
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
