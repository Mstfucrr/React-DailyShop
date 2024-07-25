import reactQueryConfig from '@/configs/react-query-config'
import { IUserAddress } from '@/services/auth/types'
import useAuthService from '@/services/auth/use-auth-service'
import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import { Fieldset } from 'primereact/fieldset'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { ProgressSpinner } from 'primereact/progressspinner'
import * as Yup from 'yup'

type Props = {
  address: IUserAddress
}

const RenderAddressFields = ({ address }: Props) => {
  const { deleteAddress, updateAddress, isDeleteAddressLoading, isUpdateAddressLoading } = useAuthService()

  const loading = isDeleteAddressLoading || isUpdateAddressLoading

  const addressValidationSchema = Yup.object().shape({
    title: Yup.string().required('Başlık alanı zorunludur'),
    address: Yup.string().required('Adres alanı zorunludur'),
    description: Yup.string().required('Açıklama alanı zorunludur'),
    city: Yup.string().required('Şehir alanı zorunludur'),
    country: Yup.string().required('Ülke alanı zorunludur'),
    zipCode: Yup.string().required('Posta kodu alanı zorunludur')
  })

  const addressFormik = useFormik({
    initialValues: {
      id: address.id,
      title: address.title,
      address: address.address,
      description: address.description,
      city: address.city,
      country: address.country,
      zipCode: address.zipCode.toString()
    },
    validationSchema: addressValidationSchema,
    onSubmit: values => {
      updateAddress(values, {
        onSuccess: () => {
          reactQueryConfig.prefetchQuery({ queryKey: ['getAccount'] })
          if (values.id === 0) addressFormik.resetForm()
          else addressFormik.resetForm({ values: values })
        }
      })
    }
  })

  const handleDeleteAddress = () => {
    deleteAddress(address.id, {
      onSuccess: () => {
        reactQueryConfig.prefetchQuery({ queryKey: ['getAccount'] })
      }
    })
  }

  const errorTemplate = (frm: any) => {
    return <>{frm ? <small className='p-error p-d-block '> {frm} </small> : null}</>
  }

  const inputClassName = (frm: any) => {
    return 'w-full !my-2 p-inputtext-sm ' + (frm ? 'p-invalid' : '')
  }

  const buttonsLoadingTemplete = () => {
    return (
      <div className='flex w-1/4'>
        <ProgressSpinner
          style={{ width: '50px', height: '50px' }}
          strokeWidth='8'
          fill='var(--surface-ground)'
          animationDuration='.5s'
        />
      </div>
    )
  }

  return (
    <Fieldset
      legend={
        <div>
          {addressFormik.values.title} <br />
          <span className='text-sm text-primary'>{addressFormik.values.description}</span>
        </div>
      }
      key={`address-${address.id}`}
      className='mb-4'
      toggleable
    >
      <div className='flex flex-col items-center gap-9 lg:flex-row'>
        <div className='flex w-full flex-col'>
          <label htmlFor='title' className='text-primary'>
            Adres Başlığı
          </label>
          <InputText
            id='title'
            name='title'
            value={addressFormik.values.title}
            onChange={addressFormik.handleChange}
            className={inputClassName(addressFormik.errors.title)}
          />

          {errorTemplate(addressFormik.errors.title)}
        </div>
        <div className='flex w-full flex-col'>
          <label htmlFor='description' className='text-primary'>
            Adres Açıklaması
          </label>
          <InputText
            id='description'
            name='description'
            value={addressFormik.values.description}
            onChange={addressFormik.handleChange}
            className={inputClassName(addressFormik.errors.description)}
          />

          {errorTemplate(addressFormik.errors.description)}
        </div>
      </div>
      <div className='flex flex-col items-center gap-9 lg:flex-row'>
        <div className='flex w-full flex-col'>
          <label htmlFor='address' className='text-primary'>
            Adres
          </label>
          <InputTextarea
            id='address'
            name='address'
            value={addressFormik.values.address}
            onChange={addressFormik.handleChange}
            className={inputClassName(addressFormik.errors.address)}
          />

          {errorTemplate(addressFormik.errors.address)}
        </div>

        <div className='flex w-full flex-col'>
          <label htmlFor='city' className='text-primary'>
            Şehir
          </label>
          <InputText
            id='city'
            name='city'
            value={addressFormik.values.city}
            onChange={addressFormik.handleChange}
            className={inputClassName(addressFormik.errors.city)}
          />

          {errorTemplate(addressFormik.errors.city)}
        </div>
      </div>
      <div className='flex flex-col items-center gap-9 lg:flex-row'>
        <div className='flex w-full flex-col'>
          <label htmlFor='country' className='text-primary'>
            Ülke
          </label>
          <InputText
            id='country'
            name='country'
            value={addressFormik.values.country}
            onChange={addressFormik.handleChange}
            className={inputClassName(addressFormik.errors.country)}
          />

          {errorTemplate(addressFormik.errors.country)}
        </div>

        <div className='flex w-full flex-col'>
          <label htmlFor='zipCode' className='text-primary'>
            Posta Kodu
          </label>
          <InputNumber
            id='zipCode'
            name='zipCode'
            value={addressFormik.values.zipCode as any}
            onChange={e => {
              addressFormik.setFieldValue('zipCode', e.value?.toString())
            }}
            useGrouping={false}
            className={inputClassName(addressFormik.errors.zipCode)}
          />

          {errorTemplate(addressFormik.errors.zipCode)}
        </div>
      </div>
      <div className='flex w-full justify-end'>
        <Button
          severity='danger'
          className='!mt-6'
          size='small'
          label='Delete Address'
          icon='pi pi-trash'
          key={address.id}
          onClick={() => {
            const dia = confirmDialog({
              message: (
                <>
                  <span className='text-primary'> {address.title} </span> adresini silmek istediğinize emin misiniz ?
                </>
              ),
              header: 'Silme Onayı',
              icon: 'pi pi-info-circle',
              acceptClassName: 'p-button-danger',
              accept: () => {
                dia.hide()
                handleDeleteAddress()
              },
              reject: () => dia.hide(),
              acceptLabel: 'Evet',
              rejectLabel: 'Hayır',
              className: 'p-button-outlined p-button-secondary',
              baseZIndex: 1000,
              draggable: false
            })
          }}
        />
      </div>

      {/* Kaydet */}
      {addressFormik.dirty ? (
        <div className='justify-content-end my-4 flex flex-wrap gap-2'>
          {loading && buttonsLoadingTemplete()}
          {!loading && addressFormik.isValid ? (
            <>
              <Button label='Save' icon='pi pi-check' type='submit' onClick={() => addressFormik.handleSubmit()} />
              <Button
                label='Cancel'
                icon='pi pi-times'
                className='p-button-outlined p-button-secondary'
                onClick={() => addressFormik.resetForm()}
              />
            </>
          ) : (
            <Button
              label='Cancels'
              icon='pi pi-times'
              className='p-button-outlined p-button-secondary'
              onClick={() => addressFormik.resetForm()}
            />
          )}
        </div>
      ) : null}
    </Fieldset>
  )
}

export default RenderAddressFields
