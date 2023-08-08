import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import React from 'react'

type Props = {}

const LoginForm = (props: Props) => {
    return (
        <form className='w-4/5 h-4/5 flex flex-col' action="">
            <div className="flex flex-col">
                <label htmlFor="email" className='text-primary text-xl font-medium'>Email</label>
                <InputText placeholder="Email" className='w-full !my-2' name='email' id='email'
                />
            </div>
            <div className="flex flex-col mt-4">
                <label htmlFor="password" className='text-primary text-xl font-medium'>Password</label>
                <Password placeholder="Password" name='password' className='!my-2' id='password'
                    pt={{
                        "input": {
                            className: "w-full"
                        },
                        "showIcon": {
                            className: "relative flex -top-1"
                        },
                        "hideIcon": {
                            className: "relative flex -top-1"
                        }
                    }}
                />
            </div>

            {/* forgot pass */}
            <div className="flex flex-col mx-auto mt-4">
                <a href="#" className='underline text-sm font-thin
                            hover:text-black transition duration-300 ease-in-out
                        '>Forgot password?</a>
            </div>


            {/* submit */}
            <div className="flex flex-col mt-4">
                <button className='w-full h-12 bg-primary text-white text-xl font-bold rounded-3xl
                            hover:text-primary hover:bg-white hover:border-primary border border-solid border-primary
                            transition duration-300 ease-in-out
                        '>Login</button>
            </div>

        </form>
    )
}

export default LoginForm