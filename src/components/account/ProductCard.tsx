import { IProduct } from "@/shared/types"
import { Button } from "primereact/button"
import { Card } from "primereact/card"

type Props = {
    product: IProduct,
    setUpdateProductId: (updateProductId: number | null) => void
}

const ProductCard = ({ product, setUpdateProductId }: Props) => {

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
                <p
                    className={`${product.isApproved == null
                        ? "text-yellow-400"
                        : product.isApproved == true
                            ? "text-green-400"
                            : "text-red-400"}`}>
                    {product.isApproved == null ? "Onay Bekliyor" : product.isApproved ? "Onaylandı" : "Onaylanmadı"}</p>
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