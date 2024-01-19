import { Form, Formik } from 'formik'
import { Calendar } from 'primereact/calendar'
import { InputMask } from 'primereact/inputmask'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { creditCardValidationSchema } from '@/shared/validationSchemas'

type Props = {
  cardValues: {
    cardNumber: string
    cardOwner: string
    LastDate: string
    cvv: string
  }
  setCardValues: (values: any) => void
  handleSubmit: (values: any) => void
}

const CreditCard = ({ setCardValues, cardValues, handleSubmit }: Props) => {
  const initialValues = {
    cardNumber: '',
    cardOwner: '',
    LastDate: '',
    cvv: ''
  }

  const handleChangeLastDate = (e: any) => {
    const date = new Date(e.target.value)
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const lastDate = month + '/' + year
    setCardValues({ ...cardValues, LastDate: lastDate })
  }

  const handleChangeValue = (e: any) => {
    setCardValues({ ...cardValues, [e.target.name]: e.target.value })
    if (e.target.name === 'LastDate') {
      handleChangeLastDate(e)
    }
  }

  return (
    <Formik
      className='z-20 flex flex-col gap-y-4'
      initialValues={initialValues}
      validationSchema={creditCardValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleReset }) => (
        <Form className='z-10 flex flex-col gap-y-4 rounded-lg bg-white p-5 shadow-lg'>
          <Button
            className='w-min rounded-lg border border-primaryDark bg-primary
                                        px-4 py-2 text-white transition duration-300
                                        ease-in-out hover:border-primaryDark hover:bg-white hover:text-primaryDark
                                        '
            onClick={() => {
              handleReset()
            }}
            text
          >
            Reset
          </Button>

          <div className='flex flex-col gap-y-4'>
            <label className='text-lg font-semibold text-primaryDark'>Kart Numarası</label>
            <InputMask
              name='cardNumber'
              value={values.cardNumber}
              onChange={e => {
                handleChange(e)
                handleChangeValue(e)
              }}
              onBlur={handleBlur}
              className='w-full'
              mask='9999 9999 9999 9999'
            />
            {errors.cardNumber && touched.cardNumber && <div className='text-red-500'>{errors.cardNumber}</div>}
          </div>
          <div className='flex flex-col gap-y-4'>
            <label className='text-lg font-semibold text-primaryDark'>Kart Üzerindeki İsim</label>
            <InputText
              name='cardOwner'
              value={values.cardOwner}
              onChange={e => {
                handleChange(e)
                handleChangeValue(e)
              }}
              onBlur={handleBlur}
              className='w-full'
            />
            {errors.cardOwner && touched.cardOwner && <div className='text-red-500'>{errors.cardOwner}</div>}
          </div>
          <div className='flex gap-x-4'>
            <div className='flex flex-col gap-y-4'>
              <label className='text-lg font-semibold text-primaryDark'>Son Kullanma Tarihi</label>
              <div className='flex gap-x-4'>
                <Calendar
                  name='LastDate'
                  value={values.LastDate}
                  onChange={e => {
                    handleChange(e)
                    handleChangeValue(e)
                  }}
                  onBlur={handleBlur}
                  className='w-full'
                  dateFormat='mm/yy'
                  mask='99/9999'
                  placeholder='mm/yy'
                  yearRange='2023:2030'
                  showIcon
                  view='month'
                  minDate={new Date()}
                  maxDate={new Date(new Date().getFullYear() + 10, 11, 31)}
                />
              </div>
              {errors.LastDate && touched.LastDate && <div className='text-red-500'>{errors.LastDate}</div>}
            </div>
            <div className='flex flex-col gap-y-4'>
              <label className='text-lg font-semibold text-primaryDark'>CVV</label>
              <InputMask
                name='cvv'
                value={values.cvv}
                onChange={e => {
                  handleChange(e)
                  handleChangeValue(e)
                }}
                onBlur={handleBlur}
                className='w-full'
                mask='999'
              />
              {errors.cvv && touched.cvv && <div className='text-red-500'>{errors.cvv}</div>}
            </div>
          </div>
          <button
            type='submit'
            className='rounded-lg border border-primaryDark bg-primary px-4
                                        py-2 text-white transition duration-300 ease-in-out
                                        hover:border-primaryDark hover:bg-white hover:text-primaryDark'
          >
            Ödeme Yap
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default CreditCard
