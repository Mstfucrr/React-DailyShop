import React from 'react'
import Settings from './settings'
import UserSettings from './UserSettings'
import ProductSettings from './ProductSettings'
import { Button } from 'primereact/button'
import Reports from './Reports'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

enum AdminPage {
  Settings = 'settings',
  Products = 'products',
  Users = 'users',
  Reports = 'reports'
}

type AdminSlug = {
  pathName: string
}

const Admin = ({ pathName }: AdminSlug) => {
  const router = useRouter()

  const renderAdminComponent = () => {
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

  const items = [
    {
      label: 'Site Ayarları',
      icon: 'pi pi-fw pi-home',
      command: () => {
        router.push('/admin/settings')
      },
      className: `${pathName === AdminPage.Settings ? '!bg-primary' : ''}`
    },
    {
      label: 'Kullanıcı Ayarları',
      icon: 'pi pi-fw pi-users',
      command: () => {
        router.push('/admin/users')
      },
      className: `${pathName === AdminPage.Users ? '!bg-primary' : ''}`
    },
    {
      label: 'Ürün Ayarları',
      icon: 'pi pi-fw pi-shopping-cart',
      command: () => {
        router.push('/admin/products')
      },
      className: `${pathName === AdminPage.Products ? '!bg-primary' : ''}`
    },
    {
      label: 'Raporlar',
      icon: 'pi pi-fw pi-chart-bar',
      command: () => {
        router.push('/admin/reports')
      },
      className: `${pathName === AdminPage.Reports ? '!bg-primary' : ''}`
    }
  ]

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
          {items.map(item => (
            <Button
              key={item.label}
              label={item.label}
              icon={item.icon}
              className={item.className}
              onClick={item.command}
              severity='secondary'
            />
          ))}
        </div>
        <div className='flex w-full pl-6 md:w-4/5'>{renderAdminComponent()}</div>
      </div>
    </div>
  )
}

export default Admin
