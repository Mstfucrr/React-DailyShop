import Navbar from '@/components/Navbar'
import Searchbar from '@/components/Searchbar'
import Topbar from '@/components/Topbar'
import ForgotPasswordForm from '@/components/auth/forgotPasswordForm'

const ForgotPassword = () => {
  return (
    <>
      <Topbar />
      <Searchbar />
      <Navbar />
      <ForgotPasswordForm />
    </>
  )
}

export default ForgotPassword
