import Account from '@/components/account/account'
import { AccountTabs } from '@/components/account/types'

const AccountPage = ({ params }: Readonly<{ params: { tab: AccountTabs } }>) => {
  return <Account tab={params.tab} />
}

export default AccountPage
