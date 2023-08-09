import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/loginForm';
import Navbar from '@/components/Navbar';

type Props = {}

const index = (props: Props) => {
    


    return (
        <>
            <Navbar />

            <div className='md:w-[500px] w-full h-[550px] bg-white border border-solid mx-auto relative top-1/2 -translate-y-1/2'>
                <div className='w-full h-1/6 bg-primary flex justify-center items-center'>
                    <h1 className='text-white md:text-4xl text-3xl font-bold text-center'>Login</h1>
                </div>
                <div className='w-full h-5/6 flex flex-col justify-center items-center'>

                    <LoginForm />

                    {/* hesabın yok mu? */}
                    <div className="flex flex-row mx-auto mt-4">
                        <span className='text-sm font-thin mr-3'>Don't have an account?</span>
                        <Link className='underline text-sm font-thin
                        text-primary hover:text-black transition duration-300 ease-in-out'
                            to='/register'

                        >
                            Register</Link>
                    </div>


                </div>

            </div>
        </>

    )
}

export default index