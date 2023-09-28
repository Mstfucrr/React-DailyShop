import { cartItemsExample } from '@/components/Shop/example.products'
import { IUser } from '@/services/auth/types'
import { user } from '../account/example.user'

const Checkout = () => {

    const User: IUser = user;

    return (
        <div className="flex md:flex-row flex-col px-10 gap-x-3">
            <div className="flex basis-8/12 bg-black h-5">

            </div>
            <div className="flex basis-4/12"></div>

        </div>
    )
}

export default Checkout