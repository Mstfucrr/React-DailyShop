import { getCart } from "@/services/order/order.service"
import { ICartItem } from "@/shared/types"
import { authSelector } from "@/store/auth"
import to from "await-to-js"
import { Messages } from "primereact/messages"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { InputText } from "primereact/inputtext"
import { useFormik } from "formik"
import { Button } from "primereact/button"
import { IUserAddress } from "@/services/auth/types"
import * as Yup from 'yup'
import { InputTextarea } from "primereact/inputtextarea"

const Checkout = () => {
    const msgs = useRef<Messages>(null)
    const [cartItems, setCartItems] = useState<[] | ICartItem[]>([])
    const [cartTotal, setCartTotal] = useState(0)
    const { isAuthorized, auth, token } = useSelector(authSelector)
    const [user, setUser] = useState(auth)
    const [selectAddress, setSelectAddress] = useState<IUserAddress>()
    useEffect(() => {
        setUser(auth)
    }, [])

    useEffect(() => {
        const fetchCart = async () => {
            const [err, data] = await to(getCart(token))
            if (err) {
                msgs.current?.clear()
                msgs.current?.show([
                    { sticky: true, severity: 'error', summary: 'Sistematik Hata', detail: err.message }
                ]);
                return
            }
            setCartItems(data.data)

            if (cartItems) {
                let total = 0
                cartItems.map((item: ICartItem) => {
                    total += item.product.price * item.quantity
                })
                setCartTotal(total)
            }

        }
        if (isAuthorized)
            fetchCart()
    }, [])

    const formik = useFormik({
        initialValues: {
            address: '',
            country: '',
            city: '',
            zipCode: '',
        },
        validationSchema: Yup.object({
            address: Yup.string().required('Adres zorunludur'),
            country: Yup.string().required('Ülke zorunludur'),
            city: Yup.string().required('Şehir zorunludur'),
            zipCode: Yup.string().required('Posta kodu zorunludur'),
        }),
        onSubmit: values => {
            console.log(values)
        },
    })
    const errorTemplate = (frm: any, isTouched?: boolean) => {
        return (
            <>
                {isTouched && frm ? (<small className="text-red-500 "> {frm} </small>) : null}
            </>
        )
    }

    const inputLabel = (text: string) => {
        return (
            <label className="text-lg font-semibold text-primaryDark">{text}</label>
        )
    }

    const inputClassName = (frm: any, isTouched?: boolean) => {
        return 'w-full !my-2 p-inputtext-sm ' +
            (isTouched && frm ? 'p-invalid' : '')
    }

    useEffect(() => {
        if (selectAddress) {
            const { city, country, address, zipCode } = selectAddress
            formik.setValues({ ...formik.values, city, country, address })
            formik.setFieldValue('zipCode', zipCode)
        }
    }, [selectAddress])


    return (
        <>
            <div className="flex lg:flex-row flex-col xl:px-10 px-3 gap-3 mt-20">
                <div className="flex flex-col basis-8/12 gap-y-3">
                    <h3 className="text-3xl font-semibold text-primaryDark  ">Sipariş Adresi</h3>
                    <div className="border border-solid border-secondary p-2 gap-2 flex flex-col">

                        <h4 className="text-xl font-semibold text-primaryDark">Kayıtlı Adreslerim</h4>
                        <div className="flex flex-wrap gap-5">
                            {user && (
                                user.addresses.map((address) => (
                                    <Button key={"address-" + address.id} label={address.title} className="w-max" severity={selectAddress?.id === address.id ? 'success' : 'info'}
                                     onClick={() => setSelectAddress(address)} />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap w-full items-start">
                        {/* ADRES */}
                        <div className="flex flex-col md:w-1/2 w-full p-2">
                            {inputLabel('Adres')}
                            <InputTextarea
                                name="address"
                                className={inputClassName(formik.errors.address, formik.touched.address)}
                                onChange={formik.handleChange}
                                value={formik.values.address}
                            />
                            {errorTemplate(formik.errors.address, formik.touched.address)}
                        </div>
                        {/* ÜLKE */}
                        <div className="flex flex-col md:w-1/2 w-full p-2">
                            {inputLabel('Ülke')}
                            <InputText
                                name="country"
                                className={inputClassName(formik.errors.country, formik.touched.country)}
                                onChange={formik.handleChange}
                                value={formik.values.country}
                            />
                            {errorTemplate(formik.errors.country, formik.touched.country)}
                        </div>
                        {/* ŞEHİR */}
                        <div className="flex flex-col md:w-1/2 w-full p-2">
                            {inputLabel('Şehir')}
                            <InputText
                                name="city"
                                className={inputClassName(formik.errors.city, formik.touched.city)}
                                onChange={formik.handleChange}
                                value={formik.values.city}
                            />
                            {errorTemplate(formik.errors.city, formik.touched.city)}
                        </div>
                        {/* POSTA KODU */}
                        <div className="flex flex-col md:w-1/2 w-full p-2">
                            {inputLabel('Posta Kodu')}
                            <InputText
                                name="zipCode"
                                className={inputClassName(formik.errors.zipCode, formik.touched.zipCode)}
                                onChange={formik.handleChange}
                                value={formik.values.zipCode}
                            />
                            {errorTemplate(formik.errors.zipCode, formik.touched.zipCode)}
                        </div>

                    </div>

                    <Button type="submit" label="Sipariçi Tamamla" className="w-max !bg-primary border border-solid border-transparent text-[#212529] py-4 px-3 mt-4
                                hover:!bg-primaryDark hover:!border-primaryDark hover:text-white
                                transition duration-300 ease-in-out flex justify-center"
                        onClick={() => formik.handleSubmit()}
                    />

                </div>
                <div className="flex basis-4/12 p-2">
                    <div className="w-full border border-solid border-secondary
                        flex flex-col relative h-min">
                        {/* card header */}
                        <div className="py-3 px-5 bg-secondary">
                            <h4 className="font-semibold text-2xl text-black">
                                Sipariş Özeti
                            </h4>
                        </div>
                        {/* card body */}
                        <div className="flex-auto p-5">
                            <div className="flex flex-col">
                                <h5 className="text-2xl font-semibold mb-2">Ürünler</h5>
                                <div className="flex flex-col gay-4">

                                    {cartItems.map((cartItem) => (
                                        <div className="flex justify-between" key={cartItem.product.id + "-" + cartItem.product.name}>
                                            <div className="">
                                                {cartItem.product.name} x {cartItem.quantity}
                                            </div>
                                            <div className="">
                                                {cartItem.product.price * cartItem.quantity} ₺
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="my-4" />
                            <div className="flex justify-between mb-4 pt-1">
                                <h6 className="font-medium text-black">
                                    Ara Toplam
                                </h6>
                                <h6 className="font-medium text-black">
                                    {cartTotal} ₺
                                </h6>
                            </div>
                        </div>
                        {/* card footer */}
                        <div className="border border-solid border-secondary py-3 px-5">
                            <div className="flex justify-between mt-2 text-black">
                                <h5 className="font-bold text-xl">
                                    Toplam
                                </h5>
                                <h5 className="font-bold text-xl">
                                    {cartTotal} ₺
                                </h5>
                            </div>
                            <Link className="bg-primary border border-solid border-transparent text-[#212529] py-4 px-3 mt-4 w-full
                                hover:bg-primaryDark hover:border-primaryDark hover:text-white
                                transition duration-300 ease-in-out flex justify-center"
                                to="/checkout"
                            >
                                Ödeme İşlemine Geçin
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default Checkout