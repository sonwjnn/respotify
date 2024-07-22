import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'
import { SearchInput } from '@/components/search-input'

import { SearchContent } from './_components/search-content'
import { getSongsByTitle, getSubscription } from '@/db/queries'

type SearchPageProps = {
  searchParams: {
    title: string
  }
}

export const revalidate = 0

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const songsData = getSongsByTitle(searchParams.title || '')
  const subscriptionData = getSubscription()

  const [songs, subscription] = await Promise.all([songsData, subscriptionData])

  const isPro = !!subscription?.isActive
  return (
    <PageWrapper>
      <Navbar
        bgColor={'#171717'}
        darker={false}
        hasActiveSubscription={isPro}
      />
      <Header type="search" bgColor="#171717">
        <div className="mb-2 flex w-full flex-col  gap-y-6">
          <h1 className="pt-10 text-3xl font-semibold text-zinc-600 dark:text-white">
            Search
          </h1>
          <SearchInput url="/search" />
        </div>
      </Header>
      <SearchContent songs={songs} />
      <Footer />
    </PageWrapper>
  )
}

export default SearchPage
