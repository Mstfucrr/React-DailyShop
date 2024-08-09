import reactQueryConfig from '@/configs/react-query-config'
import { IUser } from '@/services/auth/types'
import useAuthService from '@/services/auth/use-auth-service'
import { useFormik } from 'formik'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { Fieldset } from 'primereact/fieldset'
import { InputMask } from 'primereact/inputmask'
import { InputText } from 'primereact/inputtext'
import { ProgressSpinner } from 'primereact/progressspinner'
import React from 'react'
import * as Yup from 'yup'

type Props = {
  user: IUser
  userState: IUser
  profileImage: any
  setProfileImage: any
}

const UserInfoForm = ({ user, userState, profileImage, setProfileImage }: Props) => {
  const { updateAccount, isUpdateAccountLoading } = useAuthService()

  const handleProfileImageChange = (e: any) => {
    const file = e.target.files[0]
    setProfileImage(file)
  }

  const validationSchema = Yup.object({
    id: Yup.number().notRequired(),
    name: Yup.string().required('Ad alanı zorunludur').min(2, 'Ad alanı en az 2 karakter olmalıdır'),
    surname: Yup.string().required('Soyad alanı zorunludur'),
    email: Yup.string().email('Geçerli bir email adresi giriniz').required('Email alanı zorunludur'),
    phone: Yup.string().required('Telefon alanı zorunludur')
  })

  const formik = useFormik({
    initialValues: {
      name: userState.name,
      surname: userState.surname,
      email: userState.email,
      phone: userState.phone,
      profileImage: userState.profileImage
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      if (profileImage instanceof File) formData.append('ProfileImageFile', profileImage)
      else formData.append('ProfileImage', values.profileImage)
      formData.append('FirstName', values.name)
      formData.append('LastName', values.surname)
      formData.append('Email', values.email)
      formData.append('PhoneNumber', values.phone)
      updateAccount(formData, {
        onSuccess: () => {
          reactQueryConfig.invalidateQueries({ queryKey: ['getAccount'] })
        }
      })
    }
  })

  const errors = formik.errors as any

  const errorTemplate = (name: any) => {
    return <>{errors?.[name] ? <small className='text-red-500 '>{errors[name]}</small> : null}</>
  }

  const inputClassName = (fieldName: any) => {
    return 'w-full !my-2 p-inputtext-sm ' + (errors?.[fieldName] ? 'p-invalid' : '')
  }

  const buttonsLoadingTemplete = () => {
    return (
      <div className='flex w-1/4'>
        <ProgressSpinner
          style={{ width: '50px', height: '50px' }}
          strokeWidth='8'
          fill='var(--surface-ground)'
          animationDuration='.5s'
        />
      </div>
    )
  }
  return (
    <>
      {/* resim */}
      <Fieldset
        legend={
          <div className='align-items-center flex text-primary'>
            <span className='pi pi-user mr-2'></span>
            <span className='text-lg font-bold'>Profil Resmi</span>
          </div>
        }
        className='mb-4'
      >
        <div className='flex flex-col items-center'>
          {profileImage != null && (
            <Image
              src={typeof profileImage === 'string' ? profileImage : URL.createObjectURL(profileImage)}
              alt='profile'
              className='max-h-[250px] w-1/2 max-w-[250px] rounded-full object-cover lg:w-1/3'
              width={250}
              height={250}
            />
          )}
          <form method='post' encType='multipart/form-data' className='flex flex-col items-center'>
            <input
              type='file'
              name='profileImage'
              id='profileImage'
              className='hidden'
              onInput={(e: any) => {
                handleProfileImageChange(e)
              }}
            />
            <label
              htmlFor='profileImage'
              className='mt-4 cursor-pointer rounded-full bg-primary px-6 py-4 text-white transition-all duration-300 hover:bg-primaryDark'
            >
              Resmi Değiştir
            </label>
          </form>
          {profileImage !== user.profileImage && (
            <div className='justify-content-end my-4 flex flex-wrap gap-2'>
              {isUpdateAccountLoading ? (
                buttonsLoadingTemplete()
              ) : (
                <>
                  <Button
                    label='Save'
                    icon='pi pi-check'
                    type='submit'
                    onClick={() => {
                      formik.handleSubmit()
                    }}
                  />
                  <Button
                    label='Cancel'
                    icon='pi pi-times'
                    className='p-button-outlined p-button-secondary'
                    onClick={() => {
                      formik.setFieldValue('profileImage', userState.profileImage)
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </Fieldset>

      {/* ad soyad */}
      <Fieldset
        legend={
          <div className='align-items-center flex text-primary'>
            <span className='pi pi-user mr-2'></span>
            <span className='text-lg font-bold'>Ad Soyad</span>
          </div>
        }
        className='mb-4'
      >
        <div className='flex flex-col'>
          <div className='flex flex-col items-center gap-9 lg:flex-row'>
            <div className='flex w-full flex-col'>
              <label htmlFor='name' className='text-primary'>
                Ad
              </label>
              <InputText
                id='name'
                name='name'
                value={formik.values.name}
                onChange={e => formik.setFieldValue('name', e.target.value)}
                className={inputClassName('name')}
              />
              {errorTemplate('name')}
            </div>

            <div className='flex w-full flex-col'>
              <label htmlFor='surname' className='text-primary'>
                Soyad
              </label>
              <InputText
                id='surname'
                name='surname'
                value={formik.values.surname}
                onChange={e => formik.setFieldValue('surname', e.target.value)}
                className={inputClassName('surname')}
              />
              {errorTemplate('surname')}
            </div>
          </div>

          {formik.values.name !== user.name || formik.values.surname !== user.surname ? (
            <div className='justify-content-end my-4 flex flex-wrap gap-2'>
              {isUpdateAccountLoading
                ? buttonsLoadingTemplete()
                : !formik.errors.name &&
                  !formik.errors.surname && (
                    <Button
                      label='Save'
                      icon='pi pi-check'
                      type='submit'
                      onClick={() => {
                        formik.handleSubmit()
                      }}
                    />
                  )}
              <Button
                label='Cancel'
                icon='pi pi-times'
                className='p-button-outlined p-button-secondary'
                onClick={() => {
                  formik.setFieldValue('name', user.name)
                  formik.setFieldValue('surname', user.surname)
                }}
              />
            </div>
          ) : null}
        </div>
      </Fieldset>

      {/* iletişim bilgileri */}
      <Fieldset
        legend={
          <div className='align-items-center flex text-primary'>
            <span className='pi pi-phone mr-2 mt-1'></span>
            <span className='text-lg font-bold'>İletişim Bilgileri</span>
          </div>
        }
        className='mb-4'
        toggleable
      >
        <div className='flex flex-col'>
          <div className='flex flex-col items-center gap-9 lg:flex-row'>
            <div className='flex w-full flex-col'>
              <label htmlFor='email' className='text-primary'>
                E-posta
              </label>
              <InputText
                id='email'
                name='email'
                value={formik.values.email}
                onChange={e => formik.setFieldValue('email', e.target.value)}
                className={inputClassName('email')}
              />
              {errorTemplate('email')}
            </div>
            <div className='flex w-full flex-col'>
              <label htmlFor='phone' className='text-primary'>
                Telefon
              </label>
              <InputMask
                id='phone'
                name='phone'
                value={formik.values.phone}
                onChange={e => formik.setFieldValue('phone', e.target.value)}
                mask='(999) 999-9999'
                className={inputClassName('phone')}
              />
              {errorTemplate('phone')}
            </div>
          </div>

          {user.email !== formik.values.email || user.phone !== formik.values.phone ? (
            <div className='justify-content-end my-4 flex flex-wrap gap-2'>
              {isUpdateAccountLoading
                ? buttonsLoadingTemplete()
                : !formik.errors.phone &&
                  !formik.errors.email && (
                    <Button
                      label='Save'
                      icon='pi pi-check'
                      type='submit'
                      onClick={() => {
                        formik.handleSubmit()
                      }}
                    />
                  )}
              <Button
                label='Cancel'
                icon='pi pi-times'
                className='p-button-outlined p-button-secondary'
                onClick={() => {
                  formik.setFieldValue('email', user.email)
                  formik.setFieldValue('phone', user.phone)
                }}
              />
            </div>
          ) : null}
        </div>
      </Fieldset>
    </>
  )
}

export default UserInfoForm
