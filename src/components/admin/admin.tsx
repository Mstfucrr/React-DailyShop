'use client'
import React from 'react'
import Settings from './settings'
import UserSettings from './UserSettings'
import ProductSettings from './ProductSettings'
import Reports from './Reports'
import Link from 'next/link'
import AdminLinkButton from './AdminLinkButton'

enum AdminPage {
  Settings = 'settings',
  Products = 'products',
  Users = 'users',
  Reports = 'reports'
}

type AdminSlug = {
  pathName: string
}

const RenderAdminComponent = ({ pathName }: AdminSlug) => {
  switch (pathName) {
    case AdminPage.Settings:
      return <Settings />
    case AdminPage.Users:
      return <UserSettings />
    case AdminPage.Products:
      return <ProductSettings />
    case AdminPage.Reports:
      return <Reports />
    default:
      return <Settings />
  }
}

const Admin = ({ pathName }: AdminSlug) => {
  return (
    <div className='mx-auto flex h-auto w-5/6 flex-col pt-10'>
      <div className='flex flex-wrap justify-between gap-5 py-7'>
        <Link href='/' className=' text-black'>
          <div className='m-0 text-4xl font-semibold' style={{ fontSize: 'calc(1.375rem + 1.5vw)' }}>
            <span className='mr-1 border px-4 font-bold text-primary'>D</span>
            {`ailyShop`}
          </div>
        </Link>

        <div className='flex items-center justify-end'>
          <div className='flex flex-col'>
            <span className='text-xl font-semibold'>Hoşgeldin</span>
            <span className='font-bold text-primary'>Admin</span>
          </div>
          <div className='ml-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary'>
            <i className='pi pi-user text-2xl text-white'></i>
          </div>
        </div>
      </div>

      <div className='mx-auto flex w-full flex-wrap gap-y-6'>
        <div className='flex w-full flex-col gap-3 md:w-1/5'>
          <AdminLinkButton
            href='/admin/settings'
            label='Site Ayarları'
            icon='pi pi-fw pi-home'
            isActive={pathName === AdminPage.Settings}
          />
          <AdminLinkButton
            href='/admin/users'
            label='Kullanıcı Ayarları'
            icon='pi pi-fw pi-users'
            isActive={pathName === AdminPage.Users}
          />
          <AdminLinkButton
            href='/admin/products'
            label='Ürün Ayarları'
            icon='pi pi-fw pi-shopping-cart'
            isActive={pathName === AdminPage.Products}
          />
          <AdminLinkButton
            href='/admin/reports'
            label='Raporlar'
            icon='pi pi-fw pi-chart-bar'
            isActive={pathName === AdminPage.Reports}
          />
        </div>
        <div className='flex w-full pl-6 md:w-4/5'>
          <RenderAdminComponent pathName={pathName} />
        </div>
      </div>
    </div>
  )
}

export default Admin
