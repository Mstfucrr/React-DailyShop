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
        const toast: IToast = { severity: 'success', summary: 'Başarılı', detail: data?.message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }


    return (
        <div className={`flex pb-4 w-[350px] max-w-[400px] z-50 ${(product.stock === 0 || product.isDeleted) ? 'opacity-50 grayscale' : ''}`} key={product.id}>
            <Card
                className="w-full"
                header={
                    <div className="relative">
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.image?.toString()}
                                    alt={product.name}
                                    // className="w-full h-80 object-scale-down transition-transform duration-500 hover:scale-125"
                                    className="w-full h-80 object-scale-down transition-transform duration-500 hover:scale-125"
                                />
                            </Link>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full border -z-10 border-gray-200 opacity-0 transition-opacity duration-500 hover:opacity-100"></div>
                    </div>

                }
                footer={
                    <div className="flex justify-between flex-col">
                        <div className="flex flex-col">
                            <h6 className="text-truncate mb-3 font-bold text-center pt-3">{product.name}</h6>
                            <div className="flex justify-center py-2">
                                <h6> <b>${product.price}</b></h6><h6 className="text-muted ml-2"><del>${product.price}</del></h6>
                            </div>

                        </div>
                        <div className="flex flex-row justify-between border-t-[1px] pt-2">
                            <a href={`/product/${product.id}`}
                                className="flex items-center"><FaEye className='text-primary mr-2' />Detaylı gör</a>

                            {/* add favorite */}
                            <button className="flex items-center hover:scale-105"
                                onClick={() => handleAddFavorite(product.id)}
                            ><FaHeart className='text-primary mr-2' />Favorilere ekle</button>


                        </div>

                    </div>
                }
            >
            </Card>
        </div>
    )
}

export default ProductCard