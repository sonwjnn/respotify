import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'
import { SearchInput } from '@/components/search-input'

import { getSongsByTitle } from '@/db/queries'
import { MediaList } from '@/components/media-list'
import { Alert } from '@/components/alert'

type SearchPageProps = {
  searchParams: {
    title: string
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const songsData = getSongsByTitle(searchParams.title || '')

  const [songs] = await Promise.all([songsData])

  if (!songs?.length) {
    return <Alert type="noData" text="No songs found" />
  }

  return (
    <PageWrapper>
      <Navbar bgColor={'#171717'} darker={false} />
      <Header type="search" bgColor="#171717">
        <div className="mb-2 flex w-full flex-col  gap-y-6">
          <h1 className="pt-10 text-3xl font-semibold text-zinc-600 dark:text-white">
            Search
          </h1>
          <SearchInput url="/search" />
        </div>
      </Header>
      <MediaList type="search" songs={songs} />
      <Footer />
    </PageWrapper>
  )
}

export default SearchPage
