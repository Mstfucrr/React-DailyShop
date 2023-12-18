import { Form, Formik } from 'formik'
import { Calendar } from "primereact/calendar"
import { InputMask } from "primereact/inputmask"
import { InputText } from "primereact/inputtext"
import * as Yup from "yup"
import { Button } from "primereact/button"

type Props = {
    cardValues: {
        cardNumber: string,
        cardOwner: string,
        LastDate: string,
        cvv: string,
    }
    setCardValues: (values: any) => void,
    handleSubmit: (values: any) => void
}

const CreditCard = ({ setCardValues, cardValues, handleSubmit }: Props) => {

    const initialValues = {
        cardNumber: "",
        cardOwner: "",
        LastDate: "",
        cvv: "",
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



    return (
        <Formik
            className="flex flex-col gap-y-4 z-20"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}

        >
            {({ values, errors, touched, handleChange, handleBlur, handleReset }) => (
                <Form className="flex flex-col gap-y-4 shadow-lg rounded-lg p-5 bg-white z-10">
                    <Button
                        className="bg-primary text-white rounded-lg py-2 px-4
                                        hover:bg-white hover:text-primaryDark hover:border-primaryDark border border-primaryDark
                                        transition duration-300 ease-in-out w-min
                                        "
                        onClick={() => {
                            handleReset()
                        }}
                        text
                    >Reset</Button>

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
                    <button 
                        onClick={handleSubmit}
                        className="bg-primary text-white rounded-lg py-2 px-4
                                        hover:bg-white hover:text-primaryDark hover:border-primaryDark border border-primaryDark
                                        transition duration-300 ease-in-out">
                        Ödeme Yap
                    </button>
                </Form>
            )}
        </Formik>

    )
}

export default CreditCard