import { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import { Product } from './CartList'



const CartListItem = (product: Product) => {
  const [quantity, setQuantity] = useState(product.quantity)
  const [total, setTotal] = useState(product.total)


  useEffect(() => {
    setTotal((quantity * parseInt(product.price.replace('$', ''))).toString())
  }, [quantity])

  return (
    <tr className='bg-white'>
      <td className='p-3 border border-solid border-secondary align-middle'>
        <img src={product.image} width={50} alt="" 
        className='inline-block object-cover w-12 h-12 rounded-md'
        />
        <span className='ml-3'>{product.name}</span>
      </td>
      <td className='p-3 border border-solid border-secondary align-middle'>
        {product.price}
      </td>
      <td className='p-3 border border-solid border-secondary align-middle'>
        <div className="relative flex flex-nowrap justify-center items-stretch mx-auto max-w-[100px]">
          
          <div>
            <button className='inline-block bg-primary text-[#212529] border-primary py-2 px-2 leading-6 
                  hover:text-white hover:bg-primaryDark transition-all
                  duration-300 ease-in-out'
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}

                  >
              <FaMinus className='' />
            </button> 
          </div>
           
          <input type="text" className='relative w-[1%] flex-[1_1_auto] text-center bg-secondary py-1 px-2
                outline-none text-sm'
                // just number
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min={1}
                />
          <div>
            <button className='inline-block bg-primary text-[#212529] border-primary py-2 px-2 leading-6 
                  hover:text-white hover:bg-primaryDark transition-all
                  duration-300 ease-in-out'
                  onClick={() => setQuantity(quantity + 1)}

                  >
              <FaPlus className='' />
            </button>
          </div>

        </div>
      </td>
      <td className='p-3 border border-solid border-secondary align-middle'>
        ${total}
      </td>
      <td className='p-3 border border-solid border-secondary align-middle'>
        <button className='inline-block bg-primary text-[#212529] border-primary py-2 px-2 leading-6
              hover:text-white hover:bg-primaryDark transition-all
              duration-300 ease-in-out'>
          <FaTimes className='' />
        </button>

      </td>
    </tr>
  )
}

export default CartListItem