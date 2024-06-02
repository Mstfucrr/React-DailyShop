import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import carousel1 from '@/assets/images/carousel-1.jpg'
import carousel2 from '@/assets/images/carousel-2.jpg'

const HeaderCarousel = () => {
  const slide = [
    {
      img: carousel1,
      title: 'New Collection',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
    },
    {
      img: carousel2,
      title: 'New Collection',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
    }
  ]

  return (
    <div className='relative mt-1 w-full overflow-hidden'>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000
        }}
        speed={700}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className='h-[410px]'
      >
        {slide.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.img.src} alt='' className='h-full w-full object-cover' />
            <div className='absolute left-0 top-0 h-full w-full bg-black bg-opacity-30'></div>
            <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center'>
              <h1 className='text-4xl font-bold text-white'>{item.title}</h1>
              <p className='text-center text-sm font-semibold text-white md:text-lg xl:text-2xl'>{item.description}</p>
              <button className='mt-5 bg-white px-8 py-3 text-lg font-semibold text-black hover:cursor-pointer hover:bg-black hover:text-white hover:transition-all hover:duration-150'>
                Shop Now
              </button>
            </div>
          </SwiperSlide>
        ))}
        <div
          className="swiper-button-prev top-[5%] h-full w-[13%]
                        after:bg-black after:p-3 after:text-[30px] after:text-white after:opacity-50 after:transition-all
                        after:duration-150 after:content-['prev'] after:hover:cursor-pointer after:hover:opacity-90
                    "
        ></div>

        <div
          className="swiper-button-next top-[5%] h-full w-[13%]
                        after:bg-black after:p-3 after:text-[30px] after:text-white after:opacity-50 after:transition-all
                        after:duration-150 after:content-['next'] after:hover:cursor-pointer after:hover:opacity-90
                    "
        ></div>
      </Swiper>
    </div>
  )
}

export default HeaderCarousel
