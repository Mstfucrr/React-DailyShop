import { IUser } from '@/services/auth/types'
import { motion } from 'framer-motion'
import { Fieldset } from 'primereact/fieldset'
import { useEffect, useMemo, useState } from 'react'
import { Button } from 'primereact/button'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { ProgressSpinner } from 'primereact/progressspinner'

import RenderAddressFields from './renderAddressFields'
import { useAuth } from '@/hooks/useAuth'
import useAuthService from '@/services/auth/use-auth-service'
import UserInfoForm from './userInfoForm'

const UserInformation = () => {
  const { auth: user, loading } = useAuth()
  const [userState, setUserState] = useState<IUser>(user)
  const [addressesState, setAddressesState] = useState(user.addresses)
  const [profileImage, setProfileImage] = useState<string | File>(user.profileImage)
  const { deleteAccount, isUpdateAccountLoading, isDeleteAccountLoading } = useAuthService()

  const isLoading = useMemo(
    () => isUpdateAccountLoading || isDeleteAccountLoading || loading,
    [isUpdateAccountLoading, isDeleteAccountLoading, loading]
  )

  useEffect(() => {
    setUserState(user)
    setAddressesState(user.addresses)
    setProfileImage(user.profileImage)
  }, [user])

  const handleAddressAdd = () => {
    const address = {
      id: 0,
      title: '',
      address: '',
      description: '',
      city: '',
      country: '',
      zipCode: ''
    } as any

    const newAddresses = [...addressesState, address]
    setAddressesState(newAddresses)
  }

  const handleAccountDelete = () => deleteAccount

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      className='relative w-full px-[15px]'
    >
      {isLoading ? (
        <div className='absolute left-0 top-0 z-50 flex size-full items-center justify-center bg-white bg-opacity-90'>
          <ProgressSpinner
            style={{ width: '50px', height: '50px' }}
            strokeWidth='8'
            fill='var(--surface-ground)'
            animationDuration='.5s'
          />
        </div>
      ) : (
        <>
          <h3 className='my-4 text-4xl text-primaryDark'>Kullanıcı Bilgilerim</h3>

          {userState.id ? (
            <UserInfoForm
              user={user}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              userState={userState}
            />
          ) : (
            <div className='flex h-96 items-center justify-center'>
              <ProgressSpinner
                style={{ width: '50px', height: '50px' }}
                strokeWidth='8'
                fill='var(--surface-ground)'
                animationDuration='.5s'
              />
            </div>
          )}

          {/* adres bilgileri */}
          <Fieldset
            legend={
              <div className='align-items-center flex text-primary' id='MyAddress'>
                <span className='pi pi-map-marker mr-2 mt-1'></span>
                <span className='text-lg font-bold'>Adres Bilgileri</span>
              </div>
            }
            className='mb-4'
            toggleable
          >
            <div className='flex flex-col'>
              {addressesState?.map(address => <RenderAddressFields key={address.id} address={address} />)}

              {/* address ekle  */}

              <Button label='Ekle' severity='success' className='w-full md:w-1/2' onClick={handleAddressAdd} />
            </div>
          </Fieldset>

          {/* hesap sil */}
          <Fieldset
            legend={
              <div className='align-items-center flex text-primary'>
                <span className='pi pi-trash mr-2 mt-1'></span>
                <span className='text-lg font-bold'>Hesabı Sil</span>
              </div>
            }
            className='mb-4'
            toggleable
          >
            <div className='flex flex-col'>
              <div className='flex w-full flex-col'>
                <ConfirmDialog />
                <Button
                  onClick={() => {
                    const dia = confirmDialog({
                      message: 'Hesabınızı silmek istediğinize emin misiniz?',
                      header: 'Hesap Sil',
                      icon: 'pi pi-exclamation-triangle',
                      acceptClassName: 'p-button-danger',
                      accept: () => {
                        handleAccountDelete()
                        dia.hide()
                      },
                      reject: () => {
                        dia.hide()
                      },
                      closable: false
                    })
                  }}
                  label='Hesabı Sil'
                  severity='danger'
                  className='w-full md:w-1/2'
                />
              </div>
            </div>
          </Fieldset>
        </>
      )}
    </motion.div>
  )
}

export default UserInformation
