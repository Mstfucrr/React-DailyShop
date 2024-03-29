import React, { useState, useEffect, useCallback } from 'react'
import { FilterMatchMode } from 'primereact/api'
import { DataTable, DataTableFilterMeta } from 'primereact/datatable'
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { TriStateCheckbox, TriStateCheckboxChangeEvent } from 'primereact/tristatecheckbox'
import { productService, userService } from '@/services/admin/admin.service'
import to from 'await-to-js'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '@/store/auth'
import { IProduct } from '@/shared/types'
import CategorySettings from './CategorySettings'
import { SET_TOAST } from '@/store/Toast'
import { IToast } from '@/store/Toast/type'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'

const ProductSettings = () => {
  const [products, setProducts] = useState<IProduct[] | null>(null)

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    productName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    isApproved: { value: null, matchMode: FilterMatchMode.EQUALS }
  })

  const showErrorMessage = (err: Error) => {
    const toast: IToast = {
      severity: 'error',
      summary: 'Hata',
      detail: err.message,
      life: 3000
    }
    setLoading(false)
    dispatch(SET_TOAST(toast))
  }
  const showSuccess = (message: string) => {
    const toast: IToast = {
      severity: 'success',
      summary: 'Başarılı',
      detail: message,
      life: 3000
    }
    setLoading(false)
    dispatch(SET_TOAST(toast))
  }

  const [loading, setLoading] = useState<boolean>(false)
  const [globalFilterValue, setGlobalFilterValue] = useState('')

  const { token } = useSelector(authSelector)
  const dispatch = useDispatch()

  const getAllProducts = async () => {
    setLoading(true)
    const [err, data] = await to(productService.getAllProducts(token))
    if (err) {
      const toast: IToast = {
        severity: 'error',
        summary: 'Hata',
        detail: err.message,
        life: 3000
      }
      dispatch(SET_TOAST(toast))
      setLoading(false)
      return
    }
    if (data) setProducts(data.data)
    setLoading(false)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let _filters = { ...filters }

    //@ts-ignore
    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const renderHeader = () => {
    return (
      <div className='justify-content-end flex'>
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='Ara' />
        </span>
      </div>
    )
  }

  const statusBodyTemplate = (rowData: any) => {
    return <span className={`product-badge status-${rowData.status}`}>{rowData.status}</span>
  }

  const approvedBodyTemplate = (rowData: any) => {
    return <i className={`pi pi-${rowData.isApproved ? 'check' : 'times'}`} style={{ fontSize: '1.5rem' }}></i>
  }

  const approvedRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e: TriStateCheckboxChangeEvent) => options.filterApplyCallback(e.value)}
      />
    )
  }

  const handleProductApprovalStatusChange = async (data: IProduct, status: boolean) => {
    console.log('status: ', status)
    const [err, data2] = await to(userService.updateProductApprovalStatus(data.id, status, token))
    if (err) return showErrorMessage(err)
    showSuccess(data2.message)
    getAllProducts()
  }

  const renderIsApproved = useCallback(
    (data: IProduct) => {
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
      else if (data.isApproved)
        return (
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
        )
      else
        return (
          <div className='flex flex-row flex-wrap items-center gap-4'>
            <Button
              onClick={() => handleProductApprovalStatusChange(data, true)}
              icon='pi pi-check'
              label='Onayla'
              className='p-button-success p-button-outlined'
              size='small'
            />
            <span className='font-semibold text-red-500'>(Reddedildi)</span>
          </div>
        )
    },
    [handleProductApprovalStatusChange]
  )

  const renderStatusFilter = useCallback(
    (props: any) => <InputText type='text' onChange={e => props.onChange(e.target.value)} />,
    []
  )

  const renderImage = useCallback(
    (rowData: any) => <img src={rowData.image} alt={rowData.name} className='h-20 w-20' />,
    []
  )

  const header = renderHeader()

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
          header={header}
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
          <Column field='image' header='Resim' body={renderImage} filter={false} />
          <Column field='name' header='Ürün Adı' sortable filterPlaceholder='Ara' filterMatchMode='contains' filter />
          <Column field='stock' header='Stok' sortable />
          <Column field='price' header='Fiyat' sortable />
          <Column
            field='status'
            header='Durum'
            sortable
            body={statusBodyTemplate}
            filterPlaceholder='Ara'
            filterMatchMode='contains'
            filterElement={renderStatusFilter}
          />
          <Column
            field='isApproved'
            header='Onay'
            sortable
            body={approvedBodyTemplate}
            filter
            filterMatchMode='contains'
            filterElement={approvedRowFilterTemplate}
          />
          {/* approve button */}
          <Column header='Onay' body={renderIsApproved} filter={false} />
        </DataTable>
      )}

      {/* Kategori ekle kaldır güncelle */}

      <CategorySettings />
    </div>
  )
}

export default ProductSettings
