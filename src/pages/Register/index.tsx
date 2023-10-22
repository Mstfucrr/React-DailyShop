import { Link } from 'react-router-dom';
import RegisterForm from '@/components/auth/registerForm';
import Navbar from '@/components/Navbar';
import Topbar from '@/components/Topbar';
import Searchbar from '@/components/Searchbar';


const index = () => {


  return (
    <>
      <Topbar />
      <Searchbar />
      <Navbar />
      <div className='md:w-[560px] w-full h-auto md:my-0 pb-10 bg-white 
      border border-solid mx-auto md:mt-[110px]'>
        <div className='py-7 bg-primary flex justify-center items-center mb-4'>
          <h1 className='text-white md:text-4xl text-3xl font-bold text-center'>Kayıt Ol</h1>
        </div>
        <div className='w-full h-5/6 flex flex-col justify-between items-center'>

          <RegisterForm />

          {/* login */}
          <div className="flex flex-row mx-auto mt-4">
            <span className='text-sm font-thin mr-3'>Zaten üye misin ?</span>
            <Link className='underline text-sm font-thin
                        text-primary hover:text-black transition duration-300 ease-in-out'
              to='/login' >Giriş Yap</Link>
          </div>
        </div>
      </div>
      <div className="h-[100px]"></div>
    </>

  )
}

export default index