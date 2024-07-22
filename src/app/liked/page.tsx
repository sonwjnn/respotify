import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { HeaderContent } from './_components/header-content'
import { LikedContent } from './_components/liked-content'
import { getSubscription } from '@/db/queries'

const LikedPage = async () => {
  const subscriptions = await getSubscription()

  const active = subscriptions?.isActive

  return (
    <PageWrapper>
      <Navbar bgColor="#543ca2" hasActiveSubscription={active} />
      <Header type="playlist" bgColor="#543ca2">
        <HeaderContent />
      </Header>

      <LikedContent bgColor="#543ca2" />
      <Footer />
    </PageWrapper>
  )
}
export default LikedPage
