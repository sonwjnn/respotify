import type { NextPage } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { AccountContent } from './account-content'
import { getSubscription } from '@/db/queries'

const AccountPage = async () => {
  const subscriptions = await getSubscription()

  const active = subscriptions?.isActive

  return (
    <div className="relative h-full w-full">
      <Navbar bgColor="#171717" darker={false} hasActiveSubscription={active} />
      <PageWrapper>
        <Header type="account" bgColor={'#171717'}>
          <div className="mb-2 flex flex-col gap-y-6 ">
            <div className="text-3xl font-semibold text-white">
              Account Settings
            </div>
          </div>
        </Header>
        <AccountContent />
        <Footer />
      </PageWrapper>
    </div>
  )
}

export default AccountPage
