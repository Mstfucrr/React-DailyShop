import { IProduct } from "@/shared/types"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { useCallback } from "react"
import { Link } from "react-router-dom"

type Props = {
    product: IProduct,
    setUpdateProductId: (updateProductId: number | null) => void
}

const ProductCard = ({ product, setUpdateProductId }: Props) => {

    const isApprovedRender = useCallback(() => {
        if (product.isApproved == null)
            return <p className="text-yellow-400">Onay Bekliyor</p>
        else if (product.isApproved)
            return <div className="flex flex-row flex-wrap gap-7 items-center h-auto">
                <p className="text-green-400">Onaylandı</p>
                <Link to={`/product/${product.id}`} target="_blank">
                    <Button label="Ürünü Görüntüle" className="w-56" rounded
                        severity="help"
                        icon="pi pi-eye"
                    >
                        {/* yeni sayfada ürünü göster */}


                    </Button>
                </Link>
            </div>
        else
            return <p className="text-red-400">Onaylanmadı</p>

    }, [product.isApproved])


    return (
        <Card
            title={
                <div className="flex flex-row justify-between gap-7 flex-wrap">
                    <h3 className="text-2xl">{product.name}</h3>
                    <div className="flex flex-row gap-4">
                        <Button label="Düzenle" rounded severity="warning" icon="pi pi-pencil"
                            onClick={() => setUpdateProductId(product?.id)}
                        />
                        <Button label="Sil" rounded severity="danger" icon="pi pi-trash" />
                    </div>
                </div>
            }
            subTitle={product.price + " ₺"}
            className="w-full max-h-[500px] overflow-y-auto"

        >
            <div className="flex flex-col gap-1 my-4">
                {isApprovedRender()}
                <p className="text-primaryDark">Stok: {product.stock}</p>
            </div>

            <div className="flex w-full flex-col gap-6 items-start">
                <img src={product.image} alt={product.image} className="w-[350px] h-auto object-contain" />


                <div className="ql-editor"
                    dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>


        </Card>

    )
}

export default ProductCard