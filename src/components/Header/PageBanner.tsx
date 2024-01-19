type Props = {
  title: string
  link: string
}

const PageBanner = (props: Props) => {
  return (
    <div className='relative mx-auto w-full bg-secondary px-[15px]'>
      <div className='flex min-h-[300px] flex-col justify-center '>
        <h1 className='text-center text-[2.5rem] font-semibold uppercase text-black'>{props.title}</h1>
        <div className='mx-auto mt-1 inline-flex'>
          <a href='/' className='text-primary'>
            Home
          </a>
          <span className='mx-2'>/</span>
          <a href={props.link} className='text-gray-500'>
            {props.title}
          </a>
        </div>
      </div>
    </div>
  )
}

export default PageBanner
