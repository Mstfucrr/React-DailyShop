import { cn } from '@/utils/cn'
import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
  href: string
  className?: string
}

const NavbarLink = ({ children, href, className }: Props) => {
  return (
    <Link
      className={cn(
        'lx:py-[20px] block border-b-[1px] border-solid border-secondary px-[10px] py-[10px] text-black outline-none',
        className
      )}
      href={href}
    >
      {children}
    </Link>
  )
}

export default NavbarLink
