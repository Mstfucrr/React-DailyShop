import { productService, userService } from '@/services/admin/admin.service'
import { authSelector } from '@/store/auth'
import { useCallback, useEffect, useState } from 'react'
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
import { ProgressSpinner } from 'primereact/progressspinner';
import { reviewStatus } from '@/shared/constants';
import { IOrder } from '@/services/order/types';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

const UserSettings = () => {

    const { token } = useSelector(authSelector)

    const [users, setUsers] = useState<any[]>([])
    const [selectedUser, setSelectedUser] = useState<IUser>()
    const [selectedUserAddress, setSelectedUserAddress] = useState<IUserAddress[]>([])
    const [selectedUserReviews, setSelectedUserReviews] = useState<IReview[]>([])
    const [selectUserProducts, setSelectUserProducts] = useState<IProduct[]>()
    const [selectUserOrders, setSelectUserOrders] = useState<IOrder[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const [productLoading, setProductLoading] = useState<boolean>(false)
    const [reviewLoading, setReviewLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const params = new URLSearchParams(window.location.search);

    const showErrorMessage = (err: Error) => {
        const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
        setLoading(false)
        dispatch(SET_TOAST(toast))
    }
    const showSuccess = (message: string) => {
        const toast: IToast = { severity: 'success', summary: "Başarılı", detail: message, life: 3000 }
        setLoading(false)
        dispatch(SET_TOAST(toast))
    }

    const fetchUsers = async () => {
        const [err, data] = await to(userService.fetchUsers(token))
        if (err) return showErrorMessage(err)
        setUsers(data)
        showSuccess(data.message)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        fetchUsers()
    }, []);

    const fetchUserAddress = async () => {
        const [err, data] = await to(userService.fetchAddressByUserId(selectedUser?.id!, token))
        if (err) return showErrorMessage(err)
        return data.data
    }
    const fetchUserReviews = async () => {
        setSelectedUserReviews([])
        setReviewLoading(true)
        const [err, data] = await to(userService.fetchReviewsByUserId(selectedUser?.id!, token))
        if (err) return showErrorMessage(err)
        setReviewLoading(false)
        return data.data
    }
    const fetchUserProducts = async () => {
        setProductLoading(true)
        setSelectUserProducts([])
        const [err, data] = await to(userService.fetchPaddingProductByUserId(selectedUser?.id!, token))
        if (err) return showErrorMessage(err)
        setProductLoading(false)
        return data.data
    }

    const fetchUserOrders = async () => {
        setProductLoading(true)
        setSelectUserOrders([])
        const [err, data] = await to(userService.fetchOrdersByUserId(selectedUser?.id!, token))
        if (err) return showErrorMessage(err)
        setProductLoading(false)
        return data.data
    }

    useEffect(() => {
        const userId = params.get('userId')
        if (userId && users.length > 0 && !selectedUser) {
            const user = users.find(u => u.id === Number(userId))
            setSelectedUser(user)
        }
    }, [users, params])

    useEffect(() => {
        if (selectedUser) {          
            fetchUserAddress().then(data => setSelectedUserAddress(data))
            fetchUserReviews().then(data => setSelectedUserReviews(data))
            fetchUserProducts().then(data => setSelectUserProducts(data))
            fetchUserOrders().then(data => setSelectUserOrders(data))
            window.history.pushState({}, '', `/admin/users?userId=${selectedUser.id}`)
        }
    }, [selectedUser])

    const handleReviewStatusChange = async (data: IReview, status: string) => {
        const [err, data2] = await to(userService.updateReviewStatus(data.id, status, token))
        if (err) return showErrorMessage(err)
        showSuccess(data2.message)
    }

    const handleProductApprovalStatusChange = async (data: IProduct, status: boolean) => {
        console.log("status: ", status)
        const [err, data2] = await to(userService.updateProductApprovalStatus(data.id, status, token))
        if (err) return showErrorMessage(err)
        showSuccess(data2.message)
        fetchUserProducts()
    }

    const handleBlockUser = async (id: number) => {
        const [err, data] = await to(userService.blockUser(id, token))
        if (err) return showErrorMessage(err)
        showSuccess(data.message)
        fetchUsers()

    }


    const renderProductImage = useCallback((data: IReview) => (
        <Link to={`/product/${data?.product?.id}`} className="flex justify-center items-center">
            {data.product?.image
                ? <img src={data.product?.image} alt="" className="w-20 h-20" />
                : <span>Resim Yok</span>
            }
        </Link>
    ), []);

    const renderRating = useCallback((data: any) => (
        <Rating value={data.rating} readOnly cancel={false} />
    ), []);

    const renderStatusDropdown = useCallback((data: IReview) => (
        <Dropdown
            options={reviewStatus}
            value={data.status ?? 'new'}
            onChange={(e) => {
                handleReviewStatusChange(data, e.value)
                    .then(fetchUserReviews)
            }}
        />
    ), [handleReviewStatusChange]);

    const renderUserBlockButton = useCallback((data: IUser) => (
        <>
            {data.status ? (
                <Button onClick={() => { handleBlockUser(data.id); }} icon="pi pi-ban" className="p-button-danger p-button-outlined" label="Engelle" size='small' />
            ) : (
                <Button onClick={() => { handleBlockUser(data.id); }} icon="pi pi-check" className="p-button-success p-button-outlined" label="Engeli kaldır" size='small' />
            )}
        </>
    ), [handleBlockUser]);

    const renderIsApproved = useCallback((data: IProduct) => {
        if (data.isApproved === null)
            return <>
                <Button onClick={() => (handleProductApprovalStatusChange(data, true))} icon="pi pi-check" label="Onayla" className="p-button-success p-button-outlined" size='small' />
                <Button onClick={() => { handleProductApprovalStatusChange(data, false) }} icon="pi pi-times" className="p-button-danger p-button-outlined" label="Reddet" size='small' />
            </>
        else if (data.isApproved)
            return <div className='flex flex-wrap flex-row gap-4 items-center'>
                <span className="font-semibold text-green-500">(Onaylandı)</span>
                <Button onClick={() => { handleProductApprovalStatusChange(data, false) }} icon="pi pi-times" className="p-button-danger p-button-outlined" label="Reddet" size='small' />
            </div>
        else
            return <div className='flex flex-wrap flex-row gap-4 items-center'>
                <Button onClick={() => (handleProductApprovalStatusChange(data, true))} icon="pi pi-check" label="Onayla" className="p-button-success p-button-outlined" size='small' />
                <span className="font-semibold text-red-500">(Reddedildi)</span>
            </div>

    }, [handleProductApprovalStatusChange]);

    const handleDetleteProduct = async (id: number) => {
        const [err, data] = await to(productService.deleteProduct(id, token))
        if (err) return showErrorMessage(err)
        showSuccess(data.message)
        fetchUserProducts()
    }

    const confirmDelete = (event: any, id: number) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Silmek istediğinize emin misiniz?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleDetleteProduct(id),
            reject: () => { },
            acceptLabel: 'Sil',
            rejectLabel: 'Hayır',
            acceptIcon: 'pi pi-trash',
            rejectIcon: 'pi pi-times',
            acceptClassName: 'p-button-danger'
        });
    }

    const renderselectUserProducts = useCallback((data: IProduct) => (
        <div className="flex items-center w-full">
            <div className="flex flex-row items-center w-full justify-evenly gap-2 ml-2">
                {data.image ? (
                    <img src={data.image} alt="" className="w-20 h-20" />
                ) : (
                    <span>Resim yok</span>
                )}
                <span className="font-semibold">{data.name}</span>
                <span className="font-semibold">{data.price} ₺</span>
                <span className="font-semibold"> {data.stock} adet</span>
                {/* yeni onayla reddet */}
                <Link to={`/product/${data.id}`}>
                    <Button label="Ürünü görüntüle" className="p-button-info p-button-outlined" size="small" />
                </Link>
                <div className="card flex flex-wrap gap-2 justify-content-center">
                    {renderIsApproved(data)}
                </div>
                <ConfirmPopup />

                <Button label="Sil"
                    onClick={(e) => confirmDelete(e, data.id)}
                    severity="danger"
                    loading={false}
                    className="ml-3"
                />
            </div>


        </div>
    ), [handleProductApprovalStatusChange, selectUserProducts]);


    const refreshButton = useCallback((refreshFunction: () => Promise<void>) => (
        <div className="flex justify-end my-3">
            <Button label="Yenile" icon="pi pi-refresh" className="p-button-raised p-button-rounded p-button-text" onClick={refreshFunction} />
        </div>
    ), [users, selectedUserReviews, selectUserProducts]);


    const productLoadingTemplate = useCallback(() => (
        <>
            {productLoading ?
                <ProgressSpinner className='w-full' />
                :
                <div className="flex flex-col justify-center items-center">
                    <span className="text-xl font-semibold">Satışta bekleyen ürünü yok</span>
                </div>}
        </>
    ), [productLoading]);

    return (
        <div className="flex flex-col gap-10 w-full">

            {/* Kullanıcı listesi */}
            {users && <h1 className="text-2xl font-semibold text-primary uppercase">Kullanıcılar</h1>}
            {users &&

                <DataTable value={users} loading={loading} selection={selectedUser} onSelectionChange={(e) => setSelectedUser(e.value as IUser)}
                    scrollable scrollHeight="400px"
                >
                    <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="ID" />
                    <Column field="name" header="İsim" />
                    <Column field="surname" header="Soyisim" />
                    <Column field="email" header="E-posta" />
                    <Column field="role" header="Rol" />
                    <Column header="Engelle" body={renderUserBlockButton}></Column>
                </DataTable>

            }
            {/* Seçilen kişinin detaylı bilgileri ( yaptığı yorumları denetimden geçirme, status(yeni, onayla, reddet)) , satış yapacağı ürünü denetleyip onaylama */}

            {selectedUser &&
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl font-semibold text-primary uppercase">Kullanıcı Bilgileri</h1>
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
                            <h3 className="text-xl font-semibold text-center text-primary uppercase">Adresler</h3>
                            <br />
                            <div className="flex flex-wrap justify-around gap-4">

                                {selectedUserAddress?.map((address, index) => (
                                    <div className="bg-white p-4 rounded-md shadow-md w-96 hover:shadow-xl transition duration-300 ease-in-out"
                                        key={address.title}>
                                        <div className="flex flex-col gap-2">
                                            <h6 className="font-semibold text-lg">Adres {index + 1}</h6>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row gap-3">
                                                <h6 className="font-semibold">Adres Başlığı</h6>
                                                <span className='text-primary font-semibold'>{address.title}</span>
                                            </div>
                                            <div className="flex flex-row gap-3">
                                                <h6 className="font-semibold">Adres Tanımı</h6>
                                                <span className='text-primary font-semibold'>{address.description}</span>
                                            </div>
                                            <div className="flex flex-row gap-3">
                                                <h6 className="font-semibold">Adres</h6>
                                                <span className='text-primary font-semibold'>{address.address}</span>
                                            </div>
                                            <div className="flex flex-row gap-3">
                                                <h6 className="font-semibold">Ülke</h6>
                                                <span className='text-primary font-semibold'>{address.country}</span>
                                            </div>
                                            <div className="flex flex-row gap-3">
                                                <h6 className="font-semibold">İl</h6>
                                                <span className='text-primary font-semibold'>{address.city}</span>
                                            </div>
                                            <div className="flex flex-row gap-3">
                                                <h6 className="font-semibold">Posta Kodu</h6>
                                                <span className='text-primary font-semibold'>{address.zipCode}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Yorumlar */}
                    <div className="mt-5">
                        <div className="flex flex-col">
                            <Fieldset
                                legend={
                                    <h3 className="text-xl font-semibold text-center text-primary uppercase">Kullanıcı Yorumları</h3>
                                }
                                toggleable
                            >
                                {/* Yenile */}
                                {refreshButton(fetchUserReviews)}

                                {/* Yorumlar tablosu */}
                                {reviewLoading ?
                                    <ProgressSpinner className='w-full' />
                                    : <>
                                        {selectedUserReviews && selectedUserReviews.length > 0 ?
                                            <DataTable value={selectedUserReviews} scrollable scrollHeight="400px"
                                                emptyMessage="Yorum bulunamadı"
                                                filterIcon="pi pi-search"
                                            >
                                                <Column field="id" header="ID" />
                                                <Column field="comment" header="Yorum" maxConstraints={20} />
                                                <Column header="Ürün Bağlantılı Resmi" body={renderProductImage}></Column>
                                                <Column field='rating' header="Puan" body={renderRating}></Column>
                                                <Column header="Durum" body={renderStatusDropdown}></Column>
                                            </DataTable>
                                            :
                                            <div className="flex flex-col justify-center items-center">
                                                <span className="text-xl font-semibold">Yorum bulunamadı</span>
                                            </div>
                                        }
                                    </>
                                }
                            </Fieldset>
                        </div>


                    </div>

                    {/* Ürünler */}
                    <Fieldset
                        legend={
                            <h3 className="text-xl font-semibold text-center text-primary uppercase">Kullanıcı ürünleri</h3>
                        }
                        toggleable

                    >

                        {refreshButton(fetchUserProducts)}
                        {/* // ürünler tablosu */}

                        {selectUserProducts && selectUserProducts.length > 0

                            ? <DataView value={selectUserProducts} itemTemplate={renderselectUserProducts} className='w-full' />
                            : productLoadingTemplate()
                        }
                    </Fieldset>



                </div>
            }

        </div >

    )
}

export default UserSettings