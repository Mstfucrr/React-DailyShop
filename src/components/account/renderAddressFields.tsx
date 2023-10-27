import { IUserAddress } from "@/services/auth/types";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Fieldset } from "primereact/fieldset";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

type Props = {
    address: IUserAddress
    index: number
    formik: any
}

const RenderAddressFields = ({ index, address, formik }: Props) => {

    const errors = formik.errors.addresses && formik.errors.addresses[index];

    const errorTemplate = (name: any) => {
        return (
            <>
                {errors && errors[name] ? (
                    <small className="text-red-500 ">
                        {errors[name]}
                    </small>
                ) : null}
            </>
        )
    }

    const inputClassName = (fieldName: any) => {
       return 'w-full !my-2 p-inputtext-sm ' +  
            (errors && errors[fieldName] ? 'p-invalid' : '')
    }

    
    return (
        <Fieldset legend={
            <div>
                {address.title} <br />
                <span className="text-primary text-sm">{address.description}</span>
            </div>
        } key={index} className="mb-4" toggleable>

            <div className="flex lg:flex-row flex-col gap-9 items-center">
                <div className="flex flex-col w-full">
                    <label htmlFor="title" className="text-primary">Adres Başlığı</label>
                    <InputText
                        id='title'
                        name='title'
                        value={formik.values.addresses[index].title}
                        onChange={(e) => {
                            formik.setFieldValue(`addresses[${index}].title`, e.target.value)
                        }}
                        className={inputClassName("title")}
                    />

                    {errorTemplate("title")}

                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="description" className="text-primary">Adres Açıklaması</label>
                    <InputText
                        id='description'
                        name='description'
                        value={formik.values.addresses[index].description}
                        onChange={(e) => {
                            formik.setFieldValue(`addresses[${index}].description`, e.target.value)
                        }}
                        className={inputClassName("description")}
                    />

                    {errorTemplate("description")}

                </div>
            </div>
            <div className="flex lg:flex-row flex-col gap-9 items-center">
                <div className="flex flex-col w-full">
                    <label htmlFor="address" className="text-primary">Adres</label>
                    <InputTextarea
                        id='address'
                        name='address'
                        value={formik.values.addresses[index].address}
                        onChange={(e) => {
                            formik.setFieldValue(`addresses[${index}].address`, e.target.value)
                        }}
                        className={inputClassName("address")}
                    />

                    {errorTemplate("address")}


                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="city" className="text-primary">Şehir</label>
                    <InputText
                        id='city'
                        name='city'
                        value={formik.values.addresses[index].city}
                        onChange={(e) => {
                            formik.setFieldValue(`addresses[${index}].city`, e.target.value)
                        }}

                        className={inputClassName("city")}
                    />

                    {errorTemplate("city")}


                </div>
            </div>
            <div className="flex lg:flex-row flex-col gap-9 items-center">
                <div className="flex flex-col w-full">
                    <label htmlFor="country" className="text-primary">Şehir</label>
                    <InputText
                        id='country'
                        name='country'
                        value={formik.values.addresses[index].country}
                        onChange={(e) => {
                            formik.setFieldValue(`addresses[${index}].country`, e.target.value)
                        }}
                        className={inputClassName("country")}
                    />

                    {errorTemplate("country")}
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="zipCode" className="text-primary">Posta Kodu</label>
                    <InputNumber
                        id='zipCode'
                        name='zipCode'
                        value={formik.values.addresses[index].zipCode}
                        onChange={(e) => {
                            formik.setFieldValue(`addresses[${index}].zipCode`, e.value)
                        }}
                        useGrouping={false}

                        className={inputClassName("zipCode")}
                    />

                    {errorTemplate("zipCode")}
                </div>
            </div>
            <ConfirmDialog />
            <div className="w-full flex justify-end">
                <Button severity="danger"
                    className="!mt-6"
                    size="small"
                    label="Delete Address"
                    icon="pi pi-trash"
                    key={index}
                    onClick={() => {
                        const dia = confirmDialog({
                            message: 'Bu adresi silmek istediğinize emin misiniz?',
                            header: 'Silme Onayı',
                            icon: 'pi pi-info-circle',
                            acceptClassName: 'p-button-danger',
                            accept: () => {
                                formik.setFieldValue('addresses', formik.values.addresses.filter((_: any, i: number) => i !== index))
                                formik.handleSubmit()
                                dia.hide()
                            },
                            reject: () => dia.hide()
                        })

                    }}
                />

            </div>

        </Fieldset>
    )
}

export default RenderAddressFields