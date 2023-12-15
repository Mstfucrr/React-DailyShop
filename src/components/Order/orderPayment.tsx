import { motion } from 'framer-motion'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import { Calendar } from 'primereact/calendar'
import Card from './Card'

type Props = {
    IsAddressSelectionconfirmed: boolean,
    cardValues: {
        cardNumber: string,
        cardHolder: string,
        LastDate: string,
        cvv: string,
    },
    setcardValues: (values: any) => void,
    handleSubmitOrder: () => void
}

const OrderPayment = ({ IsAddressSelectionconfirmed, cardValues, setcardValues, handleSubmitOrder }: Props) => {

    const validationSchema = Yup.object({
        cardNumber: Yup.string().min(16, "Kart numarası 16 haneli olmalıdır").required("Kart numarası zorunludur"),
        cardHolder: Yup.string().required("Kart üzerindeki isim zorunludur"),
        cvv: Yup.string().required("CVV zorunludur").min(3, "CVV 3 haneli olmalıdır").max(3, "CVV 3 haneli olmalıdır"),
        LastDate: Yup.date().required("Son kullanma tarihi zorunludur")
    })

    const handleChangeLastDate = (e: any) => {
        const date = new Date(e.target.value)
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const lastDate = month + "/" + year
        setcardValues({ ...cardValues, LastDate: lastDate })
    }

    const handleChangeValue = (e: any) => {
        setcardValues({ ...cardValues, [e.target.name]: e.target.value })
        if (e.target.name === "LastDate") {
            handleChangeLastDate(e)
        }
    }

    return (
        <motion.div className="flex flex-col basis-8/12 gap-y-3"
            animate={{
                y: !IsAddressSelectionconfirmed ? 500 : 0,
                opacity: !IsAddressSelectionconfirmed ? 0 : 1,
                display: !IsAddressSelectionconfirmed ? 'none' : 'flex',
            }}
            initial={{
                y: 500,
                opacity: 1,
            }}
            transition={{
                duration: 0.5
            }}
        >
            <h3 className="text-3xl font-semibold text-primaryDark">Ödeme Bilgileri</h3>
            <div className="flex flex-row flex-wrap gap-7 shadow-lg rounded-lg p-5">
                <Formik
                    className="flex flex-col gap-y-4"
                    initialValues={cardValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitOrder}

                >
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form className="flex flex-col gap-y-4 shadow-lg rounded-lg p-5">
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
                                    name="cardHolder"
                                    value={values.cardHolder}
                                    onChange={
                                        (e) => {
                                            handleChange(e)
                                            handleChangeValue(e)
                                        }
                                    }
                                    onBlur={handleBlur}
                                    className="w-full"
                                />
                                {errors.cardHolder && touched.cardHolder && (
                                    <div className="text-red-500">{errors.cardHolder}</div>
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
                                className="bg-primary text-white rounded-lg py-2 px-4">Ödeme Yap</button>
                        </Form>
                    )}
                </Formik>
                <Card values={cardValues} />
            </div>


        </motion.div>
    )
}

export default OrderPayment