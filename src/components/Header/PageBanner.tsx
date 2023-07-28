
type Props = {
    title: string,
    link : string
}

const PageBanner = (props: Props) => {
    return (
        <div className="w-full px-[15px] mx-auto bg-secondary">
            <div className="flex flex-col justify-center min-h-[300px] ">
                <h1 className="text-[2.5rem] font-semibold text-center text-black uppercase">
                    {props.title}
                </h1>
                <div className="inline-flex mx-auto mt-1">
                    <a href="/" className="text-primary">Home</a>
                    <span className="mx-2">/</span>
                    <a href={props.link} className="text-gray-500">{props.title}</a>
                    
                </div>
            </div>
        </div>
    )
}

export default PageBanner