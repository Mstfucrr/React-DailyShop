import { IUserAddress } from '@/services/auth/types'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { useEffect } from 'react'
import * as Yup from 'yup'

type Props = {
    addresses: IUserAddress[],
    IsAddressSelectionconfirmed: boolean,
    selectAddress: IUserAddress,
    setSelectAddress: (address: IUserAddress) => void
}


const OrderAddress = ({ addresses, IsAddressSelectionconfirmed, selectAddress, setSelectAddress }: Props) => {


    const formik = useFormik({
        initialValues: {
            addressId: 0,
            address: '',
            country: '',
            city: '',
            zipCode: '',
        },
        validationSchema: Yup.object({
            addressId: Yup.number().required('Adres seçimi zorunludur'),
            address: Yup.string().required('Adres zorunludur'),
            country: Yup.string().required('Ülke zorunludur'),
            city: Yup.string().required('Şehir zorunludur'),
            zipCode: Yup.string().required('Posta kodu zorunludur'),
        }),
        onSubmit: values => {
            console.log(values)
        },
    })

    const inputLabel = (text: string) => {
        return (
            <label className="text-lg font-semibold text-primaryDark">{text}</label>
        )
    }

    useEffect(() => {
        if (selectAddress) {
            const { id, city, country, address, zipCode } = selectAddress
            formik.setValues({ ...formik.values, city, country, address, addressId: id })
            formik.setFieldValue('zipCode', zipCode)
        }

    }, [selectAddress])


    return (
        <motion.div className="flex flex-col basis-8/12 gap-y-3"
            animate={{
                y: IsAddressSelectionconfirmed ? -500 : 0,
                opacity: IsAddressSelectionconfirmed ? 0 : 1,
                display: IsAddressSelectionconfirmed ? 'none' : 'flex',
            }}
            initial={{
                y: -500,
                opacity: 1,
            }}
            transition={{
                duration: 0.5
            }}
        >
            <h3 className="text-3xl font-semibold text-primaryDark  ">Sipariş Adresi</h3>
            <div className="border border-solid border-secondary p-2 gap-2 flex flex-col">

                <h4 className="text-xl font-semibold text-primaryDark">Kayıtlı Adreslerim</h4>
                <div className="flex flex-wrap gap-5">
                    {addresses?.map((address) => (
                        <Button key={"address-" + address.id} label={address.title} className="w-max" severity={selectAddress?.id === address.id ? 'success' : 'info'}
                            onClick={() => setSelectAddress(address)} />
                    ))
                    }
                </div>
            </div>

            <div className="flex flex-wrap w-full items-start">
                {/* ADRES */}
                <div className="flex flex-col md:w-1/2 w-full p-2">
                    {inputLabel('Adres')}
                    <InputTextarea
                        name="address"
                        value={formik.values.address}
                        readOnly
                    />
                </div>
                {/* ÜLKE */}
                <div className="flex flex-col md:w-1/2 w-full p-2">
                    {inputLabel('Ülke')}
                    <InputText
                        name="country"
                        value={formik.values.country}
                        readOnly
                    />
                </div>
                {/* ŞEHİR */}
                <div className="flex flex-col md:w-1/2 w-full p-2">
                    {inputLabel('Şehir')}
                    <InputText
                        name="city"
                        value={formik.values.city}
                        readOnly
                    />
                </div>
                {/* POSTA KODU */}
                <div className="flex flex-col md:w-1/2 w-full p-2">
                    {inputLabel('Posta Kodu')}
                    <InputText
                        name="zipCode"
                        value={formik.values.zipCode}
                        readOnly
                    />
                </div>

            </div>



        </motion.div>
    )
}

export default OrderAddress