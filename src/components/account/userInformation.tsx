import { IUser } from '@/services/auth/types';
import { motion } from 'framer-motion'
import { Fieldset } from 'primereact/fieldset';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from 'primereact/progressspinner';


import RenderAddressFields from './renderAddressFields';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, SET_AUTH, SET_LOGOUT } from '@/store/auth';
import { authService } from '@/services/auth/auth.service';
import to from 'await-to-js';
import { SET_TOAST } from '@/store/Toast';
import { IToast } from '@/store/Toast/type';
import { useNavigate } from 'react-router-dom';


const UserInformation = ({ user }: { user: IUser }) => {

    const [userState, setUserState] = useState<IUser>(user)
    const [addressesState, setAddressesState] = useState(user.addresses)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector(authSelector)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setUserState(user)
        setAddressesState(user.addresses)
    }, [user])

    const handleProfileImageChange = (e: any) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            formik.setFieldValue('profileImage', reader.result as string)
        }
    }

    const handleAddressAdd = () => {
        const address = {
            id: 0,
            title: '',
            address: '',
            description: '',
            city: '',
            country: '',
            zipCode: '',
        } as any;

        const newAddresses = [...addressesState, address]
        setAddressesState(newAddresses)        
    };




    const validationSchema = Yup.object({
        id: Yup.number().notRequired(),
        name: Yup.string().required('Ad alanı zorunludur')
            .min(2, 'Ad alanı en az 2 karakter olmalıdır'),
        surname: Yup.string().required('Soyad alanı zorunludur'),
        email: Yup.string().email('Geçerli bir email adresi giriniz').required('Email alanı zorunludur'),
        phone: Yup.string().required('Telefon alanı zorunludur'),
        profileImage: Yup.string().notRequired(),
    });

    const formik = useFormik({
        initialValues: {
            name: userState.name,
            surname: userState.surname,
            email: userState.email,
            phone: userState.phone,
            profileImage: userState.profileImage,

        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            const [err, res] = await to(authService.updateAccount(values, token))
            if (err) {
                const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
                setLoading(false)
                dispatch(SET_TOAST(toast))
                formik.resetForm()
                return
            }
            if (res) {

                const toast: IToast = { severity: 'success', summary: "Başarılı", detail: res.message, life: 3000 }
                dispatch(SET_TOAST(toast))
                dispatch(SET_AUTH(
                    {
                        user: { ...userState, name: res.data.name, surname: res.data.surname, email: res.data.email, phone: res.data.phone, profileImage: res.data.profileImage, addresses: res.data.addresses },
                        token: token
                    }
                ))
                setLoading(false)
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        }
    })

    const handleAccountDelete = async () => {
        const [err, data] = await to(authService.deleteAccount(token))
        if (err) {
            const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
            dispatch(SET_TOAST(toast))
            return
        }
        const toast: IToast = { severity: 'success', summary: "Başarılı", detail: data.message, life: 3000 }
        dispatch(SET_TOAST(toast))
        dispatch(SET_LOGOUT())
        navigate('/')

    }

    // bu formik yapısını 3 ayrı formik yapısına ayır ( base, iletişim, adres bilgileri şeklinde)


    const errors = formik.errors as any;

    const errorTemplate = (name: any) => {
        return (
            <>
                {errors?.[name] ? (
                    <small className="text-red-500 ">
                        {errors[name]}
                    </small>
                ) : null}
            </>
        )
    }

    const inputClassName = (fieldName: any) => {
        return 'w-full !my-2 p-inputtext-sm ' +
            (errors?.[fieldName] ? 'p-invalid' : '')
    }

    const buttonsLoadingTemplete = () => {
        return (
            <div className="flex w-1/4">
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className="w-full px-[15px] relative"
        >
            <h3 className="text-4xl my-4 text-primaryDark">
                Kullanıcı Bilgilerim
            </h3>
            {/* resim */}
            <Fieldset legend={
                <div className="flex align-items-center text-primary">
                    <span className="pi pi-user mr-2"></span>
                    <span className="font-bold text-lg">Profil Resmi</span>
                </div>
            } className="mb-4" >
                <div className="flex flex-col items-center">
                    <img src={formik.values.profileImage} alt="profile" className="lg:w-1/3 w-1/2 max-w-[250px] max-h-[250px] object-cover rounded-full" />
                    <form method='post' encType='multipart/form-data' className="flex flex-col items-center">
                        <input type="file" name="profileImage" id="profileImage" className="hidden"
                            onInput={(e: any) => { handleProfileImageChange(e) }}
                        />
                        <label htmlFor="profileImage" className="bg-primary text-white px-6 py-4 rounded-full mt-4 hover:bg-primaryDark transition-all duration-300 cursor-pointer">
                            Resmi Değiştir
                        </label>
                    </form>
                    {
                        formik.values.profileImage !== user.profileImage && (
                            <div className="flex flex-wrap justify-content-end gap-2 my-4">
                                {loading ? buttonsLoadingTemplete()

                                    : <>
                                        <Button label="Save" icon="pi pi-check" type='submit'
                                            onClick={() => {
                                                formik.handleSubmit()
                                            }}
                                        />
                                        <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary"
                                            onClick={() => {
                                                formik.setFieldValue('profileImage', userState.profileImage)
                                            }} />
                                    </>
                                }
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
                                className={inputClassName("name")}
                            />
                            {errorTemplate("name")}
                        </div>


                        <div className="flex flex-col w-full">
                            <label htmlFor="surname" className="text-primary">Soyad</label>
                            <InputText
                                id="surname"
                                name="surname"
                                value={formik.values.surname}
                                onChange={(e) =>
                                    formik.setFieldValue('surname', e.target.value)}
                                className={inputClassName("surname")}
                            />
                            {errorTemplate("surname")}

                        </div>
                    </div>

                    {(user.name !== formik.values.name || user.surname !== formik.values.surname) ? (
                        <div className="flex flex-wrap justify-content-end gap-2 my-4">
                            {loading ? buttonsLoadingTemplete()

                                : !formik.errors.name && !formik.errors.surname && (

                                    <Button label="Save" icon="pi pi-check" type='submit'
                                        onClick={() => {
                                            formik.handleSubmit()
                                        }}
                                    />
                                )}
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
                                className={inputClassName("email")}
                            />
                            {errorTemplate("email")}
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="phone" className="text-primary">Telefon</label>
                            <InputMask
                                id='phone'
                                name='phone'
                                value={formik.values.phone}
                                onChange={(e) =>
                                    formik.setFieldValue('phone', e.target.value)}
                                mask="(999) 999-9999"
                                className={inputClassName("phone")}
                            />
                            {errorTemplate("phone")}

                        </div>
                    </div>

                    {(user.email !== formik.values.email || user.phone !== formik.values.phone) ? (
                        <div className="flex flex-wrap justify-content-end gap-2 my-4">
                            {loading ? buttonsLoadingTemplete()
                                : !formik.errors.phone && !formik.errors.email && (
                                    <Button label="Save" icon="pi pi-check" type='submit'
                                        onClick={() => {
                                            formik.handleSubmit()
                                        }}
                                    />
                                )}
                            < Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary"
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

                    {addressesState.map((address) =>
                        <RenderAddressFields key={address.id} address={address} />
                    )}


                    {/* address ekle  */}

                    <Button label="Ekle" severity="success"
                        className='md:w-1/2 w-full'
                        onClick={handleAddressAdd}
                    />
                </div>

            </Fieldset>

            {/* hesap sil */}
            <Fieldset legend={
                <div className="flex align-items-center text-primary">
                    <span className="pi pi-trash mr-2 mt-1"></span>
                    <span className="font-bold text-lg">Hesabı Sil</span>
                </div>
            } className="mb-4" toggleable >
                <div className="flex flex-col">
                    <div className="flex flex-col w-full">
                        <ConfirmDialog />
                        <Button
                            onClick={() => {
                                const dia = confirmDialog({
                                    message: 'Hesabınızı silmek istediğinize emin misiniz?',
                                    header: 'Hesap Sil',
                                    icon: 'pi pi-exclamation-triangle',
                                    acceptClassName: 'p-button-danger',
                                    accept: () => {
                                        handleAccountDelete()
                                        dia.hide()

                                    },
                                    reject: () => {
                                        dia.hide()
                                    },
                                    closable: false

                                })
                            }}
                            label="Hesabı Sil"
                            severity="danger"
                            className='md:w-1/2 w-full'
                        />



                    </div>
                </div>

            </Fieldset>





        </motion.div >
    )
}

export default UserInformation