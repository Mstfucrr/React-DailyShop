import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import React from 'react'

type Props = {}

const RegisterForm = (props: Props) => {
    return (
        <form className='w-4/5 h-4/5 flex flex-col' action=""
            // onSubmit={handleSubmit}
        >
            <div className="flex md:flex-row flex-col justify-between">

                <div className="flex flex-col mt-4 w-full mr-2">
                    <label htmlFor="name" className='text-primary text-xl font-medium'>Name</label>
                    <InputText placeholder="Name" className='w-full !my-2' name='name' id='name'
                    />
                </div>
                <div className="flex flex-col mt-4 w-full">
                    <label htmlFor="surname" className='text-primary text-xl font-medium'>Surname</label>
                    <InputText placeholder="Surname" className='w-full !my-2' name='surname' id='surname'
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className='text-primary text-xl font-medium'>Email</label>
                <InputText placeholder="Email" className='w-full !my-2' name='email' id='email'
                />
            </div>
            <div className="flex sm:flex-row flex-col justify-between">

                <div className="flex flex-col mt-4 mr-2">
                    <label htmlFor="password" className='text-primary text-xl font-medium'>Password</label>
                    <Password placeholder="Password" name='password' className='!my-2' id='password' toggleMask
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
                <div className="flex flex-col mt-4">
                    <label htmlFor="confirmPassword" className='text-primary text-xl font-medium'>Confirm Password</label>
                    <Password placeholder="Confirm Password" name='confirmPassword' className='!my-2' id='confirmPassword' toggleMask
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
            </div>

            {/* <div className="flex flex-col mt-4">
            <label htmlFor="phone" className='text-primary text-xl font-medium'>Phone</label>
            <InputMask placeholder="Phone" className='w-full !my-2' name='phone' id='phone'
              value={phoneValue as string}
              onChange={(e) => setPhoneValue(e.target.value)}
              mask="(999) 999-9999"
            />
          </div> */}

            {/* submit */}
            <div className="flex flex-col mt-4">
                <button className='w-full h-12 bg-primary text-white text-xl font-bold rounded-3xl
                         hover:text-primary hover:bg-white hover:border-primary border border-solid border-primary
                         transition duration-300 ease-in-out'>Register</button>
            </div>



        </form>
    )
}

export default RegisterForm