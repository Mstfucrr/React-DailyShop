import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { emailRegex, passwordRegex } from '@/helper/regex'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/auth/auth.service'
import { SET_TOAST } from '@/store/Toast'

import { IToast } from '@/store/Toast/type'
import to from 'await-to-js'
import { InputMask } from 'primereact/inputmask'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Ad alanı zorunludur').max(50, 'Ad çok uzun').min(2, 'Ad çok kısa'),
    surname: Yup.string().required('Soyad alanı zorunludur').max(50, 'Soyad çok uzun').min(2, 'Soyad çok kısa'),
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
      .matches(passwordRegex(), 'Geçersiz Şifreyi Onayla')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      PhoneNumber: ''
    },
    validationSchema,
    onSubmit: async values => {
      setIsLoading(true)
      if (values.password !== values.confirmPassword) {
        setIsLoading(false)
        const toast: IToast = {
          severity: 'warn',
          summary: 'Uyarı',
          detail: 'Parola ve Parola Doğrulama aynı değil',
          life: 3000
        }
        dispatch(SET_TOAST(toast))
        return
      }

      const [err, data] = await to(authService.register(values))
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
      setIsLoading(false)
      const toast: IToast = {
        severity: 'success',
        summary: 'Başarılı',
        detail: data.message,
        life: 3000
      }
      dispatch(SET_TOAST(toast))
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
  })

  const errorTemplate = (frm: any) => {
    return <>{frm ? <small className='p-error p-d-block '> {frm} </small> : null}</>
  }

  const inputClassName = (frm: any) => {
    return 'w-full !my-2 p-inputtext-sm ' + (frm ? 'p-invalid' : '')
  }

  return (
    <form className='flex h-auto w-4/5 flex-col' action='' onSubmit={formik.handleSubmit}>
      <div className='flex flex-col justify-between md:flex-row'>
        <div className='mr-2 flex w-full flex-col'>
          <label htmlFor='name' className='text-xl font-medium text-primary'>
            Ad
          </label>
          <InputText
            placeholder='Ad'
            name='name'
            id='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            className={inputClassName(formik.errors.name)}
          />
          {errorTemplate(formik.errors.name)}
        </div>
        <div className='flex w-full flex-col'>
          <label htmlFor='surname' className='text-xl font-medium text-primary'>
            Soyad
          </label>
          <InputText
            placeholder='Soyad'
            name='surname'
            id='surname'
            value={formik.values.surname}
            onChange={formik.handleChange}
            className={inputClassName(formik.errors.surname)}
          />
          {errorTemplate(formik.errors.surname)}
        </div>
      </div>
      {/* email */}
      <div className='flex flex-col'>
        <label htmlFor='email' className='text-xl font-medium text-primary'>
          E-Posta
        </label>
        <InputText
          placeholder='E-Posta'
          name='email'
          id='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          className={inputClassName(formik.errors.email)}
        />
        {errorTemplate(formik.errors.email)}
      </div>

      {/* phone */}
      <div className='flex flex-col'>
        <label htmlFor='PhoneNumber' className='text-xl font-medium text-primary'>
          Telefon Numarası
        </label>
        <InputMask
          placeholder='(555) 555-5555'
          name='PhoneNumber'
          id='PhoneNumber'
          value={formik.values.PhoneNumber || undefined}
          onChange={formik.handleChange}
          mask='(999) 999-9999'
          slotChar='_'
          className={inputClassName(formik.errors.PhoneNumber)}
        />
        {errorTemplate(formik.errors.PhoneNumber)}
      </div>

      <div className='flex flex-col justify-between sm:flex-row'>
        <div className='mr-2 flex flex-col sm:w-1/2'>
          <label htmlFor='password' className='text-xl font-medium text-primary'>
            Parola
          </label>
          <Password
            placeholder='Parola'
            name='password'
            id='password'
            toggleMask
            pt={{
              input: { className: 'w-full' },
              showIcon: { className: 'relative flex -top-1' },
              hideIcon: { className: 'relative flex -top-1' }
            }}
            value={formik.values.password}
            onChange={formik.handleChange}
            className={inputClassName(formik.errors.password)}
          />
          {errorTemplate(formik.errors.password)}
        </div>
        <div className='flex flex-col sm:w-1/2'>
          <label htmlFor='confirmPassword' className='text-xl font-medium text-primary'>
            Parola Onayla
          </label>
          <Password
            placeholder='Parola Onayla'
            name='confirmPassword'
            id='confirmPassword'
            toggleMask
            pt={{
              input: { className: 'w-full' },
              showIcon: { className: 'relative flex -top-1' },
              hideIcon: { className: 'relative flex -top-1' }
            }}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            className={inputClassName(formik.errors.confirmPassword)}
          />
          {errorTemplate(formik.errors.confirmPassword)}
        </div>
      </div>

      {/* submit */}
      <div className='mt-4 flex flex-col'>
        <button
          className='h-12 w-full rounded-3xl border border-solid border-primary bg-primary
                         text-xl font-bold text-white transition duration-300 ease-in-out
                         hover:border-primary hover:bg-white hover:text-primary active:scale-95'
          type='submit'
        >
          {isLoading ? (
            <div className='flex w-full items-center justify-center'>
              <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-white'></div>
            </div>
          ) : (
            <div>Kayıt Ol</div>
          )}
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
