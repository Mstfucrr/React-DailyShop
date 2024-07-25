// admin.service.ts
import * as SettingsService from './settings.service'
import * as CategoryService from './category/category.service'
import * as ProductService from './product/products.service'
import * as UserService from './user/user.service'

export const categoryService = { ...CategoryService }

export const settingsService = { ...SettingsService }
export const productService = { ...ProductService }

export const userService = { ...UserService }
