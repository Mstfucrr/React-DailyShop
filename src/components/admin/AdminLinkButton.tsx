import { cn } from '@/utils/cn'
import Link from 'next/link'
import { Button } from 'primereact/button'

const AdminLinkButton = ({ href, label, icon, isActive }) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <Button label={label} icon={icon} className={cn(isActive ? '!bg-primary' : '')} severity='secondary' />
    </Link>
  )
}

export default AdminLinkButton
