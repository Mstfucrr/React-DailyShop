import AboutUs from "@/components/aboutUs/aboutUs";
import PageBanner from "@/components/Header/PageBanner";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import Topbar from "@/components/Topbar";

const AboutUsPage = () => {
  return (
    <>
      <Topbar />
      <Searchbar />
      <Navbar />
      <PageBanner title="Hakkımızda" link={"/about"} />
      <AboutUs />
    </>
  );
};

export default AboutUsPage;
