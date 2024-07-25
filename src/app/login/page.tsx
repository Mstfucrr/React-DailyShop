'use client'
import LoginForm from '@/components/auth/loginForm'
import Link from 'next/link'

const index = () => {
  return (
    <>
      <div
        className='mx-auto h-auto w-full border border-solid bg-white 
            pb-10 md:my-0 md:mt-[110px] md:w-[500px] '
      >
        <div className='mb-4 flex items-center justify-center bg-primary py-7'>
          <h1 className='text-center text-3xl font-bold text-white md:text-4xl'>Giriş Yap</h1>
        </div>
        <div className='flex h-5/6 w-full flex-col items-center justify-between'>
          <LoginForm />

          {/* hesabın yok mu? */}
          <div className='mx-auto mt-4 flex h-1/6 flex-row'>
            <span className='mr-3 text-sm font-thin'>Hesabınız Yok Mu ?</span>
            <Link
              className='text-sm font-thin text-primary
                        underline transition duration-300 ease-in-out hover:text-black'
              href='/register'
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
      <div className='h-[100px]'></div>
    </>
  )
}

export default index
