import React from 'react'
import { ICategory } from '@/shared/types'
import NavbarLink from '../navbarLink'

interface CategoryTreeProps {
  category: ICategory
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ category }) => {
  return (
    <div key={'category-' + category.id}>
      <NavbarLink href={`/shop/${category.id}`} className='px-[30px] py-[8px]'>
        {category.name}
      </NavbarLink>
      {category.subCategories && category.subCategories.length > 0 && (
        <div className='pl-[20px]'>
          {category.subCategories.map(subcategory => (
            <CategoryTree key={subcategory.id} category={subcategory} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryTree
