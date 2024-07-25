'use client'
import AboutUs from '@/components/aboutUs/aboutUs'
import PageBanner from '@/components/Header/PageBanner'

const AboutUsPage = () => {
  return (
    <>
      <PageBanner title='Hakkımızda' link={'/about'} />
      <AboutUs />
    </>
  )
}

export default AboutUsPage
