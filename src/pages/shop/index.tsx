import PageBanner from '@/components/Header/PageBanner'
import Navbar from '@/components/Navbar'
import Topbar from '@/components/Topbar'
import React from 'react'

type Props = {}

const index = (props: Props) => {
    return (
        <>
            <Topbar />
            <Navbar />
            <PageBanner title="Shop" link="/shop" />
        </>
    )
}

export default index