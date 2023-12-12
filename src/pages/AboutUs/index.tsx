import AboutUs from "@/components/aboutUs/aboutUs"
import Navbar from "@/components/Navbar"
import Searchbar from "@/components/Searchbar"
import Topbar from "@/components/Topbar"

const AboutUsPage = () => {
    return (
        <>
            <Topbar />
            <Searchbar />
            <Navbar />
            <AboutUs />            
        </>
    )
}

export default AboutUsPage