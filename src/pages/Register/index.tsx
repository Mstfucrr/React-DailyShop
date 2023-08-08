import React, { SetStateAction, useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { InputMask } from 'primereact/inputmask';
import { Link } from 'react-router-dom';
import { Nullable } from 'primereact/ts-helpers';
import RegisterForm from '@/components/auth/registerForm';
import Navbar from '@/components/Navbar';
import Topbar from '@/components/Topbar';


type Props = {}

const index = (props: Props) => {

  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('')
  const [nameValue, setNameValue] = useState<string>('')
  const [surnameValue, setSurnameValue] = useState<string>('')
  const [phoneValue, setPhoneValue] = useState<Nullable<string>>('')


  useEffect(() => {
    if (passwordValue !== confirmPasswordValue) {
      console.log('Password not match')
    } else {
      console.log('Password match')
    }

  }, [passwordValue, confirmPasswordValue])

  // submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
    console.log(emailValue)
    console.log(passwordValue)
    console.log(confirmPasswordValue)
    console.log(nameValue)
    console.log(surnameValue)
    console.log(phoneValue)

  }


  return (
    <>
    <Navbar />
      <div className='md:w-[560px] w-full md:h-[650px] my-20 md:my-0 h-auto bg-white 
      border border-solid mx-auto relative top-1/2 -translate-y-1/2'>
        <div className='py-7 bg-primary flex justify-center items-center mb-4'>
          <h1 className='text-white md:text-4xl text-3xl font-bold text-center'>Register</h1>
        </div>
        <div className='w-full h-5/6 flex flex-col justify-center items-center'>
          <RegisterForm />
          {/* login */}
          <div className="flex flex-row mx-auto mt-4">
            <span className='text-sm font-thin mr-3'>Do you have an account?</span>
            <Link className='underline text-sm font-thin
                        text-primary hover:text-black transition duration-300 ease-in-out'
              to='/login'

            >
              Login</Link>
          </div>
        </div>
      </div>
    </>

  )
}

export default index