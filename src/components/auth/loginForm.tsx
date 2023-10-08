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
import { IToast } from '@/store/Toast/type'
import { SET_ADMIN_AUTH, SET_AUTH } from '@/store/auth'

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
            await authService.login(values)
                .then(
                    res => {
                        if (res.status === 200) {
                            setIsLoading(false)
                            formik.resetForm()
                            const user = res?.data || undefined
                            dispatch(SET_AUTH(
                                {
                                    user : user,
                                    token : res.Authorization
                                }
                            ))


                            const toast: IToast = { severity: 'success', summary: "Başarılı", detail: res.message, life: 13000 }
                            dispatch(SET_TOAST(toast))
                            if (user.role == "admin") {
                                dispatch(SET_ADMIN_AUTH())
                                navigate("/admin")
                            }
                            else
                                navigate("/")

                        }
                        else {
                            console.log("err res : ", res)
                            setIsLoading(false)
                            const toast: IToast = { severity: 'error', summary: "Hata", detail: res.message, life: 3000 }
                            dispatch(SET_TOAST(toast))

                        }
                    })
                .catch(err => {
                    console.log("err : ", err)
                    setIsLoading(false)
                    const toast: IToast = { severity: 'error', summary: "Sistemsel Hata", detail: err.message, life: 3000 }
                    dispatch(SET_TOAST(toast))
                })
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