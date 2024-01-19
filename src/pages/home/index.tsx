import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import Topbar from "@/components/Topbar";
import HomeComponent from "@/components/home";

const index = () => {
  return (
    <>
      <Topbar />
      <Searchbar />
      <Navbar />
      <HomeComponent />
    </>
  );
};

export default index;
