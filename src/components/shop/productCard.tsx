import { favoritesService } from '@/services/favorites/favorites.service'
import { IProduct } from '@/shared/types'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { authSelector } from '@/store/auth'
import to from 'await-to-js'
import { Card } from 'primereact/card'
import { FaEye, FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

type Props = {
  product: IProduct
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch()
  const { token } = useSelector(authSelector)

  const handleAddFavorite = async (id: number) => {
    const [err, data] = await to(favoritesService.addFavorite(token, id))
    if (err) return console.log(err)
    const toast: IToast = {
      severity: 'success',
      summary: 'Başarılı',
      detail: data?.message,
      life: 3000
    }
    dispatch(SET_TOAST(toast))
  }

  return (
    <div
      className={`z-50 flex w-[350px] max-w-[400px] pb-4 ${
        product.stock === 0 || product.isDeleted ? 'opacity-50 grayscale' : ''
      }`}
      key={product.id}
    >
      <Card
        className='w-full'
        header={
          <div className='relative'>
            <div className='overflow-hidden rounded-md border border-gray-200'>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image?.toString()}
                  alt={product.name}
                  // className="w-full h-80 object-scale-down transition-transform duration-500 hover:scale-125"
                  className='h-80 w-full object-scale-down transition-transform duration-500 hover:scale-125'
                />
              </Link>
            </div>
            <div className='absolute left-0 top-0 -z-10 h-full w-full border border-gray-200 opacity-0 transition-opacity duration-500 hover:opacity-100'></div>
          </div>
        }
        footer={
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col'>
              <h6 className='text-truncate mb-3 pt-3 text-center font-bold'>{product.name}</h6>
              <div className='flex justify-center py-2'>
                <h6>
                  <b>{product.price} ₺</b>
                </h6>
              </div>
            </div>
            <div className='flex flex-row justify-between border-t-[1px] pt-2'>
              <a href={`/product/${product.id}`} className='flex items-center'>
                <FaEye className='mr-2 text-primary' />
                Detaylı gör
              </a>

              {/* add favorite */}
              <button className='flex items-center hover:scale-105' onClick={() => handleAddFavorite(product.id)}>
                <FaHeart className='mr-2 text-primary' />
                Favorilere ekle
              </button>
            </div>
          </div>
        }
      />
    </div>
  )
}

export default ProductCard
