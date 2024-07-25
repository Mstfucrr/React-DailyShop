'use client'
import { emailRegex, passwordRegex } from '@/helper/regex'
import { Formik } from 'formik'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import * as Yup from 'yup'
import useAuthService from '@/services/auth/use-auth-service'
import { useParams } from 'next/navigation'

const ForgotPasswordForm = () => {
  const { resetPassword, forgotPassword, isForgotPasswordLoading, isResetPasswordLoading } = useAuthService()

  const isLoading = isForgotPasswordLoading || isResetPasswordLoading

  const router = useParams()

  const token = router.token

  const handleSubmit = async (values: { email: string }) => forgotPassword(values.email)

  const handleResetPassword = async (values: { password: string }) => resetPassword({ Password: values.password })

  return (
    <div
      className='mx-auto w-full border border-solid 
        bg-white md:my-0 md:mt-[110px] md:w-[500px] '
    >
      <div className='mb-4 flex items-center justify-center bg-primary py-7'>
        <h1 className='text-center text-3xl font-bold text-white md:text-4xl'>Parolamı Unuttum</h1>
      </div>
      <div className='flex h-[300px] w-full flex-col items-center '>
        {token == null ? (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('E-posta geçersiz')
                .required('E-posta zorunlu')
                .max(50, 'E-posta çok uzun')
                .min(2, 'E-posta çok kısa')
                .matches(emailRegex(), 'E-posta geçersiz')
            })}
            onSubmit={handleSubmit}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit} className='flex h-auto w-4/5 flex-col justify-start py-10 '>
                <div className='flex flex-col gap-6'>
                  <label htmlFor='email' className='text-xl font-medium text-primary'>
                    E-Posta
                  </label>
                  <InputText
                    id='email'
                    name='email'
                    placeholder='E-Posta'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={
                      formik.errors.email && formik.touched.email
                        ? 'p-inputtext-sm p-invalid w-full'
                        : 'p-inputtext-sm w-full'
                    }
                  />

                  {formik.touched.email && formik.errors.email ? (
                    <div className='text-red-500'>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className='mt-8 flex flex-col'>
                  <button
                    className='h-12 w-full rounded-3xl border border-solid border-primary bg-primary
                            text-xl font-bold text-white transition duration-300 ease-in-out
                            hover:border-primary hover:bg-white hover:text-primary'
                    type='submit'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className='flex w-full items-center justify-center'>
                        <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-white'></div>
                      </div>
                    ) : (
                      <span>Gönder</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ password: '' }}
            validationSchema={Yup.object({
              password: Yup.string()
                .required('Parola zorunlu')
                .max(50, 'Parola çok uzun')
                .min(2, 'Parola çok kısa')
                .matches(passwordRegex(), 'Parola geçersiz')
            })}
            onSubmit={handleResetPassword}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit} className='flex h-auto w-4/5 flex-col justify-start py-10 '>
                <div className='flex flex-col gap-6'>
                  <label htmlFor='password' className='text-xl font-medium text-primary'>
                    Parola
                  </label>
                  <Password
                    placeholder='Parola'
                    name='password'
                    id='password'
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
                <div className='mt-8 flex flex-col'>
                  <button
                    className='h-12 w-full rounded-3xl border border-solid border-primary bg-primary
                            text-xl font-bold text-white transition duration-300 ease-in-out
                            hover:border-primary hover:bg-white hover:text-primary'
                    type='submit'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className='flex w-full items-center justify-center'>
                        <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-white'></div>
                      </div>
                    ) : (
                      <span>Gönder</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordForm
