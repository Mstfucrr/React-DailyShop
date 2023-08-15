import product1 from '@/assets/images/products/product-1.jpg'
import product2 from '@/assets/images/products/product-2.jpg'
import product3 from '@/assets/images/products/product-3.jpg'
import product4 from '@/assets/images/products/product-4.jpg'
import product5 from '@/assets/images/products/product-5.jpg'
import CartListItem from './CartListItem'

type Props = {

}

export type Product = {
    id: number,
    name: string,
    image: string,
    price: string,
    quantity: number,
    total: string
}


const CartList = (props: Props) => {

    const products = [
        {
            id: 1,
            name: 'Colorful Stylish Shirt',
            image: product1,
            price: '$10.00',
            quantity: 1,
            total: '$140.00'
        },
        {
            id: 2,
            name: 'Colorful Stylish Shirt',
            image: product2,
            price: '$150.00',
            quantity: 3,
            total: '$30.00'
        },
        {
            id: 3,
            name: 'Colorful Stylish Shirt',
            image: product3,
            price: '$170.00',
            quantity: 1,
            total: '$10.00'
        },
        {
            id: 4,
            name: 'Colorful Stylish Shirt',
            image: product4,
            price: '$140.00',
            quantity: 2,
            total: '$20.00'
        },
        {
            id: 5,
            name: 'Colorful Stylish Shirt',
            image: product5,
            price: '$210.00',
            quantity: 1,
            total: '$10.00'
        },
    ] as Product[]



    return (
        <>
            <table className="w-100 text-[#6F6F6F] mb-0 text-center border-0 border-collapse">
                <thead className="bg-secondary text-black">
                    <tr>
                        <th className='p-3 border border-solid border-secondary'>Products</th>
                        <th className='p-3 border border-solid border-secondary'>Price</th>
                        <th className='p-3 border border-solid border-secondary'>Quantity</th>
                        <th className='p-3 border border-solid border-secondary'>Total</th>
                        <th className='p-3 border border-solid border-secondary'>Remove</th>
                    </tr>
                </thead>
                <tbody className='align-middle'>
                    {
                        products.map((product) => (
                            <CartListItem key={product.id} {...product} />
                        ))
                    }
                </tbody>

            </table>

        </>
    )
}

export default CartList