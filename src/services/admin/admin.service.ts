import { fetchSettings, saveSettings } from './settings.service'
import { addCategory, deleteCategoryById, getAllCategories, updateCategoryById } from './category.service'
import { getAllProducts } from './products.service'
import {
    blockUser,
    fetchAddressByUserId,
    fetchPaddingProductByUserId,
    fetchReviewsByUserId,
    fetchUsers,
    updateProductApprovalStatus,
    updateReviewStatus,
    fetchOrdersByUserId
} from './user.service'
import { deleteProduct } from '../product/product.service'

export class AdminService {
    settings: {
        fetchSettings: (token: string) => Promise<any>,
        saveSettings: (input: any, token: string) => Promise<any>
    }

    categories: {
        getAllCategories: () => Promise<any>,
        addCategory: (input: any, token: string) => Promise<any>,
        updateCategoryById: (id: number, input: any, token: string) => Promise<any>,
        deleteCategoryById: (id: number, token: string) => Promise<any>
    }

    products: {
        getAllProducts: (token: string) => Promise<any>,
        deleteProduct: (id: number, token: string) => Promise<any>,
    }

    users: {
        fetchUsers: (token: string) => Promise<any>,
        blockUser: (id: number, token: string) => Promise<any>,
        fetchAddressByUserId: (id: number, token: string) => Promise<any>,
        fetchReviewsByUserId: (id: number, token: string) => Promise<any>,
        fetchPaddingProductByUserId: (id: number, token: string) => Promise<any>,
        updateProductApprovalStatus: (id: number, input: any, token: string) => Promise<any>,
        updateReviewStatus: (id: number, input: any, token: string) => Promise<any>,
        fetchOrdersByUserId: (id: number, token: string) => Promise<any>
    }

    constructor() {
        this.settings = {
            fetchSettings,
            saveSettings
        }
        this.categories = {
            getAllCategories,
            addCategory,
            updateCategoryById,
            deleteCategoryById
        }
        this.products = {
            getAllProducts,
            deleteProduct
        }
        this.users = {
            fetchUsers,
            blockUser,
            fetchAddressByUserId,
            fetchReviewsByUserId,
            fetchPaddingProductByUserId,
            updateProductApprovalStatus,
            updateReviewStatus,
            fetchOrdersByUserId
        }
    }
}

export const categoryService = new AdminService().categories
export const settingsService = new AdminService().settings
export const productService = new AdminService().products
export const userService = new AdminService().users