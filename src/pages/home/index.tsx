import Navbar from '@/components/Navbar'
import Searchbar from '@/components/Searchbar'
import Topbar from '@/components/Topbar'

type Props = {}

const index = (props: Props) => {
  return (
    <>
      <Topbar />
      <Searchbar />
      <Navbar />
    </>
  )
}

export default index