import { useState } from 'react'
import { authService } from '@/services/auth/auth.service'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { emailRegex, passwordRegex } from '@/helper/regex'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { SET_ADMIN_AUTH, SET_AUTH } from '@/store/auth'
import to from 'await-to-js'

const LoginForm = () => {
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
      .matches(passwordRegex(), 'Password is invalid')
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async values => {
      setIsLoading(true)
      const [err, data] = await to(authService.login(values))
      if (err) {
        const toast: IToast = {
          severity: 'error',
          summary: 'Hata',
          detail: err.message,
          life: 3000
        }
        dispatch(SET_TOAST(toast))
        setIsLoading(false)
        return
      }
      const { authorization, user, message } = data
      setIsLoading(false)
      if (user != undefined) {
        dispatch(SET_AUTH({ user: user, token: authorization }))
        const toast: IToast = {
          severity: 'success',
          summary: 'Başarılı',
          detail: message,
          life: 3000
        }
        dispatch(SET_TOAST(toast))
        if (user.role == 'admin') {
          dispatch(SET_ADMIN_AUTH())
          navigate('/admin')
        }
        const from = localStorage.getItem('from') || '/'
        localStorage.removeItem('from')
        navigate(from)
      }
    }
  })

  return (
    <form className='flex h-auto w-4/5 flex-col pb-16' action='' onSubmit={formik.handleSubmit}>
      <div className='flex flex-col'>
        <label htmlFor='email' className='text-xl font-medium text-primary'>
          E-Posta
        </label>
        <InputText
          name='email'
          id='email'
          placeholder='E-Posta'
          value={formik.values.email}
          onChange={formik.handleChange}
          className={
            formik.errors.email && formik.touched.email ? 'p-inputtext-sm p-invalid w-full' : 'p-inputtext-sm w-full'
          }
        />
        {formik.errors.email && formik.touched.email ? (
          <small id='username2-help' className='p-error'>
            {formik.errors.email}
          </small>
        ) : null}
      </div>
      <div className='mt-4 flex flex-col'>
        <label htmlFor='password' className='text-xl font-medium text-primary'>
          Parola
        </label>
        <Password
          placeholder='Parola'
          name='password'
          id='password'
          feedback={false}
          pt={{
            input: {
              className: 'w-full'
            },
            showIcon: {
              className: 'relative flex -top-1'
            },
            hideIcon: {
              className: 'relative flex -top-1'
            }
          }}
          className={
            formik.errors.password && formik.touched.password
              ? 'p-inputtext-sm p-invalid w-full'
              : 'p-inputtext-sm w-full'
          }
          value={formik.values.password}
          onChange={formik.handleChange}
          toggleMask
        />
        {formik.errors.password && formik.touched.password ? (
          <small id='username2-help' className='p-error'>
            {formik.errors.password}
          </small>
        ) : null}
      </div>

      {/* forgot pass */}
      <div className='mx-auto mt-4 flex flex-col'>
        <Link
          to={'/forgot-password'}
          className='text-sm font-thin underline
                            transition duration-300 ease-in-out hover:text-black
                        '
        >
          Parolanızı mı unuttunuz ?{' '}
        </Link>
      </div>

      {/* submit */}
      <div className='mt-4 flex flex-col'>
        <button
          className='h-12 w-full rounded-3xl border border-solid border-primary bg-primary
                            text-xl font-bold text-white transition duration-300 ease-in-out
                            hover:border-primary hover:bg-white hover:text-primary'
          type='submit'
        >
          {isLoading ? (
            <div className='flex w-full items-center justify-center'>
              <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-white'></div>
            </div>
          ) : (
            <span>Giriş Yap</span>
          )}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
