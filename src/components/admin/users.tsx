import adminService from '@/services/admin/admin.service'
import { authSelector } from '@/store/auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IUser, IUserAddress } from '@/services/auth/types';
import { Button } from 'primereact/button';
import { IProduct, IReview } from '@/shared/types';
import to from 'await-to-js';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { SET_TOAST } from '@/store/Toast';
import { IToast } from '@/store/Toast/type';
import { Fieldset } from 'primereact/fieldset';
import { Link } from 'react-router-dom';
import { DataView } from 'primereact/dataview';


const UserSettings = () => {

    const { token } = useSelector(authSelector)

    const [users, setUsers] = useState<any[]>([])
    const [selectedUser, setSelectedUser] = useState<IUser>()
    const [selectedUserAddress, setSelectedUserAddress] = useState<IUserAddress[]>([])
    const [selectedUserReviews, setSelectedUserReviews] = useState<IReview[]>([])
    const [selectedUserPaddingProduct, setSelectedUserPaddingProduct] = useState<IProduct>()
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const showErrorMessage = (err: any) => {
        const res = err as any
        const errorMessage = res.response.data.Message || err.message;
        const toast: IToast = { severity: 'error', summary: "Hata", detail: errorMessage, life: 3000 }
        dispatch(SET_TOAST(toast))
    }
    const showSuccess = (message: string) => {
        const toast: IToast = { severity: 'success', summary: "Başarılı", detail: message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            const [err, data] = await to(adminService.fetchUsers(token))
            if (err) {
                showErrorMessage(err)
                setLoading(false)
                return
            }
            if (data) {
                setUsers(data)
                showSuccess(data.message)
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    useEffect(() => {
        {/* rolü adminse seçilemesin */ }

        const fetchUserAddressAndReviews = async () => {
            if (selectedUser) {
                const [err, data] = await to(adminService.fetchAddressByUserId(selectedUser.id, token))
                if (data)
                    setSelectedUserAddress(data)

                const [err2, data2] = await adminService.fetchReviewsByUserId(selectedUser.id, token)
                if (data2)
                    setSelectedUserReviews([data2])

                const [err3, data3] = await adminService.fetchPaddingProductByUserId(selectedUser.id, token)
                if (data3)
                    setSelectedUserPaddingProduct(data3)

                if (err || err2 || err3) {
                    showErrorMessage(err)
                    showErrorMessage(err2)
                    showErrorMessage(err3)
                    return
                }

            }

        }
        fetchUserAddressAndReviews()
    }, [selectedUser])

    const handleReviewStatusChange = async (data: IReview, status: string) => {
        const [err, data2] = await to(adminService.updateReviewStatus(data.id, status, token))
        if (err) {
            showErrorMessage(err)
            return
        }
        if (data2) {
            showSuccess(data2.message)
        }
    }

    const handleProductApprovalStatusChange = async (data: IProduct, status: boolean) => {
        const [err, data2] = await to(adminService.updateProductApprovalStatus(data.id, status, token))
        if (err) {
            showErrorMessage(err)
            return
        }
        if (data2) {
            showSuccess(data2.message)
        }
    }

    const handleBlockUser = async (id: number) => {
        const [err, data] = await to(adminService.blockUser(id, token))
        if (err) {
            showErrorMessage(err)
            return
        }
        if (data) {
            showSuccess(data.message)
        }
    }



    return (
        <>
            <div className="flex flex-col gap-10     w-full">
                <DataTable value={users} loading={loading} selection={selectedUser} onSelectionChange={(e) => setSelectedUser(e.value as IUser)}
                    scrollable scrollHeight="400px"
                >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="ID" />
                    <Column field="name" header="İsim" />
                    <Column field="surname" header="Soyisim" />
                    <Column field="email" header="E-posta" />
                    <Column field="role" header="Rol" />
                    <Column header="Engelle" body={(data: any) => {
                        return (
                            <Button label="Engelle" className="p-button-danger !p-2 !text-sm"
                                onClick={() => {
                                    handleBlockUser(data.id)
                                }} />
                        )
                    }}></Column>
                </DataTable>


                {/* Seçilen kişinin detaylı bilgileri ( yaptığı yorumları denetimden geçirme, status(yeni, onayla, reddet)) , satış yapacağı ürünü denetleyip onaylama */}

                {selectedUser &&
                    <div className="flex flex-col gap-5">
                        <h1 className="text-2xl font-semibold">Kullanıcı Bilgileri</h1>
                        <div className="flex w-full justify-evenly flex-wrap gap-6">

                            <div className="flex flex-wrap gap-2">
                                <span>İsim Soyisim</span>
                                <span className="font-semibold">{selectedUser.name} {selectedUser.surname}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span>E-posta</span>
                                <span className="font-semibold">{selectedUser.email}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span>Telefon</span>
                                <span className="font-semibold">{selectedUser.phone}</span>
                            </div>
                        </div>
                        {/* Adres bilgileri */}

                        <div className="mt-5">
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold text-center">Adresler</h3>
                                <br />
                                <div className="flex flex-wrap justify-around gap-4 items-center">

                                    {selectedUserAddress && selectedUserAddress.map((address, index) => {
                                        return (
                                            <div className="flex flex-col gap-2" key={index}>
                                                <span>Adres {index + 1}</span>
                                                <span className="font-semibold">{address.title}</span>
                                                <span className="font-semibold">{address.address}</span>
                                                <span className="font-semibold">{address.city}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Yorumlar */}
                        <div className="mt-5">
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold text-center">Yorumlar</h3>
                                <br />
                                <DataTable value={selectedUserReviews} scrollable scrollHeight="400px">
                                    <Column field="id" header="ID" />
                                    <Column field="review" header="Yorum" />
                                    <Column header="Ürün bağlantılı imagesi" body={(data: IReview) => {
                                        return (
                                            <a href={`/productDetail/${data.productId}`} className="flex justify-center items-center">
                                                {data.product?.image ? (
                                                    <img src={typeof data.product.image === 'string' ? data.product.image : URL.createObjectURL(data.product.image)} alt="" className="w-20 h-20" />
                                                ) : (
                                                    <span>Resim yok</span>
                                                )}
                                            </a>
                                        )
                                    }}></Column>
                                    <Column header="Puan" body={(data: any) => {
                                        return (
                                            <Rating value={data.rating} readOnly cancel={false} />
                                        )
                                    }}></Column>
                                    {/* yeni onayla reddet Dropdown */}
                                    <Column header="Durum" body={(data: IReview) => {
                                        return (
                                            <Dropdown options={[{ label: 'Yeni', value: 'new' }, { label: 'Onayla', value: 'approved' }, { label: 'Reddet', value: 'reject' }]}
                                                value={data.status}
                                                onChange={(e) => {
                                                    handleReviewStatusChange(data, e.value)
                                                }}
                                            />
                                        )
                                    }}>
                                    </Column>
                                </DataTable>


                            </div>
                        </div>

                        {/* Satışta ürünü varsa ( onay bekleyen ) */}
                        <Fieldset
                            legend="Satışta bekleyen ürünü ( onay bekleyen )"
                            toggleable
                        >
                            {selectedUserPaddingProduct ?
                                <>
                                    <DataView value={[selectedUserPaddingProduct]} itemTemplate={(data: IProduct) => {
                                        return (
                                            <div className="flex items-center w-full">
                                                <div className="flex flex-row items-center w-full justify-evenly gap-2 ml-2">
                                                    {data.image ? (
                                                        <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="" className="w-20 h-20" />
                                                    ) : (
                                                        <span>Resim yok</span>
                                                    )}
                                                    <span className="text-xl font-semibold">{data.name}</span>
                                                    <span className="text-xl font-semibold">{data.price} ₺</span>
                                                    <span className="text-xl font-semibold"> {data.stock} adet</span>
                                                    {/* yeni onayla reddet */}
                                                    <Link to={`/productDetail/${selectedUserPaddingProduct.id}`}>
                                                        <Button label="Ürünü görüntüle" className="p-button-info p-button-outlined" size="small" />
                                                    </Link>
                                                    <div className="card flex flex-wrap gap-2 justify-content-center">
                                                        <Button onClick={() => (handleProductApprovalStatusChange(data, true))} icon="pi pi-check" label="Onayla" className="p-button-success p-button-outlined" size='small' />
                                                        <Button onClick={() => { handleProductApprovalStatusChange(data, false) }} icon="pi pi-times" className="p-button-danger p-button-outlined" label="Reddet" size='small' />
                                                    </div>

                                                </div>


                                            </div>
                                        )
                                    }
                                    }
                                        className='w-full'
                                    />
                                </>
                                :
                                <div className="flex flex-col justify-center items-center">
                                    <span className="text-xl font-semibold">Satışta bekleyen ürünü yok</span>
                                </div>
                            }
                        </Fieldset>



                    </div>
                }

            </div >

        </>
    )
}

export default UserSettings