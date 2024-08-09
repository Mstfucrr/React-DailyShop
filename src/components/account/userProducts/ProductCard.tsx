import { useDeleteProduct } from '@/services/product/use-product-service'
import { IProduct } from '@/shared/types'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

type Props = {
  product: IProduct
  setUpdateProductId: (updateProductId: number | null) => void
  setIsUpdate: (isUpdate: boolean) => void
}

const IsApprovedRender = ({ product }: { product: IProduct }) => {
  if (product.isApproved == null) return <p className='text-yellow-400'>Onay Bekliyor</p>
  else if (product.isApproved)
    return (
      <div className='flex h-auto flex-row flex-wrap items-center gap-7'>
        <p className='text-green-400'>Onaylandı</p>
        <Link href={`/product/${product.id}`} target='_blank'>
          <Button label='Ürünü Görüntüle' className='w-56' rounded severity='help' icon='pi pi-eye'>
            {/* yeni sayfada ürünü göster */}
          </Button>
        </Link>
      </div>
    )
  else return <p className='text-red-400'>Onaylanmadı</p>
}

const ProductCard = ({ product, setUpdateProductId, setIsUpdate }: Props) => {
  const { mutate: deleteProduct } = useDeleteProduct()

  const handleUpdate = useCallback(() => {
    setUpdateProductId(product?.id)
    setIsUpdate(true)
  }, [product, setUpdateProductId, setIsUpdate])

  const handleDetleteProduct = async (id: number) => {
    deleteProduct(id, {
      onSuccess: () => {
        toast.success('Ürün başarıyla silindi')
        setTimeout(() => window.location.reload(), 2500)
      },
      onError: err => toast.error(err.message)
    })
  }

  const confirmDelete = (event: any, id: number) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Silmek istediğinize emin misiniz?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleDetleteProduct(id),
      reject: () => {},
      acceptLabel: 'Sil',
      rejectLabel: 'Hayır',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'pi pi-times',
      acceptClassName: 'p-button-danger'
    })
  }

  return (
    <Card
      title={
        <div className='flex flex-row flex-wrap justify-between gap-7'>
          <h3 className='text-2xl'>{product.name}</h3>
          <div className='flex flex-row gap-4'>
            <Button label='Düzenle' rounded severity='warning' icon='pi pi-pencil' onClick={handleUpdate} />
            <ConfirmPopup />
            <Button
              label='Sil'
              rounded
              severity='danger'
              icon='pi pi-trash'
              onClick={e => confirmDelete(e, product.id)}
            />
          </div>
        </div>
      }
      subTitle={product.price + ' ₺'}
      className='max-h-[500px] w-full overflow-y-auto'
    >
      <div className='my-4 flex flex-col gap-1'>
        <IsApprovedRender product={product} />
        <p className='text-primaryDark'>Stok: {product.stock}</p>
      </div>

      <div className='flex w-full flex-col items-start gap-6'>
        <img src={product.image} alt={product.image} className='h-auto w-[350px] object-contain' />

        <div className='ql-editor' dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </Card>
  )
}

export default ProductCard
