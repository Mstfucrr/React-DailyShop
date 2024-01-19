import { Messages } from 'primereact/messages'
import un401 from '@/assets/images/errors/hop.jpg'

type Props = {
  msgs: any
}

const UnAuthorized = ({ msgs }: Props) => {
  return (
    <div className=''>
      <div className='flex flex-col items-center justify-center gap-y-20 px-2 py-40 sm:px-20 '>
        <a href='/' className=' w-full text-black'>
          {/* font-size: calc(1.375rem + 1.5vw); */}
          <h1 className='m-0 text-4xl font-semibold' style={{ fontSize: 'calc(1.375rem + 1.5vw)' }}>
            <span className='mr-1 border px-4 font-bold text-primary'>D</span>
            ailyShop
          </h1>
        </a>

        <div className='flex w-full flex-col items-center justify-center gap-x-32 xl:flex-row'>
          <h1 className='text-9xl'>401</h1>
          <h3 className='w-full text-5xl lg:w-1/2'>
            <Messages ref={msgs} className='w-full' />
          </h3>
        </div>
        <img src={un401} alt='' className='mx-auto w-3/4 max-w-4xl' />
      </div>
    </div>
  )
}

export default UnAuthorized
