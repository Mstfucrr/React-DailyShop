import { InputText } from 'primereact/inputtext'
import SideBar from './sideBar'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { IProduct, IShopResponse } from '@/shared/types';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { getProductsByCategoryId } from '@/services/shop/shop.service';
import { useParams } from 'react-router-dom';
import { InputSwitch } from "primereact/inputswitch";
import to from 'await-to-js';
import { Messages } from 'primereact/messages';

const Shop = () => {

  const [selectSortBy, setSelectSortBy] = useState<string>('')
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [responseData, setResponseData] = useState<IShopResponse | undefined>(undefined)
  const [products, setProducts] = useState<IProduct[]>([]); // tüm ürünlerin listesi
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6)
  const [isDelProductShow, setIsDelProductShow] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const msgs = useRef<Messages>(null);

  const sortBy = [
    { name: 'Newest', code: 'newest' },
    { name: 'Price (low to high)', code: 'priceLowToHigh' },
    { name: 'Price (high to low)', code: 'priceHighToLow' },
    { name: 'Name (A - Z)', code: 'nameAZ' },
    { name: 'Name (Z - A)', code: 'nameZA' },
    { name: 'Top Rated', code: 'topRated' },
    { name: "Review", code: 'review' }
  ]

  useEffect(() => {


    switch (selectSortBy) {
      case 'newest':
        setFilteredProducts([...filteredProducts].sort((a, b) => b.id - a.id))
        break;
      case 'priceLowToHigh':
        setFilteredProducts([...filteredProducts].sort((a, b) => a.price - b.price))
        break;
      case 'priceHighToLow':
        setFilteredProducts([...filteredProducts].sort((a, b) => b.price - a.price))
        break;
      case 'nameAZ':
        setFilteredProducts([...filteredProducts].sort((a, b) => a.name.localeCompare(b.name)))
        break;
      case 'nameZA':
        setFilteredProducts([...filteredProducts].sort((a, b) => b.name.localeCompare(a.name)))
        break;
      case 'topRated':
        setFilteredProducts([...filteredProducts].sort((a, b) => b.rating - a.rating))
        break;
      case 'review':
        setFilteredProducts([...filteredProducts].sort((a, b) => b.reviews.length - a.reviews.length))
        break;
      default:
        setFilteredProducts([...products])
        break;
    }

  }, [selectSortBy])

  const fetchData = async () => {

    if (id) {
      const [err, data] = await to(getProductsByCategoryId(parseInt(id), isDelProductShow))
      if (err) {
        const res = err as any
        const errorMessage = res?.response?.data?.message || err.message;
        msgs.current?.clear()
        msgs.current?.show({
          severity: 'error',
          summary: 'Hata',
          detail: errorMessage,
          sticky: true
        })
        return
      }
      setFilteredProducts(data.data);
      setProducts(data.data.slice(first, first + rows))
      setResponseData(data)
    }

  };
  useEffect(() => {
    fetchData(); // async işlemi başlat
  }, [isDelProductShow])

  // gelen datalar pagnition ile listelencek

  useEffect(() => {
    setProducts(filteredProducts.slice(first, first + rows))
  }, [filteredProducts])

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    setProducts([...filteredProducts].slice(event.first, event.first + event.rows))
  };




  return (
    <div className='pt-16 px-14 gap-x-10'>
      {responseData?.data ?
        <>
          <div className="grid md:grid-cols-4 gap-x-10">
            {/* SideBar */}
            {responseData?.data &&
              <SideBar data={responseData.data} setData={setFilteredProducts} />
            }
            {/* Shop Product */}
            <div className="row-span-4 md:row-span-1 md:col-span-3 col-span-1">
              <div className="flex md:flex-row flex-col justify-between items-start gap-y-2">
                {/* search and sortby */}
                <div className="flex flex-row flex-wrap items-center gap-x-9 gap-y-4">

                  <span className="p-input-icon-right">
                    <i className="pi pi-search" />
                    <InputText placeholder="Search" />
                  </span>
                  {/* show deleted products switch */}
                  <div className="flex gap-4">

                    <InputSwitch
                      checked={isDelProductShow}
                      onChange={(e) => setIsDelProductShow(e.value as boolean)}

                    />
                    <span className={isDelProductShow ? "text-gray-900" : "text-gray-400"}>Show Deleted Products</span>
                  </div>

                </div>


                <div className="flex items-center">
                  <Dropdown value={selectSortBy}
                    onChange={(e: DropdownChangeEvent) => {
                      setSelectSortBy(e.value.code)
                      console.log(e.value.code)
                    }
                    }
                    options={sortBy} optionLabel="name"
                    placeholder={selectSortBy ? selectSortBy : "Sort By"}
                    className="mr-2" />
                </div>
              </div>

              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 py-10 ">
                {products.map((product) => (
                  <div className="flex pb-4 w-full" key={product.id}>
                    <Card
                      className="w-full"
                      header={
                        <div className="relative">
                          <div className="border border-gray-200 rounded-md overflow-hidden">
                            <img
                              src={product.image?.toString()}
                              alt={product.name}
                              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-125"
                            />
                          </div>
                          <div className="absolute top-0 left-0 w-full h-full border -z-10 border-gray-200 opacity-0 transition-opacity duration-500 hover:opacity-100"></div>
                        </div>

                      }
                      footer={
                        <div className="flex justify-between flex-col">
                          <div className="flex flex-col">
                            <h6 className="text-truncate mb-3 font-bold text-center pt-3">{product.name}</h6>
                            <div className="flex justify-center py-2">
                              <h6> <b>${product.price}</b></h6><h6 className="text-muted ml-2"><del>${product.price}</del></h6>
                            </div>

                          </div>
                          <div className="flex flex-row justify-between border-t-[1px] pt-2">
                            <a href="" className="flex items-center"><FaEye className='text-primary mr-2' />View Detail</a>
                            <a href="" className="flex items-center"><FaShoppingCart className='text-primary mr-2' />Add To Cart</a>

                          </div>

                        </div>
                      }
                    >
                    </Card>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* pagnition */}
          <div className="card">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={
                filteredProducts.length
              }
              onPageChange={onPageChange} />
          </div>
        </>
        : <Messages ref={msgs} className="sm:w-3/4 w-full mx-auto " />
      }
    </div>
  )
}

export default Shop