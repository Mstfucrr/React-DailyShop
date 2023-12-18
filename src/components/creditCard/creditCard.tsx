import { Form, Formik } from 'formik'
import { Calendar } from "primereact/calendar"
import { InputMask } from "primereact/inputmask"
import { InputText } from "primereact/inputtext"
import { useState } from "react"
import * as Yup from "yup"
import Card from "../Order/Card"
import { motion } from "framer-motion"
import { InputNumber } from "primereact/inputnumber"
import { Button } from "primereact/button"
import { SelectButton } from "primereact/selectbutton"
import { FaTimes } from "react-icons/fa"
import to from 'await-to-js'
import { addMoneyToWallet } from '@/services/wallet/wallet.service'
import { authSelector } from '@/store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { IToast } from '@/store/Toast/type'
import { SET_TOAST } from '@/store/Toast'

type Props = {
    isShowWalletScreen: boolean,
    setIsShowWalletScreen: (value: boolean) => void
}

const CreditCard = ({ isShowWalletScreen, setIsShowWalletScreen }: Props) => {

    const { token } = useSelector(authSelector)
    const dispatch = useDispatch()
    const [cardValues, setCardValues] = useState({
        cardNumber: "",
        cardOwner: "",
        LastDate: "",
        cvv: "",
    })

    const initialValues = {
        cardNumber: "",
        cardOwner: "",
        LastDate: "",
        cvv: "",
        money: 0
    }

    const validationSchema = Yup.object({
        cardNumber: Yup.string()
            .required("Kart numarası zorunludur")
            .min(18, "Kart numarası 16 haneli olmalıdır"),

        cardOwner: Yup.string().required("Kart üzerindeki isim zorunludur"),
        cvv: Yup.string().required("CVV zorunludur").min(3, "CVV 3 haneli olmalıdır").max(3, "CVV 3 haneli olmalıdır"),
        LastDate: Yup.date().required("Son kullanma tarihi zorunludur"),
        // para ekle
        money: Yup.number().required("Para miktarı zorunludur").min(1, "Para miktarı 1 TL'den az olamaz")
    })

    const handleChangeLastDate = (e: any) => {
        const date = new Date(e.target.value)
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const lastDate = month + "/" + year
        setCardValues({ ...cardValues, LastDate: lastDate })
    }

    const handleChangeValue = (e: any) => {
        setCardValues({ ...cardValues, [e.target.name]: e.target.value })
        if (e.target.name === "LastDate") {
            handleChangeLastDate(e)
        }
    }

    const handleSubmit = async (values: any) => {

        const [err, res] = await to(addMoneyToWallet(values.money, token))
        if (err) {
            console.log(err)
            const toast: IToast = { severity: 'error', summary: 'Hata', detail: err.message, life: 3000 }
            dispatch(SET_TOAST(toast))
            return
        }
        const toast: IToast = { severity: 'success', summary: 'Başarılı', detail: res.message, life: 3000 }
        dispatch(SET_TOAST(toast))
        setIsShowWalletScreen(false)
    }

    return (
        <motion.div className="top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 fixed"
            animate={{
                opacity: isShowWalletScreen ? 1 : 0,
                display: isShowWalletScreen ? 'flex' : 'none',
            }}
            initial={{
                opacity: 0,
            }}
            transition={{
                duration: 0.5
            }}
        >

            <div className="flex flex-row flex-wrap gap-7 shadow-lg rounded-lg p-5 bg-white">
                <Formik
                    className="flex flex-col gap-y-4"
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}

                >
                    {({ values, errors, touched, handleChange, handleBlur, handleReset }) => (
                        <Form className="flex flex-col gap-y-4 shadow-lg rounded-lg p-5">
                            <div className="flex flex-col gap-y-4">
                                {/* hazır para miktarları buttonları */}

                                <div className="flex gap-3 flex-row flex-wrap">
                                    {/* reset button */}
                                    <Button
                                        className="bg-primary text-white rounded-lg py-2 px-4
                                        hover:bg-white hover:text-primaryDark hover:border-primaryDark border border-primaryDark
                                        transition duration-300 ease-in-out 
                                        "
                                        onClick={() => {
                                            handleReset()
                                        }}
                                        text
                                    >Reset</Button>

                                    {/* money Buttons */}
                                    <SelectButton
                                        name="money"
                                        id="money"
                                        value={values.money}
                                        options={[10, 20, 50, 100, 200, 500]}
                                        onChange={(e) => {
                                            handleChange(e)
                                        }}
                                        className="w-full"
                                        placeholder="Hazır para miktarları"

                                    />
                                </div>

                                <label className="text-lg font-semibold text-primaryDark">Para Miktarı</label>
                                <InputNumber
                                    name="money"
                                    value={values.money}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full"
                                />
                                {errors.money && touched.money && (
                                    <div className="text-red-500">{errors.money}</div>
                                )}

                            </div>

                            <div className="flex flex-col gap-y-4">
                                <label className="text-lg font-semibold text-primaryDark">Kart Numarası</label>
                                <InputMask
                                    name="cardNumber"
                                    value={values.cardNumber}
                                    onChange={
                                        (e) => {
                                            handleChange(e)
                                            handleChangeValue(e)
                                        }
                                    }
                                    onBlur={handleBlur}
                                    className="w-full"
                                    mask="9999 9999 9999 9999"
                                />
                                {errors.cardNumber && touched.cardNumber && (
                                    <div className="text-red-500">{errors.cardNumber}</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <label className="text-lg font-semibold text-primaryDark">Kart Üzerindeki İsim</label>
                                <InputText
                                    name="cardOwner"
                                    value={values.cardOwner}
                                    onChange={
                                        (e) => {
                                            handleChange(e)
                                            handleChangeValue(e)
                                        }
                                    }
                                    onBlur={handleBlur}
                                    className="w-full"
                                />
                                {errors.cardOwner && touched.cardOwner && (
                                    <div className="text-red-500">{errors.cardOwner}</div>
                                )}
                            </div>
                            <div className="flex gap-x-4">
                                <div className="flex flex-col gap-y-4">
                                    <label className="text-lg font-semibold text-primaryDark">Son Kullanma Tarihi</label>
                                    <div className="flex gap-x-4">
                                        <Calendar
                                            name="LastDate"
                                            value={values.LastDate}
                                            onChange={
                                                (e) => {
                                                    handleChange(e)
                                                    handleChangeValue(e)
                                                }
                                            }
                                            onBlur={handleBlur}
                                            className="w-full"
                                            dateFormat="mm/yy"
                                            mask="99/9999"
                                            placeholder="mm/yy"
                                            yearRange="2023:2030"
                                            showIcon
                                            view='month'
                                            minDate={new Date()}
                                            maxDate={new Date(new Date().getFullYear() + 10, 11, 31)}
                                        />

                                    </div>
                                    {errors.LastDate && touched.LastDate && (
                                        <div className="text-red-500">{errors.LastDate}</div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-y-4">
                                    <label className="text-lg font-semibold text-primaryDark">CVV</label>
                                    <InputMask
                                        name="cvv"
                                        value={values.cvv}
                                        onChange={
                                            (e) => {
                                                handleChange(e)
                                                handleChangeValue(e)
                                            }
                                        }
                                        onBlur={handleBlur}
                                        className="w-full"
                                        mask="999"
                                    />
                                    {errors.cvv && touched.cvv && (
                                        <div className="text-red-500">{errors.cvv}</div>
                                    )}
                                </div>
                            </div>
                            <button type="submit"
                                className="bg-primary text-white rounded-lg py-2 px-4
                                        hover:bg-white hover:text-primaryDark hover:border-primaryDark border border-primaryDark
                                        transition duration-300 ease-in-out
                                ">Para Ekle</button>
                        </Form>
                    )}
                </Formik>
                <div className="flex flex-col gap-y-4 items-end">

                    <FaTimes className="float-right text-right text-4xl text-primary cursor-pointer
                                rounded-full bg-white p-1" onClick={() => setIsShowWalletScreen(false)} />
                    {isShowWalletScreen && <Card values={cardValues} />}
                </div>
            </div>

        </motion.div>

    )
}

export default CreditCard