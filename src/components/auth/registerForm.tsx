import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { emailRegex, passwordRegex } from '@/helper/regex'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/auth/auth.service'
import { IRegister } from '@/services/auth/types'
import { SET_TOAST } from '@/store/Toast'

import google from '@/assets/images/google.png'
import facebook from '@/assets/images/facebook.png'


type Props = {}

const RegisterForm = (props: Props) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .max(50, 'Name is too long')
            .min(2, 'Name is too short'),
        surname: Yup.string()
            .required('Surname is required')
            .max(50, 'Surname is too long')
            .min(2, 'Surname is too short'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required')
            .max(50, 'Email is too long')
            .min(2, 'Email is too short')
            .matches(emailRegex(), 'Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .max(50, 'Password is too long')
            .min(2, 'Password is too short')
            .matches(passwordRegex(), 'Password is invalid'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .max(50, 'Confirm Password is too long')
            .min(2, 'Confirm Password is too short')
            .matches(passwordRegex(), 'Confirm Password is invalid'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)
            if (values.password !== values.confirmPassword) {
                setIsLoading(false)
                dispatch(SET_TOAST({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: 'Password and Confirm Password are not the same',
                    life: 3000
                }))
                return
            }

            const [err, data] = await authService.register(values as unknown as IRegister)
            console.log(err, data)
            if (err) {
                setIsLoading(false)
                dispatch(SET_TOAST({
                    severity: 'error',
                    summary: 'Error Message',
                    detail: err.message,
                    life: 3000
                }))
                return
            }
            const accessToken = data?.data || undefined
            console.log("accessToken", accessToken)
            formik.resetForm()
            setIsLoading(false)
            dispatch(SET_TOAST({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Register Success',
                life: 3000
            }))
            // navigate('/login')


        }

    })



    return (
        <form className='w-4/5 h-auto flex flex-col' action=''
            onSubmit={formik.handleSubmit}
        >
            <div className="flex md:flex-row flex-col justify-between">

                <div className="flex flex-col w-full mr-2">
                    <label htmlFor="name" className='text-primary text-xl font-medium'>Name</label>
                    <InputText placeholder="Name" name='name' id='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className={
                            formik.errors.name && formik.touched.name
                                ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                : 'w-full !my-2 p-inputtext-sm'
                        }
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <small id="username2-help" className="p-error p-d-block">
                            {formik.errors.name}
                        </small>
                    ) : null}


                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="surname" className='text-primary text-xl font-medium'>Surname</label>
                    <InputText placeholder="Surname" name='surname' id='surname'
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        className={
                            formik.errors.surname && formik.touched.surname
                                ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                : 'w-full !my-2 p-inputtext-sm'
                        }
                    />
                    {formik.errors.surname && formik.touched.surname ? (
                        <small id="username2-help" className="p-error p-d-block">
                            {formik.errors.surname}
                        </small>
                    ) : null}

                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className='text-primary text-xl font-medium'>Email</label>
                <InputText placeholder="Email" name='email' id='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={
                        formik.errors.email && formik.touched.email
                            ? 'w-full !my-2 p-inputtext-sm p-invalid'
                            : 'w-full !my-2 p-inputtext-sm'
                    }
                />
                {formik.errors.email && formik.touched.email ? (
                    <small id="username2-help" className="p-error p-d-block">
                        {formik.errors.email}
                    </small>
                ) : null}
            </div>
            <div className="flex sm:flex-row flex-col justify-between">

                <div className="flex flex-col sm:w-1/2 mr-2">
                    <label htmlFor="password" className='text-primary text-xl font-medium'>Password</label>
                    <Password placeholder="Password" name='password' id='password' toggleMask
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
                        className={
                            formik.errors.password && formik.touched.password
                                ? '!my-2 p-inputtext-sm p-invalid'
                                : '!my-2 p-inputtext-sm'
                        }
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <small id="username2-help" className="p-error p-d-block">
                            {formik.errors.password}
                        </small>
                    ) : null}
                </div>
                <div className="flex flex-col sm:w-1/2">
                    <label htmlFor="confirmPassword" className='text-primary text-xl font-medium'>Confirm Password</label>
                    <Password placeholder="Confirm Password" name='confirmPassword' id='confirmPassword' toggleMask
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
                        className={
                            formik.errors.confirmPassword && formik.touched.confirmPassword
                                ? '!my-2 p-inputtext-sm p-invalid'
                                : '!my-2 p-inputtext-sm'
                        }
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}

                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                        <small id="username2-help" className="p-error p-d-block">
                            {formik.errors.confirmPassword}
                        </small>
                    ) : null}

                </div>
            </div>

            {/* submit */}
            <div className="flex flex-col mt-4">
                <button className='w-full h-12 bg-primary text-white text-xl font-bold rounded-3xl
                         hover:text-primary hover:bg-white hover:border-primary border border-solid border-primary
                         transition duration-300 ease-in-out active:scale-95'
                >
                    {isLoading ?

                        (<div className="flex justify-center items-center w-full">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        </div>)
                        : <div>Register</div>
                    }

                </button>
            </div>

            {/* -- or -- */}
            <div className="flex flex-col mt-4">
                <div className="flex justify-center items-center">
                    <div className="w-full h-px bg-gray-300"></div>
                    <div className="mx-4 text-gray-400">OR</div>
                    <div className="w-full h-px bg-gray-300"></div>
                </div>
            </div>

            {/* google facebook register */}

            <div className="flex flex-row mt-4 flex-1 justify-center gap-6 items-center">
                <img src={google} alt="google" className="h-auto w-12 cursor-pointer rounded-full
                active:scale-90 hover:opacity-80 transition duration-300 ease-in-out" 
                
                />
                <img src={facebook} alt="facebook" className="h-auto w-12 cursor-pointer
                active:scale-90 hover:opacity-80 transition duration-300 ease-in-out" />

            </div>



        </form>
    )
}

export default RegisterForm