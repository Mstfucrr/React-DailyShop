import { InputText } from 'primereact/inputtext'
import { products } from './example.products'
import SideBar from './sideBar'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useState } from 'react';
import { Card } from 'primereact/card';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { IProduct } from '@/shared/types';

const Shop = () => {

  const [selectSortBy, setSelectSortBy] = useState<string>('')
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products)

  const sortBy = [
    { name: 'Newest', code: 'newest' },
    { name: 'Price (low to high)', code: 'priceLowToHigh' },
    { name: 'Price (high to low)', code: 'priceHighToLow' },
    { name: 'Name (A - Z)', code: 'nameAZ' },
    { name: 'Name (Z - A)', code: 'nameZA' },
  ]



  return (
    <div className='pt-16 px-14 gap-x-10'>
      <div className="grid md:grid-cols-4 gap-x-10">

        {/* is above md : Side Bar */}
        <SideBar filteredProducts={products} setFilteredProducts = {setFilteredProducts} />

        {/* is below md : buttom bar */}



        {/* Shop Product */}
        <div className="row-span-4 md:row-span-1 md:col-span-3 col-span-1">
          <div className="flex md:flex-row flex-col justify-between items-start gap-y-2">
            {/* search and sortby */}
            <span className="p-input-icon-right">
              <i className="pi pi-search" />
              <InputText placeholder="Search" />
            </span>

            <div className="flex items-center">
              <Dropdown value={selectSortBy}
                onChange={(e: DropdownChangeEvent) => setSelectSortBy(e.value)}
                options={sortBy} optionLabel="name" placeholder="Sort By" className="mr-2" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 py-10 ">
            {filteredProducts.map((product) => (
              <div className="flex pb-4 w-full" key={product.id}>
                <Card
                  className="w-full"
                  header={
                    <div className='relative'>

                      <img src={product.image} alt={product.name} className="w-full h-auto object-cover
                    transition-all hover: 
                    " />
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
    </div>
  )
}

export default Shop