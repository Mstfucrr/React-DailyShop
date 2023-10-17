import adminService from '@/services/admin/admin.service'
import { authSelector } from '@/store/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { userEx } from '../account/example.user';
import { IUser, IUserAddress } from '@/services/auth/types';
import { Button } from 'primereact/button';
import { IProduct, IReview } from '@/shared/types';
import to from 'await-to-js';
import { reviews } from '../account/example.review';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { SET_TOAST } from '@/store/Toast';
import { IToast } from '@/store/Toast/type';
import { Fieldset } from 'primereact/fieldset';
import { Galleria } from 'primereact/galleria';
import { products } from '../shop/example.products';


const UserSettings = () => {

    const { token } = useSelector(authSelector)

    const [users, setUsers] = useState<any[]>([])
    const [selectedUser, setSelectedUser] = useState<IUser>()
    const [selectedUserAddress, setSelectedUserAddress] = useState<IUserAddress[]>([])
    const [selectedUserReviews, setSelectedUserReviews] = useState<IReview[]>([])
    const [selectedUserPaddingProduct, setSelectedUserPaddingProduct] = useState<IProduct>()
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            const [err, data] = await to(adminService.fetchUsers(token))
            if (err) {
                console.log(err)
                setUsers([userEx])
                setLoading(false)
                return
            }
            if (data) {
                setUsers(data)
                setLoading(false)
            }
        }
        setUsers([userEx])
        setLoading(false)
        // fetchUsers()
    }, [])

    useEffect(() => {
        {/* rolü adminse seçilemesin */ }

        const fetchUserAddressAndReviews = async () => {
            if (selectedUser) {
                const [err, data] = await to(adminService.fetchAddressByUserId(selectedUser.id, token))
                if (err) {
                    return
                }
                if (data)
                    setSelectedUserAddress(data)

                const [err2, data2] = await adminService.fetchReviewsByUserId(selectedUser.id, token)
                if (err2) {
                    setSelectedUserReviews(reviews)
                    return
                }
                if (data2)
                    setSelectedUserReviews([data2])

                const [err3, data3] = await adminService.fetchPaddingProductByUserId(selectedUser.id, token)
                if (err3) {
                    setSelectedUserPaddingProduct(products[0])
                    return
                }
                if (data3)
                    setSelectedUserPaddingProduct(data3)


            }

        }
        fetchUserAddressAndReviews()
    }, [selectedUser])
    const isSelectable = (data: { role: string; }) => data.role !== 'admin';

    const isRowSelectable = (event: any) => (event.data ? isSelectable(event.data) : true);

    const handleReviewStatusChange = async (data: IReview, status: string) => {
        const [err, data2] = await to(adminService.updateReviewStatus(data.id, status, token))
        if (err) {
            console.log(err)
            return
        }
        if (data2) {
            console.log(data2)
            const toast: IToast = { severity: 'success', summary: 'Başarılı', detail: data2.message, life: 3000 }
            dispatch(SET_TOAST(toast))
        }
    }



    return (
        <>
            <div className="flex flex-col gap-10     w-full">
                <DataTable value={users} loading={loading} selection={selectedUser} onSelectionChange={(e) => setSelectedUser(e.value as IUser)}
                    // isDataSelectable={isRowSelectable}
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
                                    console.log(data)
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
                                                <img src={data.product?.image} alt="" className="w-20 h-20" />
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
                                <></>
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