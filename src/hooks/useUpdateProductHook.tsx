import { useGetCategories } from '@/services/category/category.service'
import { useGetProductById, useUpdateProduct } from '@/services/product/use-product-service'
import { ICategory, IProduct } from '@/shared/types'
import { convertCategoriesToTreeSelectModel, findCategoryByKeyInTreeSelectModel } from '@/utils/categoryTreeModel'
import { TreeNode } from 'primereact/treenode'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface IUseUpdateProductProps {
  productUpdateId: number | null
  setIsUpdate: (isUpdate: boolean) => void
}

export const useUpdateProductHook = ({ productUpdateId, setIsUpdate }: IUseUpdateProductProps) => {
  const [product, setProduct] = useState<IProduct | null>(null)
  const [productCoverImage, setProductCoverImage] = useState<string | File | null>(null)
  const [productImages, setProductImages] = useState<any[]>([])
  const [treeNodes, setTreeNodes] = useState<TreeNode[] | undefined>(undefined)
  const [selectedCategory, setSelectedCategory] = useState<ICategory>()
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | undefined>(product?.categoryId?.toString())

  const { data: productData, error: productError } = useGetProductById(productUpdateId as number)

  const { data: categoryData, error: categoryError } = useGetCategories()

  const { mutate: updateProduct } = useUpdateProduct()

  const fetchProduct = useCallback(async () => {
    if (productUpdateId == null) return setProduct(null)

    if (productError) {
      toast.error(productError.message)
      setProduct(null)
      setIsUpdate(false)
      return
    }
    if (productData == null) return
    if (productData.image) setProductCoverImage(productData.image)
    setProduct(productData)
    setProductImages(productData.images || [])
    setSelectedNodeKey(productData.category?.id?.toString())
    setSelectedCategory(productData.category)
  }, [productData, productError, productUpdateId, setIsUpdate])

  const getCategories = useCallback(() => {
    if (categoryError) return toast.error(categoryError.message)
    const data = categoryData?.data
    if (data) setTreeNodes(convertCategoriesToTreeSelectModel(data))
  }, [categoryData, categoryError])

  useEffect(() => {
    if (treeNodes && selectedNodeKey)
      setSelectedCategory(findCategoryByKeyInTreeSelectModel(treeNodes, selectedNodeKey))
  }, [selectedCategory, selectedNodeKey, treeNodes])

  useEffect(() => {
    setProduct(null)
    fetchProduct().then(getCategories)
  }, [fetchProduct, productUpdateId, getCategories])

  const handleCoverImage = (e: any) => {
    if (e.target.files == null) return
    setProductCoverImage(e.target.files[0])
  }

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return
    if (e.target.files.length === 0) return
    // aynı dosya varsa hata ver
    for (const file of Array.from(e.target.files)) {
      if (productImages.find(img => img.name === file.name)) {
        toast.error('Aynı dosya zaten ekli')
        return
      }
    }
    const files = Array.from(e.target.files)
    setProductImages([...productImages, ...files])
  }

  const handleRemoveImage = (image: File | string) => {
    if (typeof image === 'string') {
      setProductImages(productImages.filter(img => img !== image))
      return
    }
    setProductImages(productImages.filter(img => img !== image))
  }

  const hanldeSubmit = async (values: any) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('price', values.price)
    formData.append('status', values.status)
    formData.append('stock', values.stock)
    formData.append('categoryId', values.category?.id)
    if (productCoverImage != null) formData.append('BodyImage', productCoverImage)
    if (productImages != null)
      productImages.forEach(img => {
        formData.append(typeof img === 'string' ? 'ProductImages' : 'ProductImagesFile', img)
      })
    values.colors?.forEach((color: string) => formData.append('Colors', color))
    values.sizes?.forEach((size: string) => formData.append('Sizes', size))

    updateProduct(
      { id: productUpdateId as number, input: formData },
      {
        onSuccess: data => {
          toast.success(data.data.message)
          setIsUpdate(false)
        },
        onError: err => toast.error(err.message)
      }
    )
  }

  return {
    product,
    productCoverImage,
    productImages,
    treeNodes,
    selectedNodeKey,
    setSelectedNodeKey,
    setSelectedCategory,
    handleCoverImage,
    handleAddImage,
    handleRemoveImage,
    hanldeSubmit
  }
}
