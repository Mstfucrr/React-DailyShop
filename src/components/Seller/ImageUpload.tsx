import { Tooltip } from 'primereact/tooltip'
import { Button } from 'primereact/button'
import { useDispatch } from 'react-redux'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { FaTimes } from 'react-icons/fa'
import { useCallback } from 'react'

type Props = {
  setcoverImage: React.Dispatch<React.SetStateAction<File | null>>
  setImages: React.Dispatch<React.SetStateAction<File[]>>
  productImages: File[] | null
  coverImage: File | null
}

const ImageUpload = ({ setcoverImage, setImages, productImages, coverImage }: Props) => {
  const handleCoverImage = (e: any) => {
    if (e.target.files == null) return
    setcoverImage(e.target.files[0])
  }

  const RenderCoverImage = useCallback(() => {
    return (
      <>
        <div className='relative flex h-80 justify-center'>
          {coverImage !== null ? (
            <img
              src={URL.createObjectURL(coverImage)}
              alt={coverImage.name || 'resim'}
              className='h-auto w-[350px] object-contain'
            />
          ) : (
            <div className='flex h-[350px] w-[350px] items-center justify-center bg-gray-200'>
              <i className='pi pi-image' style={{ fontSize: '5em' }}></i>
            </div>
          )}
          <div
            className='absolute top-2/3 mt-28 transform rounded-full
                              border border-dashed border-green-500 bg-white bg-opacity-60 transition-all
                              duration-300 ease-in-out hover:scale-110 hover:bg-opacity-80
                          '
          >
            <Button
              icon='pi pi-upload'
              severity='success'
              rounded
              text={true}
              className='h-full w-full'
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.onchange = handleCoverImage
                input.click()
              }}
            >
              <div className='px-5'>
                <span className='text-sm'>Kapak Fotoğrafı Yükle</span>
              </div>
            </Button>
          </div>
        </div>
      </>
    )
  }, [coverImage])

  const RenderAnotherImages = useCallback(() => {
    return (
      <>
        {productImages != null && (
          <div className='mt-3 flex w-full flex-row flex-wrap gap-4'>
            {productImages.map(image => (
              <div
                className='relative flex h-auto w-full justify-end rounded-3xl border border-dashed border-blue-600 md:w-[300px]'
                key={image.name}
              >
                <FaTimes
                  className='absolute right-3 top-3 float-right cursor-pointer text-2xl text-red-400'
                  onClick={() => {
                    handleRemoveImage(image)
                  }}
                />
                <img src={URL.createObjectURL(image)} alt='resim' className=' object-contain p-2 ' />
              </div>
            ))}

            <button
              className='h-auto w-full transform rounded-3xl border border-dashed border-blue-600 bg-opacity-10 text-2xl
                                                text-blue-600 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-600 hover:text-white md:w-[300px]'
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.multiple = true
                input.click()
                input.onchange = e => {
                  handleAddImage(e as any)
                }
              }}
            >
              +
            </button>
          </div>
        )}
      </>
    )
  }, [productImages])

  const dispatch = useDispatch()

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return
    if (e.target.files.length === 0) return
    // aynı dosya varsa hata ver
    for (const file of e.target.files) {
      if (productImages?.find(img => img.name === file.name)) {
        const toast: IToast = {
          severity: 'warn',
          summary: 'Uyarı',
          detail: 'Aynı dosyadan var',
          life: 5000
        }
        dispatch(SET_TOAST(toast))
        return
      }
    }
    const files = Array.from(e.target.files)
    setImages(prev => [...prev, ...files])
  }

  const handleRemoveImage = (image: File) => {
    if (productImages === null) return
    if (typeof image === 'string') {
      setImages(productImages.filter(img => img !== image))
      return
    }
    setImages(productImages.filter(img => img !== image))
  }

  return (
    <>
      <Tooltip target='.custom-choose-btn' content='Choose' position='bottom' />
      {/* for cover phote */}
      <div className='flex w-full flex-col gap-y-28'>
        <div className='relative flex flex-col gap-y-5'>
          <h2 className='text-2xl font-semibold'>Kapak Fotoğrafı</h2>
          <RenderCoverImage />
        </div>

        {/* for another photos ( multi ) */}
        <div className='relative flex flex-col gap-y-5'>
          <h2 className='text-2xl font-semibold'>Diğer Fotoğraflar</h2>
          <RenderAnotherImages />
        </div>
      </div>
    </>
  )
}

export default ImageUpload
