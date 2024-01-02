// admin.service.ts
import * as SettingsService from './settings.service'
import * as CategoryService from './category.service'
import * as ProductService from './products.service'
import * as UserService from './user.service'

export const categoryService = { ...CategoryService };

export const settingsService = { ...SettingsService };
export const productService = { ...ProductService };

export const userService = { ...UserService };
