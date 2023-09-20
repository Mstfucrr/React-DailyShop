import { useEffect, useState } from "react"
import { Slider } from "primereact/slider";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { IProduct } from "@/shared/types";

const SideBar = (
    {filteredProducts,setFilteredProducts} : {filteredProducts : IProduct[],setFilteredProducts : (
        filteredProducts : IProduct[]
    ) => void} 
) => {

    const maxProductPrice = filteredProducts.reduce((max, product) => product.price > max ? product.price : max, 0) as number
    const minProductPrice = filteredProducts.reduce((min, product) => product.price <= min ? product.price : min, 0) as number
    const [[min, max], setMinMax] = useState<number[]>([minProductPrice, maxProductPrice])

    const [colors, setColors] = useState<string[]>([])
    const [activeColors, setActiveColors] = useState<string[]>([])


    const toggleActiveColor = (color: string) => {
        if (activeColors.includes(color)) {
            setActiveColors(activeColors.filter((activeColor) => activeColor !== color))
        } else {
            setActiveColors([...activeColors, color])
        }
    }

    useEffect(() => {
        const colors = filteredProducts.map((product) => product.colors)
        const uniqueColors = [...new Set(colors.flat())]
        setColors(uniqueColors)
    }, [])

    const hanldeFilter = () => {
        const filteredPro = filteredProducts.filter((product) => {
            const isPriceInRange = product.price >= min && product.price <= max
            const isColorIncluded = activeColors.length === 0 || activeColors.some((activeColor) => product.colors.includes(activeColor))

            return isPriceInRange && isColorIncluded
        })
        setFilteredProducts(filteredPro)
        console.log(filteredPro)
    }

    return (
        <div className="col-span-1 flex flex-col gap-y-7 w-full mx-auto relative">
            {/* price */}
            <div className="border-b-2 border-solid mb-4 pb-4 relative w-full">
                <h5 className="font-semibold mb-4 text-3xl">Fiyat Aralığı</h5>
                <div className="flex lg:flex-row flex-col md:justify-between lg:items-end items-center w-full my-4 gap-y-2 gap-x-3">
                    <div className="flex flex-col items-start">

                        <label htmlFor="minPrice" className="">Min</label>
                        <InputNumber value={min} onValueChange={(e) => setMinMax([e.value as number, max])}
                            mode="currency" currency="TRY" locale="tr-TR"
                            max={max - (maxProductPrice - minProductPrice) / 100}
                            inputClassName="w-full"
                            className=""
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="maxPrice" className="">Max</label>
                        <InputNumber value={max} onValueChange={(e) => setMinMax([min, e.value as number])}
                            mode="currency" currency="TRY" locale="tr-TR"
                            min={min + (maxProductPrice - minProductPrice) / 100}
                            className="" inputClassName="w-full"
                        />
                    </div>
                    <Button icon="pi pi-check" className="min-w-[45px]"
                        onClick={hanldeFilter}
                    />

                </div>

                <Slider value={[min, max]} onChange={
                    (e) => setMinMax(e.value as number[])
                } range min={0} max={maxProductPrice} step={(maxProductPrice - minProductPrice) / 100} />

            </div>
            {/* color */}
            <div className="borde-b-2 border-solid mb-4 pb-4 relative">
                <h5 className="font-semibold mb-4 text-3xl">Renk</h5>
                <div className="flex flex-row flex-wrap gap-7">
                    {colors.map((color) => (
                        <button className={`w-12 h-9 rounded-2xl border-2 border-solid block cursor-pointer
                        ${activeColors.includes(color) && 'border-purple-700 before:content-["✓"] before:absolute before:text-white before:bg-opacity-30 before:rounded-full before:bg-purple-900 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-6 before:h-6 before:z-10'}
                            
                        `}
                            style={{ backgroundColor: color }}
                            key={color}
                            onClick={() => toggleActiveColor(color)}
                        ></button>
                    ))}

                </div>
                <div className="flex items-center lg:justify-around justify-between lg:p-5 pt-4">

                    <Button label="reset" icon="pi pi-times" className="w-auto" onClick={() => setActiveColors([])} />
                    <Button icon="pi pi-check" className="min-w-min"
                        onClick={hanldeFilter}
                    />
                </div>
            </div>

            {/* size */}
            <div className=""></div>
        </div>
    )
}

export default SideBar  