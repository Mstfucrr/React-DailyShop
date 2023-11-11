import React, { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { TriStateCheckbox, TriStateCheckboxChangeEvent } from 'primereact/tristatecheckbox';
import adminService from '@/services/admin/admin.service';
import to from 'await-to-js';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/store/auth';
import { IProduct } from '@/shared/types';
import CategorySettings from './CategorySettings';
import { SET_TOAST } from '@/store/Toast';
import { IToast } from '@/store/Toast/type';


const ProductSettings = () => {

    const [products, setProducts] = useState<IProduct[] | null>(null)

    const [filters, setFilters] = useState<DataTableFilterMeta>({

        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        productName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        isApproved: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');


    const { token } = useSelector(authSelector)
    const dispatch = useDispatch()


    useEffect(() => {

        const getAllProducts = async () => {
            const [err, data] = await to(adminService.getAllProducts(token));
            if (err) {
                const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
                dispatch(SET_TOAST(toast))
                return
            }
            if (data) {
                setProducts(data.data)
                setLoading(false);
            }
        }
        getAllProducts();
    }, []);



    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        //@ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);

    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Ara" />
                </span>
            </div>
        );
    }

    const statusBodyTemplate = (rowData: any) => {
        return <span className={`product-badge status-${rowData.status}`}>{rowData.status}</span>;
    }


    const approvedBodyTemplate = (rowData: any) => {
        return <i className={`pi pi-${rowData.isApproved ? 'check' : 'times'}`} style={{ fontSize: '1.5rem' }}></i>;
    }


    const approvedRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <TriStateCheckbox value={options.value} onChange={(e: TriStateCheckboxChangeEvent) => options.filterApplyCallback(e.value)} />;
    }


    const header = renderHeader();

    return (
        <>
            <div className="flex flex-col gap-12 w-full">

                {products &&
                    <DataTable value={products} header={header} className="p-datatable-customers w-full" dataKey="id"
                        loading={loading} emptyMessage="Ürün Bulunamadı" globalFilter={globalFilterValue}
                        filterDisplay="row"
                        globalFilterFields={["name", "category.name", "stock", "price", "status"]}
                        paginator rows={10} rowsPerPageOptions={[1,5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Toplam {totalRecords} ürün arasından {first} - {last} arası gösteriliyor"
                        paginatorLeft={null} paginatorRight={null} >

                        <Column field="id" header="ID" sortable></Column>
                        <Column field="name" header="Ürün Adı" sortable filterPlaceholder="Ara" filterMatchMode="contains"
                            filter
                        ></Column>
                        <Column field="stock" header="Stok" sortable></Column>
                        <Column field="price" header="Fiyat" sortable></Column>
                        <Column field="status" header="Durum" sortable body={statusBodyTemplate} filterPlaceholder="Ara" filterMatchMode="contains" filterElement={(props: any) => <InputText type="text" onChange={(e) => props.onChange(e.target.value)} />} />
                        <Column field="isApproved" header="Onay" sortable body={approvedBodyTemplate} filter filterMatchMode="contains" filterElement={approvedRowFilterTemplate} />

                    </DataTable>

                }

                {/* Kategori ekle kaldır güncelle */}

                <CategorySettings />


            </div>


        </>
    )
}

export default ProductSettings