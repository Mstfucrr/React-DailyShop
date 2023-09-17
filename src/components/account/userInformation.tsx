import { IUser, IUserAddress } from '@/services/auth/types';
import { motion } from 'framer-motion'
import { Card } from 'primereact/card';
import { Fieldset } from 'primereact/fieldset';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux';
import { SET_TOAST } from '@/store/Toast';

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


const UserInformation = (
    { user, setUser }: { user: IUser, setUser: (user: IUser) => void }

) => {

    const [userState, setUserState] = useState<IUser>(user)
    const [addressesState, setAddressesState] = useState(user.addresses)

    const dispatch = useDispatch()

    useEffect(() => {
        setUserState(user)
        setAddressesState(user.addresses)

    }, [user])

    const handleProfileImageChange = (e: any) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setUserState({ ...userState, profileImage: reader.result as string })
        }
    }


    const handleAddressAdd = () => {
        const addresses = [...addressesState]
        addresses.push({
            id: 0,
            title: '',
            address: '',
            description: '',
            isMain: false,
            city: '',
            country: '',
            zipCode: 0,
        } as IUserAddress)
        setAddressesState(addresses)
    }


    const formik = useFormik({
        initialValues: {
            name: userState.name,
            surname: userState.surname,
            email: userState.email,
            phone: userState.phone,
            profileImage: userState.profileImage,
            addresses: addressesState
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Ad alanı zorunludur')
                .min(2, 'Ad alanı en az 2 karakter olmalıdır'),
            surname: Yup.string().required('Soyad alanı zorunludur'),
            email: Yup.string().email('Geçerli bir email adresi giriniz').required('Email alanı zorunludur'),
            phone: Yup.string().required('Telefon alanı zorunludur'),
            profileImage: Yup.string().required('Profil resmi zorunludur'),
            addresses: Yup.array().of(
                Yup.object().shape({
                    title: Yup.string().required('Başlık alanı zorunludur'),
                    address: Yup.string().required('Adres alanı zorunludur'),
                    description: Yup.string().required('Açıklama alanı zorunludur'),
                    city: Yup.string().required('Şehir alanı zorunludur'),
                    country: Yup.string().required('Ülke alanı zorunludur'),
                    zipCode: Yup.string().required('Posta kodu alanı zorunludur'),

                })
            )
        }),
        onSubmit: () => {
            console.log("submit")
            showToast(
                {
                    severity: 'success',
                    summary: 'Başarılı',
                    detail: 'Kullanıcı bilgileriniz güncellendi'
                }
            )
        }
    })

    const showToast = ({severity ,summary,detail} : {severity: string, summary: string, detail: string}) => {
        dispatch(SET_TOAST({
            severity: severity,
            summary: summary,
            detail: (
                <>
                    {detail}
                </>
            ),
            life: 3000
        }))
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className="w-full px-[15px] relative"
        >
            <h3 className="text-4xl my-4 text-primaryDark
                                            ">
                Kullanıcı Bilgilerim
            </h3>
            {/* resim */}
            <Fieldset legend={
                <div className="flex align-items-center text-primary">
                    <span className="pi pi-user mr-2"></span>
                    <span className="font-bold text-lg">Profil Resmi</span>
                </div>
            }

                className="mb-4"
            >
                <div className="flex flex-col items-center">
                    <img src={userState.profileImage} alt="profile" className="lg:w-1/3 w-1/2 max-w-[250px] max-h-[250px] object-cover rounded-full" />
                    <form method='post' encType='multipart/form-data' className="flex flex-col items-center"
                    >
                        <input type="file" name="profileImage" id="profileImage" className="hidden"
                            onInput={(e: any) => { handleProfileImageChange(e) }}
                        />
                        <label htmlFor="profileImage" className="bg-primary text-white px-6 py-4 rounded-full mt-4 hover:bg-primaryDark transition-all duration-300 cursor-pointer">
                            Resmi Değiştir
                        </label>
                    </form>
                    {
                        userState.profileImage !== user.profileImage && (
                            <div className="flex flex-wrap justify-content-end gap-2 my-4">
                                <Button label="Save" icon="pi pi-check"
                                    onClick={() => {
                                        setUser({ ...user, profileImage: userState.profileImage })
                                    }}
                                />
                                <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary"
                                    onClick={() => { setUserState(user) }} />
                            </div>
                        )
                    }

                </div>
            </Fieldset>

            {/* ad soyad */}
            <Fieldset legend={
                <div className="flex align-items-center text-primary">
                    <span className="pi pi-user mr-2"></span>
                    <span className="font-bold text-lg">Ad Soyad</span>
                </div>
            } className="mb-4" >
                <div className="flex flex-col">

                    <div className="flex lg:flex-row flex-col gap-9 items-center">
                        <div className="flex flex-col w-full">
                            <label htmlFor="name" className="text-primary">Ad</label>
                            <InputText
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={(e) =>
                                    formik.setFieldValue(
                                        'name',
                                        e.target.value
                                    )
                                }
                                className={
                                    formik.errors.name
                                        ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                        : 'w-full !my-2 p-inputtext-sm'
                                }
                            />
                            {formik.errors.name ? (
                                <small className="text-red-500 ">{formik.errors.name}</small>
                            ) : null
                            }
                        </div>


                        <div className="flex flex-col w-full">
                            <label htmlFor="surname" className="text-primary">Soyad</label>
                            <InputText
                                id="surname"
                                name="surname"
                                value={formik.values.surname}
                                onChange={(e) =>
                                    formik.setFieldValue('surname', e.target.value)}
                                className={
                                    formik.errors.surname
                                        ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                        : 'w-full !my-2 p-inputtext-sm'
                                }
                            />

                            {formik.errors.surname ? (
                                <small className="text-red-500 ">{formik.errors.surname}</small>
                            ) : null
                            }

                        </div>
                    </div>

                    {user.name !== formik.values.name || user.surname !== formik.values.surname ? (
                        <div className="flex flex-wrap justify-content-end gap-2 my-4">
                            <Button label="Save" icon="pi pi-check"
                                onClick={() => {
                                    setUser({ ...user, name: formik.values.name, surname: formik.values.surname })
                                    formik.handleSubmit()
                                }}
                            />
                            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary"
                                onClick={() => {
                                    formik.setFieldValue('name', user.name)
                                    formik.setFieldValue('surname', user.surname)
                                }} />
                        </div>
                    ) : null
                    }
                </div>

            </Fieldset>

            {/* iletişim bilgileri */}
            <Fieldset legend={
                <div className="flex align-items-center text-primary">
                    <span className="pi pi-phone mr-2 mt-1"></span>
                    <span className="font-bold text-lg">İletişim Bilgileri</span>
                </div>
            }
                className="mb-4" toggleable
            >

                <div className="flex flex-col">
                    <div className="flex lg:flex-row flex-col gap-9 items-center">
                        <div className="flex flex-col w-full">
                            <label htmlFor="email" className="text-primary">E-posta</label>
                            <InputText
                                id='email'
                                name='email'
                                value={formik.values.email}
                                onChange={(e) =>
                                    formik.setFieldValue('email', e.target.value)}
                                className={
                                    formik.errors.email
                                        ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                        : 'w-full !my-2 p-inputtext-sm'
                                }
                            />
                            {formik.errors.email ? (
                                <small className="text-red-500 ">{formik.errors.email}</small>
                            ) : null
                            }
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="phone" className="text-primary">Telefon</label>
                            <InputMask
                                id='phone'
                                name='phone'
                                value={formik.values.phone}
                                onChange={(e) =>
                                    formik.setFieldValue('phone', e.target.value)}
                                className={
                                    formik.errors.phone
                                        ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                        : 'w-full !my-2 p-inputtext-sm'
                                }
                                mask="(999) 999-9999"
                            />

                        </div>
                    </div>

                    {user.email !== formik.values.email || user.phone !== formik.values.phone ? (
                        <div className="flex flex-wrap justify-content-end gap-2 my-4">
                            <Button label="Save" icon="pi pi-check"
                                onClick={() => {
                                    setUser({ ...user, email: formik.values.email, phone: formik.values.phone })
                                    formik.handleSubmit()
                                }}
                            />
                            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary"
                                onClick={() => {
                                    formik.setFieldValue('email', user.email)
                                    formik.setFieldValue('phone', user.phone)
                                }}

                            />
                        </div>
                    ) : null
                    }
                </div>
            </Fieldset>

            {/* adres bilgileri */}
            <Fieldset legend={
                <div className="flex align-items-center text-primary">
                    <span className="pi pi-map-marker mr-2 mt-1"></span>
                    <span className="font-bold text-lg">Adres Bilgileri</span>
                </div>
            } className="mb-4" toggleable >
                <div className="flex flex-col">
                    {formik.values.addresses.map((address, index) => (
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
                                        className={
                                            formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["title"]
                                                ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                                : 'w-full !my-2 p-inputtext-sm'
                                        }
                                    />

                                    {formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["title"]
                                        ? (
                                            <small className="text-red-500 ">{formik?.errors?.addresses[index]["title"]}</small>
                                        ) : null
                                    }

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
                                        className={
                                            formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["description"]
                                                ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                                : 'w-full !my-2 p-inputtext-sm'
                                        }
                                    />

                                    {formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["description"]
                                        ? (
                                            <small className="text-red-500 ">{formik?.errors?.addresses[index]["description"]}</small>
                                        ) : null
                                    }

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
                                        className={
                                            formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["address"]
                                                ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                                : 'w-full !my-2 p-inputtext-sm'
                                        }
                                    />

                                    {formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["address"]
                                        ? (
                                            <small className="text-red-500 ">{formik?.errors?.addresses[index]["address"]}</small>
                                        ) : null
                                    }


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

                                        className={
                                            formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["city"]
                                                ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                                : 'w-full !my-2 p-inputtext-sm'
                                        }
                                    />

                                    {formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["city"]
                                        ? (
                                            <small className="text-red-500 ">{formik?.errors?.addresses[index]["city"]}</small>
                                        ) : null
                                    }


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

                                        className={
                                            formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["country"]
                                                ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                                : 'w-full !my-2 p-inputtext-sm'
                                        }
                                    />

                                    {formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["country"]
                                        ? (
                                            <small className="text-red-500 ">{formik?.errors?.addresses[index]["country"]}</small>
                                        ) : null
                                    }
                                </div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="zipCode" className="text-primary">Posta Kodu</label>
                                    <InputNumber
                                        id='zipCode'
                                        name='zipCode'
                                        value={parseInt(formik.values.addresses[index].zipCode)}
                                        onChange={(e) => {
                                            formik.setFieldValue(`addresses[${index}].zipCode`, e.value)
                                        }}

                                        className={
                                            formik.errors.addresses && formik.errors.addresses[index] && formik?.errors?.addresses[index]["zipCode"]
                                                ? 'w-full !my-2 p-inputtext-sm p-invalid'
                                                : 'w-full !my-2 p-inputtext-sm'
                                        }
                                        useGrouping={false}
                                    />

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
                                                formik.setFieldValue('addresses', formik.values.addresses.filter((_, i) => i !== index))
                                                dia.hide()
                                                showToast({
                                                    severity: 'success',
                                                    summary: 'Başarılı',
                                                    detail: 'Adres başarıyla silindi'
                                                })
                                            },
                                            reject: () => dia.hide()
                                        })

                                    }}
                                />

                            </div>

                        </Fieldset>
                    ))}

                    {
                        user.addresses !== formik.values.addresses ? (
                            <div className="flex flex-wrap justify-content-end gap-2 my-4">
                                <Button label="Save" icon="pi pi-check"
                                    onClick={() => {
                                        setUser({ ...user, addresses: formik.values.addresses })
                                        formik.handleSubmit()
                                    }}
                                />
                                <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary"
                                    onClick={() => {
                                        formik.setFieldValue('addresses', user.addresses)
                                    }}
                                />

                            </div>
                        ) : null

                    }



                </div>

            </Fieldset>


        </motion.div >
    )
}

export default UserInformation