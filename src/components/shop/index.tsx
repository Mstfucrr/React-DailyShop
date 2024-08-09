'use client'
import { InputText } from 'primereact/inputtext'
import SideBar from './sideBar'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { useEffect, useRef, useState } from 'react'
import { IProduct } from '@/shared/types'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator'
import { useGetProductsByCategoryId } from '@/services/shop/shop.service'
import { InputSwitch } from 'primereact/inputswitch'
import { Messages } from 'primereact/messages'
import { ProgressSpinner } from 'primereact/progressspinner'
import { sortBy } from '@/shared/constants'
import { ProductsSortBy } from '@/services/shop/types'
import ProductCard from './productCard'

const Shop = ({ shopId }: { shopId: number }) => {
  const [selectSortBy, setSelectSortBy] = useState<{
    name: string
    code: string
  }>({ name: '', code: '' })
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
  const [search, setSearch] = useState<string>('')
  const [responseData, setResponseData] = useState<IProduct[] | undefined>(undefined)
  const [products, setProducts] = useState<IProduct[]>([]) // tüm ürünlerin listesi
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(6)
  const [isDelProductShow, setIsDelProductShow] = useState<boolean>(true)

  const msgs = useRef<Messages>(null)
  const { data, isError, isPending } = useGetProductsByCategoryId({
    id: shopId,
    isDeletedDatas: isDelProductShow
  })

  useEffect(() => {
    switch (selectSortBy.code) {
      case ProductsSortBy.Newest:
        setFilteredProducts([...filteredProducts].sort((a, b) => b.id - a.id))
        break
      case ProductsSortBy.PriceLowToHigh:
        setFilteredProducts([...filteredProducts].sort((a, b) => a.price - b.price))
        break
      case ProductsSortBy.PriceHighToLow:
        setFilteredProducts([...filteredProducts].sort((a, b) => b.price - a.price))
        break
      case ProductsSortBy.NameAZ:
        setFilteredProducts([...filteredProducts].sort((a, b) => a.name.localeCompare(b.name)))
        break
      case ProductsSortBy.NameZA:
        setFilteredProducts([...filteredProducts].sort((a, b) => b.name.localeCompare(a.name)))
        break
      case ProductsSortBy.TopRated:
        setFilteredProducts([...filteredProducts].sort((a, b) => b.rating - a.rating))
        break
      case ProductsSortBy.Review:
        setFilteredProducts([...filteredProducts].sort((a, b) => b.reviews.length - a.reviews.length))
        break
      default:
        setFilteredProducts([...products])
        break
    }
  }, [selectSortBy])

  useEffect(() => {
    if (isError) {
      msgs.current?.clear()
      msgs.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: 'Bir hata oluştu',
        sticky: true
      })
      return
    }
    if (data) {
      setFilteredProducts(data)
      setProducts(data.slice(first, first + rows))
      setResponseData(data)
    }
  }, [isDelProductShow, isError, data])

  useEffect(() => {
    setProducts(filteredProducts.slice(first, first + rows))
  }, [filteredProducts])

  useEffect(() => {
    if (search.length > 2)
      setProducts([...filteredProducts].filter(product => product.name.toLowerCase().includes(search.toLowerCase())))
    else if (search.length === 0) setProducts([...filteredProducts].slice(first, first + rows))
  }, [search, filteredProducts, first, rows])

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first)
    setRows(event.rows)
    setProducts([...filteredProducts].slice(event.first, event.first + event.rows))
  }

  return (
    <div className='gap-x-10 px-14 pt-16'>
      {isPending ? (
        <div className='mx-auto flex w-full'>
          <ProgressSpinner />
        </div>
      ) : (
        <>
          {responseData ? (
            <>
              <div className='grid gap-x-10 md:grid-cols-4'>
                {/* SideBar */}
                {responseData && <SideBar data={responseData} setData={setFilteredProducts} />}
                {/* Shop Product */}
                <div className='col-span-1 row-span-4 md:col-span-3 md:row-span-1'>
                  <div className='flex flex-col items-start justify-between gap-y-2 md:flex-row'>
                    {/* search and sortby */}
                    <div className='flex flex-row flex-wrap items-center gap-x-9 gap-y-4'>
                      <span className='p-input-icon-right'>
                        <InputText placeholder='Ara..' onChange={e => setSearch(e.target.value)} value={search} />
                        <i className='pi pi-search' />
                      </span>

                      {/* show deleted products switch */}
                      <div className='flex gap-4'>
                        <InputSwitch
                          checked={isDelProductShow}
                          onChange={e => setIsDelProductShow(e.value as boolean)}
                        />
                        <span className={isDelProductShow ? 'text-gray-900' : 'text-gray-400'}>
                          Silinen veya stokta olmayan ürünleri göster
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <Dropdown
                        value={selectSortBy.code}
                        onChange={(e: DropdownChangeEvent) => {
                          setSelectSortBy(e.value)
                        }}
                        options={sortBy}
                        optionLabel='name'
                        placeholder={selectSortBy ? selectSortBy.name : 'Sort By'}
                        className='mr-2'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3 '>
                    {products.map(product => (
                      <ProductCard product={product} key={'product-' + product.id} />
                    ))}
                  </div>
                </div>
              </div>

              {/* pagnition */}
              <div className='card'>
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={filteredProducts.length}
                  onPageChange={onPageChange}
                />
              </div>
            </>
          ) : (
            <Messages ref={msgs} className='mx-auto w-full sm:w-3/4 ' />
          )}
        </>
      )}
    </div>
  )
}

export default Shop
