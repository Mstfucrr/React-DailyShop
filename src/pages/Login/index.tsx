import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/loginForm';
import Navbar from '@/components/Navbar';
import Searchbar from '@/components/Searchbar';
import Topbar from '@/components/Topbar';


const index = () => {

    return (
        <>
            <Topbar />
            <Searchbar />
            <Navbar />

            <div className='md:w-[500px] w-full h-auto md:my-0 pb-10 bg-white 
            border border-solid mx-auto md:mt-[110px] '>
                <div className='py-7 bg-primary flex justify-center items-center mb-4'>
                    <h1 className='text-white md:text-4xl text-3xl font-bold text-center'>Giriş Yap</h1>
                </div>
                <div className='w-full h-5/6 flex flex-col justify-between items-center'>

                    <LoginForm />

                    {/* hesabın yok mu? */}
                    <div className="flex flex-row mx-auto mt-4 h-1/6">
                        <span className='text-sm font-thin mr-3'>Hesabınız Yok Mu ?</span>
                        <Link className='underline text-sm font-thin
                        text-primary hover:text-black transition duration-300 ease-in-out'
                            to='/register'>Kayıt Ol</Link>
                    </div>


                </div>

            </div>
            <div className="h-[100px]"></div>

        </>

    )
}

export default index