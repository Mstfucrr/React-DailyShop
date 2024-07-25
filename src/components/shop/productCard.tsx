import { useAddFavorite } from '@/services/favorites/use-favorites'
import { IProduct } from '@/shared/types'
import Link from 'next/link'
import { Card } from 'primereact/card'
import toast from 'react-hot-toast'
import { FaEye, FaHeart } from 'react-icons/fa'

type Props = {
  product: IProduct
}

const ProductCard = ({ product }: Props) => {
  const { mutate: addFavorite } = useAddFavorite()

  const handleAddFavorite = async (productId: number) => {
    addFavorite(productId, {
      onSuccess: () => toast.success('Ürün favorilere eklendi'),
      onError: () => toast.error('Ürün favorilere eklenemedi')
    })
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
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.image?.toString()}
                  alt={product.name}
                  // className="w-full h-80 object-scale-down transition-transform duration-500 hover:scale-125"
                  className='h-80 w-full object-scale-down transition-transform duration-500 hover:scale-125'
                />
              </Link>
            </div>
          </div>
        }
        footer={
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col'>
              <Link href={`/product/${product.id}`} className='flex items-center justify-center hover:underline'>
                <h6 className='text-truncate mb-3 pt-3 text-center font-bold'>{product.name}</h6>
              </Link>
              <div className='flex justify-center py-2'>
                <h6>
                  <b>{product.price} ₺</b>
                </h6>
              </div>
            </div>
            <div className='flex flex-row justify-between border-t-[1px] pt-2'>
              <Link href={`/product/${product.id}`} className='flex items-center'>
                <FaEye className='mr-2 text-primary' />
                Detaylı gör
              </Link>

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
