import { getProductByUser } from "@/services/product/product.service";
import { IProduct } from "@/shared/types";
import { authSelector } from "@/store/auth";
import to from "await-to-js";
import { AnimatePresence, motion } from "framer-motion";
import { Messages } from "primereact/messages";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import UpdateProduct from "./UpdateProduct";

const UserProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const { token } = useSelector(authSelector);
  const msgs = useRef<Messages>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const [err, data] = await to(getProductByUser(token));
      if (err) {
        msgs.current?.clear();
        msgs.current?.show([
          {
            sticky: true,
            severity: "error",
            summary: "Sistematik Hata",
            detail: err.message,
          },
        ]);
        setLoading(false);
        return;
      }
      setLoading(false);
      setProducts(data.data);
    };

    fetchProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      className="w-full px-[15px]"
    >
      <AnimatePresence>
        {isUpdate && (
          <UpdateProduct
            productUpdateId={updateProductId}
            setIsUpdate={setIsUpdate}
          />
        )}
      </AnimatePresence>
      <h3 className="text-4xl my-4 text-primaryDark">Ürünlerim</h3>
      <Messages ref={msgs} />
      {loading && (
        <>
          <ProgressSpinner className="!w-full text-center" />
          <p className="text-center text-lg">Yükleniyor...</p>
        </>
      )}
      {!loading && products.length === 0 && (
        <>
          <p className="text-center">Henüz ürününüz bulunmamaktadır.</p>
          <Link
            to="/seller"
            className="text-center block text-primaryDark underline"
          >
            Hemen Satış Yap
          </Link>
        </>
      )}
      {!loading && products.length > 0 && (
        <div className="flex flex-col gap-6">
          {products.map((product: IProduct) => (
            <ProductCard
              key={`product-${product.name} - ${product.id}`}
              product={product}
              setUpdateProductId={setUpdateProductId}
              setIsUpdate={setIsUpdate}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default UserProducts;
