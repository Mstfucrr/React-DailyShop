import { useState } from 'react'
import { authService } from '@/services/auth/auth.service'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { emailRegex, passwordRegex } from '@/helper/regex'
import {
    useNavigate,
} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { SET_TOAST } from '@/store/Toast';
type Props = {}

const LoginForm = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
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
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)
            const [err, data] = await authService.login(values)
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
                detail: (
                    <div className="flex flex-col">
                        <span>Login success</span>
                        <span>Redirecting...</span>
                    </div>
                ),
                life: 30000
            }))

            // go to home page
            navigate('/', { replace: true })
        },
    })

    return (
        <>

            <form className='w-4/5 h-auto pb-16 flex flex-col' action=""
                onSubmit={formik.handleSubmit}
            >
                <div className="flex flex-col">
                    <label htmlFor="email" className='text-primary text-xl font-medium'>Email</label>
                    <InputText name='email' id='email'
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className={
                            formik.errors.email && formik.touched.email
                                ? 'p-inputtext-sm p-invalid w-full'
                                : 'p-inputtext-sm w-full'
                        }
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <small id="username2-help" className="p-error">
                            {formik.errors.email}
                        </small>
                    ) : null}

                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="password" className='text-primary text-xl font-medium'>Password</label>
                    <Password placeholder="Password" name='password' id='password' feedback={true}

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
                                ? 'p-inputtext-sm p-invalid w-full'
                                : 'p-inputtext-sm w-full'
                        }
                        value={formik.values.password}
                        onChange={formik.handleChange} toggleMask

                    />
                    {formik.errors.password && formik.touched.password ? (
                        <small id="username2-help" className="p-error">
                            {formik.errors.password}
                        </small>
                    ) : null}
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
                        '>
                        {isLoading ?
                            (<div className="flex justify-center items-center w-full">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            </div>)
                            : (
                                <span>Login</span>
                            )}

                    </button>
                </div>

            </form>
        </>

    )
}

export default LoginForm