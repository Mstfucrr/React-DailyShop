import PageBanner from "@/components/Header/PageBanner";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import Shop from "@/components/shop";
import Topbar from "@/components/Topbar";

const index = () => {
  return (
    <>
      <Topbar />
      <Searchbar />
      <Navbar />
      <PageBanner title="Mağaza" link="/shop" />
      <Shop />
    </>
  );
};

export default index;
