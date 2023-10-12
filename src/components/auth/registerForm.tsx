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
import { IToast } from '@/store/Toast/type'
import to from 'await-to-js'
import { InputNumber } from 'primereact/inputnumber'
import { InputMask } from 'primereact/inputmask'


type Props = {}

const RegisterForm = (props: Props) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Ad alanı zorunludur')
            .max(50, 'Ad çok uzun')
            .min(2, 'Ad çok kısa'),
        surname: Yup.string()
            .required('Soyad alanı zorunludur')
            .max(50, 'Soyad çok uzun')
            .min(2, 'Soyad çok kısa'),
        email: Yup.string()
            .email('Geçersiz E-posta')
            .required('E-posta zorunludur')
            .max(50, 'E-posta çok uzun')
            .min(2, 'E-posta çok kısa')
            .matches(emailRegex(), 'Geçersiz E-posta'),
        PhoneNumber: Yup.string()
            .required('Telefon Numarası zorunludur')
            .max(50, 'Telefon Numarası çok uzun')
            .min(2, 'Telefon Numarası çok kısa'),
        password: Yup.string()
            .required('Şifre zorunludur')
            .max(50, 'Şifre çok uzun')
            .min(2, 'Şifre çok kısa')
            .matches(passwordRegex(), 'Geçersiz Şifre'),
        confirmPassword: Yup.string()
            .required('Şifreyi Onayla alanı zorunludur')
            .max(50, 'Şifreyi Onayla çok uzun')
            .min(2, 'Şifreyi Onayla çok kısa')
            .matches(passwordRegex(), 'Geçersiz Şifreyi Onayla'),
    })


    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
            PhoneNumber: '',

        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)
            if (values.password !== values.confirmPassword) {
                setIsLoading(false)
                const toast: IToast = { severity: 'warning', summary: "Uyarı", detail: "Parola ve Parola Doğrulama aynı değil", life: 3000 }
                dispatch(SET_TOAST(toast))
                return
            }

            const [err, data] = await to(authService.register(values))
            if (err) {
                const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
                dispatch(SET_TOAST(toast))
                setIsLoading(false)
                return
            }
            setIsLoading(false)
            const toast: IToast = { severity: 'success', summary: "Başarılı", detail: data.message, life: 3000 }
            dispatch(SET_TOAST(toast))
            // navigate('/login')
        }

    })


    const errorTemplate = (frm: any) => {
        return (
            <>
                {frm ? (<small className="p-error p-d-block "> {frm} </small>) : null}
            </>
        )
    }

    const inputClassName = (frm: any) => {
        return 'w-full !my-2 p-inputtext-sm ' +
            (frm ? 'p-invalid' : '')
    }



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
                        className={inputClassName(formik.errors.name)}
                    />
                    {errorTemplate(formik.errors.name)}

                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="surname" className='text-primary text-xl font-medium'>Surname</label>
                    <InputText placeholder="Surname" name='surname' id='surname'
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        className={inputClassName(formik.errors.surname)}
                    />
                    {errorTemplate(formik.errors.surname)}

                </div>
            </div>
            {/* email */}
            <div className="flex flex-col">
                <label htmlFor="email" className='text-primary text-xl font-medium'>Email</label>
                <InputText placeholder="Email" name='email' id='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={inputClassName(formik.errors.email)}
                />
                {errorTemplate(formik.errors.email)}
            </div>

            {/* phone */}
            <div className="flex flex-col">
                <label htmlFor="PhoneNumber" className='text-primary text-xl font-medium'>Phone Number</label>
                <InputMask placeholder='Phone Number' name='PhoneNumber' id='PhoneNumber'
                    value={formik.values.PhoneNumber}
                    onChange={formik.handleChange}
                    mask="(999) 999-9999"
                    slotChar="_"
                    className={inputClassName(formik.errors.PhoneNumber)}
                />
                {errorTemplate(formik.errors.PhoneNumber)}
            </div>


            <div className="flex sm:flex-row flex-col justify-between">

                <div className="flex flex-col sm:w-1/2 mr-2">
                    <label htmlFor="password" className='text-primary text-xl font-medium'>Password</label>
                    <Password placeholder="Password" name='password' id='password' toggleMask
                        pt={{
                            "input": { className: "w-full" },
                            "showIcon": { className: "relative flex -top-1" },
                            "hideIcon": { className: "relative flex -top-1" }
                        }}

                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className={inputClassName(formik.errors.password)}
                    />
                    {errorTemplate(formik.errors.password)}
                </div>
                <div className="flex flex-col sm:w-1/2">
                    <label htmlFor="confirmPassword" className='text-primary text-xl font-medium'>Confirm Password</label>
                    <Password placeholder="Confirm Password" name='confirmPassword' id='confirmPassword' toggleMask
                        pt={{
                            "input": { className: "w-full" },
                            "showIcon": { className: "relative flex -top-1" },
                            "hideIcon": { className: "relative flex -top-1" }
                        }}
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        className={inputClassName(formik.errors.confirmPassword)}
                    />
                    {errorTemplate(formik.errors.confirmPassword)}

                </div>
            </div>

            {/* submit */}
            <div className="flex flex-col mt-4">
                <button className='w-full h-12 bg-primary text-white text-xl font-bold rounded-3xl
                         hover:text-primary hover:bg-white hover:border-primary border border-solid border-primary
                         transition duration-300 ease-in-out active:scale-95'
                    type='submit'
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