import { useEffect, useState } from 'react'
import { Slider } from 'primereact/slider'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { IProduct } from '@/shared/types'

const SideBar = ({ data, setData }: { data: IProduct[]; setData: (filteredProducts: IProduct[]) => void }) => {
  const maxProductPrice = data.reduce((max, product) => (product.price > max ? product.price : max), 0)
  const minProductPrice = data.reduce((min, product) => (product.price <= min ? product.price : min), 0)
  const [[min, max], setMinMax] = useState<number[]>([minProductPrice, maxProductPrice])

  const [colors, setColors] = useState<string[]>([])
  const [activeColors, setActiveColors] = useState<string[]>([])

  const toggleActiveColor = (color: string) => {
    if (activeColors.includes(color)) {
      setActiveColors(activeColors.filter(activeColor => activeColor !== color))
    } else {
      setActiveColors([...activeColors, color])
    }
  }

  useEffect(() => {
    const colors = data.map(product => product.colors ?? [])
    const uniqueColors = [...new Set(colors.flat())]
    setColors(uniqueColors)
  }, [data])

  const hanldeFilter = () => {
    const filteredPro = data.filter(product => {
      const isPriceInRange = product.price >= min && product.price <= max
      const isColorIncluded =
        activeColors.length === 0 || activeColors.some(activeColor => product.colors?.includes(activeColor))
      return isPriceInRange && isColorIncluded
    })
    setData(filteredPro)
  }

  return (
    <div className='relative col-span-1 mx-auto flex w-full flex-col gap-y-7'>
      {/* price */}
      <div className='relative mb-4 w-full border-b-2 border-solid pb-4'>
        <h5 className='mb-4 text-3xl font-semibold'>Fiyat Aralığı</h5>
        <div className='my-4 flex w-full flex-col items-center gap-x-3 gap-y-2 md:justify-between lg:flex-row lg:items-end'>
          <div className='flex flex-col items-start'>
            <label htmlFor='minPrice' className=''>
              Min
            </label>
            <InputNumber
              value={min}
              onValueChange={e => setMinMax([e.value as number, max])}
              mode='currency'
              currency='TRY'
              locale='tr-TR'
              max={max - (maxProductPrice - minProductPrice) / 100}
              inputClassName='w-full'
              className=''
            />
          </div>
          <div className='flex flex-col items-start'>
            <label htmlFor='maxPrice' className=''>
              Max
            </label>
            <InputNumber
              value={max}
              onValueChange={e => setMinMax([min, e.value as number])}
              mode='currency'
              currency='TRY'
              locale='tr-TR'
              min={min + (maxProductPrice - minProductPrice) / 100}
              className=''
              inputClassName='w-full'
            />
          </div>
        </div>

        <Slider
          value={[min, max]}
          onChange={e => setMinMax(e.value as number[])}
          range
          min={0}
          max={maxProductPrice}
          step={(maxProductPrice - minProductPrice) / 100}
        />
      </div>
      {/* color */}
      <div className='relative mb-4 border-b-2 border-solid pb-10'>
        <h5 className='mb-4 text-3xl font-semibold'>Renk</h5>
        <div className='flex flex-row flex-wrap gap-7'>
          {colors.map(color => (
            <button
              className={`block h-9 w-12 cursor-pointer rounded-2xl border-2 border-solid
                        ${activeColors.includes(color) && 'border-purple-700 before:absolute before:z-10 before:h-6 before:w-6 before:-translate-x-1/2 before:-translate-y-1/2 before:transform before:rounded-full before:bg-purple-900 before:bg-opacity-30 before:text-white before:content-["✓"]'}`}
              style={{ backgroundColor: color }}
              key={'color-' + color}
              onClick={() => toggleActiveColor(color)}
            ></button>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-between gap-7 pt-4 lg:p-5'>
        <Button
          label='reset'
          icon='pi pi-times'
          className='min-w-min'
          onClick={() => {
            setActiveColors([])
            setMinMax([minProductPrice, maxProductPrice])
          }}
        />

        <Button
          icon='pi pi-check'
          className='absolute bottom-0 left-0 w-full
                        !border-none !bg-primaryDark !shadow-none
                        !outline-none transition duration-500 ease-in-out hover:!bg-primary'
          label='Filtrele'
          onClick={hanldeFilter}
        />
      </div>

      {/* size */}
      <div className=''></div>
    </div>
  )
}

export default SideBar
