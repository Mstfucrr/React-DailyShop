import PageBanner from "@/components/Header/PageBanner";
import Navbar from "@/components/Navbar";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import Searchbar from "@/components/Searchbar";
import Topbar from "@/components/Topbar";

const ProductDetailPage = () => {
  return (
    <>
      <Topbar />
      <Searchbar />
      <Navbar />
      <PageBanner title="Ürün Detayı" link="/productDetail" />
      <ProductDetail />
    </>
  );
};

export default ProductDetailPage;
