import { Link } from 'react-router-dom'
import RegisterForm from '@/components/auth/registerForm'
import Navbar from '@/components/Navbar'
import Topbar from '@/components/Topbar'
import Searchbar from '@/components/Searchbar'

const index = () => {
  return (
    <>
      <Topbar />
      <Searchbar />
      <Navbar />
      <div
        className='mx-auto h-auto w-full border border-solid bg-white 
      pb-10 md:my-0 md:mt-[110px] md:w-[560px]'
      >
        <div className='mb-4 flex items-center justify-center bg-primary py-7'>
          <h1 className='text-center text-3xl font-bold text-white md:text-4xl'>Kayıt Ol</h1>
        </div>
        <div className='flex h-5/6 w-full flex-col items-center justify-between'>
          <RegisterForm />

          {/* login */}
          <div className='mx-auto mt-4 flex flex-row'>
            <span className='mr-3 text-sm font-thin'>Zaten üye misin ?</span>
            <Link
              className='text-sm font-thin text-primary
                        underline transition duration-300 ease-in-out hover:text-black'
              to='/login'
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
      <div className='h-[100px]'></div>
    </>
  )
}

export default index
