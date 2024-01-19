import PageBanner from "@/components/Header/PageBanner";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import Seller from "@/components/Seller/Seller";
import Topbar from "@/components/Topbar";

const SellerPage = () => {
  return (
    <>
      <Topbar />
      <Searchbar />
      <Navbar />
      <PageBanner title="Satış Yap" link="/seller" />
      <Seller />
    </>
  );
};

export default SellerPage;
