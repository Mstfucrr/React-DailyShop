import { Messages } from 'primereact/messages'
import React from 'react'
import un401 from "@/assets/images/errors/hop.jpg"

type Props = {
    msgs : any
}

const UnAuthorized = ({msgs}: Props) => {
  return (
    <div className="">
    <div className="flex sm:px-20 px-2 flex-col gap-y-20 justify-center items-center py-40 ">
        <a href="/" className=" text-black w-full">
            {/* font-size: calc(1.375rem + 1.5vw); */}
            <h1 className="m-0 text-4xl font-semibold" style={{ fontSize: 'calc(1.375rem + 1.5vw)' }}>
                <span className="text-primary font-bold border px-4 mr-1">D</span>
                ailyShop
            </h1>
        </a>


        <div className="flex gap-x-32 xl:flex-row items-center justify-center flex-col w-full">

            <h1 className="text-9xl">
                401
            </h1>
            <h3 className="text-5xl w-full lg:w-1/2">
                <Messages ref={msgs} className="w-full" />
            </h3>
        </div>
        <img src={un401} alt="" className="w-3/4 max-w-4xl mx-auto" />

    </div>
</div>
  )
}

export default UnAuthorized