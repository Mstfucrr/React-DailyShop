import React, { useState, useEffect } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { TriStateCheckbox, TriStateCheckboxChangeEvent } from 'primereact/tristatecheckbox'
import { IProduct } from '@/shared/types'
import CategorySettings from '../CategorySettings'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import toast from 'react-hot-toast'
import { useGetAllProducts } from '@/services/admin/product/products.service'
import { useAdimnUser } from '@/context/admin/UserContext'

const ApprovedRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  return (
    <TriStateCheckbox
      value={options.value}
      onChange={(e: TriStateCheckboxChangeEvent) => options.filterApplyCallback(e.value)}
    />
  )
}

const ApprovedBodyTemplate = (rowData: any) => {
  return <i className={`pi pi-${rowData.isApproved ? 'check' : 'times'}`} style={{ fontSize: '1.5rem' }}></i>
}

const StatusBodyTemplate = (rowData: any) => {
  return <span className={`product-badge status-${rowData.status}`}>{rowData.status}</span>
}

const RenderIsApproved = ({
  data,
  handleProductApprovalStatusChange
}: {
  data: IProduct
  handleProductApprovalStatusChange: (data: IProduct, status: boolean) => void
}) => {
  if (data.isApproved === null)
    return (
      <>
        <Button
          onClick={() => handleProductApprovalStatusChange(data, true)}
          icon='pi pi-check'
          label='Onayla'
          className='p-button-success p-button-outlined'
          size='small'
        />
        <Button
          onClick={() => {
            handleProductApprovalStatusChange(data, false)
          }}
          icon='pi pi-times'
          className='p-button-danger p-button-outlined'
          label='Reddet'
          size='small'
        />
      </>
    )
  return data.isApproved ? (
    <div className='flex flex-row flex-wrap items-center gap-4'>
      <span className='font-semibold text-green-500'>(Onaylandı)</span>
      <Button
        onClick={() => {
          handleProductApprovalStatusChange(data, false)
        }}
        icon='pi pi-times'
        className='p-button-danger p-button-outlined'
        label='Reddet'
        size='small'
      />
    </div>
  ) : (
    <div className='flex flex-row flex-wrap items-center gap-4'>
      <span className='font-semibold text-red-500'>(Reddedildi)</span>
      <Button
        onClick={() => handleProductApprovalStatusChange(data, true)}
        icon='pi pi-check'
        label='Onayla'
        className='p-button-success p-button-outlined'
        size='small'
      />
    </div>
  )
}

const RenderStatusFilter = (props: any) => <InputText type='text' onChange={e => props.onChange(e.target.value)} />

const RenderImage = (rowData: any) => <img src={rowData.image} alt={rowData.name} className='h-20 w-20' />

const ProductSettings = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null)

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    productName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    isApproved: { value: null, matchMode: FilterMatchMode.EQUALS }
  })

  const showErrorMessage = (err: Error) => {
    toast.error(err.message)
  }

  const [globalFilterValue, setGlobalFilterValue] = useState('')

  const { data: productsData, error: productsError, isLoading: loading } = useGetAllProducts()
  const { handleProductApprovalStatusChange } = useAdimnUser()

  useEffect(() => {
    if (productsError) {
      showErrorMessage(productsError)
      return
    }
    if (productsData) setProducts(productsData.data.data)
  }, [productsData, productsError])

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let _filters = { ...filters }

    //@ts-ignore
    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  return (
    <div className='flex w-full flex-col gap-12'>
      {loading && (
        <div className='flex w-full items-center justify-center'>
          <ProgressSpinner strokeWidth='4' style={{ width: '50px', height: '50px' }} />
        </div>
      )}
      {/* Ürünler */}
      {!loading && products && (
        <DataTable
          value={products}
          header={
            <div className='justify-content-end flex'>
              <span className='p-input-icon-left'>
                <i className='pi pi-search' />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Ara' />
              </span>
            </div>
          }
          className='p-datatable-customers w-full'
          dataKey='id'
          emptyMessage='Ürün Bulunamadı'
          globalFilter={globalFilterValue}
          filterDisplay='row'
          loading={false}
          globalFilterFields={['name', 'category.name', 'stock', 'price', 'status']}
          paginator
          rows={10}
          rowsPerPageOptions={[1, 5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Toplam {totalRecords} ürün arasından {first} - {last} arası gösteriliyor'
          paginatorLeft={null}
          paginatorRight={null}
        >
          <Column field='id' header='ID' sortable />
          <Column field='image' header='Resim' body={RenderImage} filter={false} />
          <Column field='name' header='Ürün Adı' sortable filterPlaceholder='Ara' filterMatchMode='contains' filter />
          <Column field='stock' header='Stok' sortable />
          <Column field='price' header='Fiyat' sortable />
          <Column
            field='status'
            header='Durum'
            sortable
            body={StatusBodyTemplate}
            filterPlaceholder='Ara'
            filterMatchMode='contains'
            filterElement={RenderStatusFilter}
          />
          <Column
            field='isApproved'
            header='Onay'
            sortable
            body={ApprovedBodyTemplate}
            filter
            filterMatchMode='contains'
            filterElement={ApprovedRowFilterTemplate}
          />
          {/* approve button */}
          <Column
            header='Onay'
            body={(rowData: any) => (
              <RenderIsApproved
                data={rowData}
                handleProductApprovalStatusChange={(data: IProduct, status: boolean) =>
                  handleProductApprovalStatusChange({
                    id: data.id,
                    status: status
                  })
                }
              />
            )}
            filter={false}
          />
        </DataTable>
      )}

      {/* Kategori ekle kaldır güncelle */}

      <CategorySettings />
    </div>
  )
}

export default ProductSettings
