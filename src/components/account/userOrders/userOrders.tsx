import { orderStatus } from "@/shared/constants"
import { authSelector } from "@/store/auth"
import { motion } from "framer-motion"
import { Messages } from "primereact/messages"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { DataView } from 'primereact/dataview';
import { Fieldset } from "primereact/fieldset"
import { Steps } from "primereact/steps"
import { Rating } from "primereact/rating"

const UserOrders = () => {

  const [orders, setOrders] = useState([])
  const { token } = useSelector(authSelector)
  const steps = orderStatus.map((item) => ({ label: item.label }))

  const msgs = useRef<Messages>(null)

  const fetchOrders = async () => {
    // const [err, data] = await to(getOrders(token))
    // if (err) {
    //   msgs.current?.clear()
    //   msgs.current?.show([
    //     { sticky: true, severity: 'error', summary: 'Sistematik Hata', detail: err.message , closable: false}
    //   ]);
    //   return
    // }
    // if (data.data) {
    //   setOrders(data.data)
    // }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const legendTemplate = () => {
    return <div className="flex md:flex-row flex-col sm:items-center !text-sm justify-between text-white">
      <span className="ml-1">Sipariş No: <span className="text-primary">123123</span></span>
      <span className="ml-1">Tarih: <span className="text-primary">12.12.2021</span></span>
      <span className="ml-1">Toplam: <span className="text-primary">12.12 TL</span></span>
      <span className="ml-1">Durum: <span className="text-primary">Hazırlanıyor</span></span>
    </div>

  }

  const orderAddressTemplate = () => {
    return (
      <div className="w-full flex flex-col gap-2">
        <h3 className="text-2xl text-primaryDark font-semibold">Teslimat Adresi</h3>
        <div className="w-full flex flex-col gap-2">
          <span className="">Adres Adı</span>
          <span className="">Adres</span>
          <span className="">Şehir</span>
          <span className="">Posta Kodu</span>

        </div>

      </div>

    )
  }
  const exCartItems = [{
    product: {
      image: 'https://picsum.photos/200/300',
      name: 'Jacket',
      price: 48.00,
      rating: 3,
    },
    id: 1,
    price: 48.00,
    color: 'red',
    size: 'M',
    quantity: 1
  }, {
    product: {
      image: 'https://picsum.photos/200/300',
      name: 'Jacket',
      price: 48.00,
      rating: 3,
    },
    id: 1,
    price: 48.00,
    color: 'red',
    size: 'M',
    quantity: 1
  }]


  const OrderItemTemplate = (CartItem: any) => {
    return (
      <div className="flex m-2 shadow-lg px-5 py-8 w-full">
        <div className="flex flex-row flex-wrap gap-5 justify-between">
          <div className="sm:w-1/2 w-full">
            <img src={CartItem.product.image} alt={CartItem.product.name} className="w-full h-auto object-scale-down" />
          </div>
          <div className="">
            <div className="product-name">{CartItem.product.name}</div>
            <div className="product-description">{CartItem.product.category}</div>
            <Rating value={CartItem.product.rating} readOnly cancel={false} />
            <div className="product-price">{CartItem.price} ₺</div>
            <div className="product-quantity">Quantity: {CartItem.quantity}</div>
            <div className="product-quantity">Color: {CartItem.color}</div>
            <div className="product-quantity">Size: {CartItem.size}</div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      className="w-full px-[15px]"
    >
      <h3 className="text-4xl my-4 text-primaryDark ">
        Siparişlerim
      </h3>
      <Messages ref={msgs} />

      {/* order */}
      <div className="w-full flex flex-col gap-7">
        <Fieldset className="w-full flex flex-col shadow-lg gap-9" toggleable
          legend={legendTemplate()}
          collapseIcon="pi pi-chevron-down text-white"
          collapsed={false}
          expandIcon="pi pi-chevron-up text-white"
          pt={{
            legend: { className: "w-full !bg-slate-600 " },
            legendTitle: { className: 'w-full !flex !flex-col' },

          }}
        >
          <div className="flex flex-col gap-6 sm:max-w-none max-w-xs w-full">

            {/* order items */}
            <div className="w-full flex flex-col">
              <DataView value={exCartItems} itemTemplate={OrderItemTemplate} className="flex flex-col gap-4" />
            </div>

            {/* order address */}
            {orderAddressTemplate()}

            {/* order status */}
            <div className="flex flex-col w-full gap-7 overflow-x-auto">

              <h3 className="text-2xl text-primaryDark font-semibold">Sipariş Durumu</h3>
              <Steps model={steps} readOnly activeIndex={3} className="w-full min-w-[600px]"/>
            </div>
          </div>


        </Fieldset>
      </div>
    </motion.div>
  )
}

export default UserOrders