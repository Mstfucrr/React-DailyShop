'use client'

import Account from '@/components/account/account'

export enum AccountTabs {
  USER_INFO = 'user-info',
  USER_ORDERS = 'user-orders',
  USER_PRODUCTS = 'user-products'
}

const AccountPage = ({ params }: Readonly<{ params: { tab: AccountTabs } }>) => {
  return <Account tab={params.tab} />
}

export default AccountPage
