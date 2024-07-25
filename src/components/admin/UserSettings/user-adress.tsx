import { useAdimnUser } from '@/context/admin/UserContext'
import React from 'react'

const UserAddress = () => {
  const { selectedUserAddress } = useAdimnUser()
  return (
    <div className='mt-5'>
      <div className='flex flex-col'>
        <h3 className='text-center text-xl font-semibold uppercase text-primary'>Adresler</h3>
        <br />
        <div className='flex flex-wrap justify-around gap-4'>
          {selectedUserAddress?.map((address, index) => (
            <div
              className='w-96 rounded-md bg-white p-4 shadow-md transition duration-300 ease-in-out hover:shadow-xl'
              key={address.title}
            >
              <div className='flex flex-col gap-2'>
                <h6 className='text-lg font-semibold'>Adres {index + 1}</h6>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row gap-3'>
                  <h6 className='font-semibold'>Adres Başlığı</h6>
                  <span className='font-semibold text-primary'>{address.title}</span>
                </div>
                <div className='flex flex-row gap-3'>
                  <h6 className='font-semibold'>Adres Tanımı</h6>
                  <span className='font-semibold text-primary'>{address.description}</span>
                </div>
                <div className='flex flex-row gap-3'>
                  <h6 className='font-semibold'>Adres</h6>
                  <span className='font-semibold text-primary'>{address.address}</span>
                </div>
                <div className='flex flex-row gap-3'>
                  <h6 className='font-semibold'>Ülke</h6>
                  <span className='font-semibold text-primary'>{address.country}</span>
                </div>
                <div className='flex flex-row gap-3'>
                  <h6 className='font-semibold'>İl</h6>
                  <span className='font-semibold text-primary'>{address.city}</span>
                </div>
                <div className='flex flex-row gap-3'>
                  <h6 className='font-semibold'>Posta Kodu</h6>
                  <span className='font-semibold text-primary'>{address.zipCode}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserAddress
