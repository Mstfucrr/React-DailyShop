import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { TreeSelect, TreeSelectChangeEvent } from 'primereact/treeselect';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { categories, Category, convertCategoriesToTreeSelectModel, findCategoryByKeyInTreeSelectModel } from '../shop/example.products';
import { TreeNode } from "primereact/treenode";
import { MultiSelect } from 'primereact/multiselect';
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from 'primereact/button';

type Props = {}

const ProductInfo = (props: Props) => {


    /*
        ------ Eklenecek ürünün bilgileri ------
        Kategori seçimi (TreeSelect)
        Ürün adı (input)
        Fiyatı (input) (number) ve yanında TL ve fiyat önerisi var ise yanında yazılacak
        image ve images diğer componentte
        açıklama (text editör) 
        renkler (dropdown) (multiple)
        bedenler (dropdown) (multiple)
        Tarih (date) (otomatik)
        bilgiler: {
            durum (dropdown)
            stok (number)
        }
        

    
    */

    const exampleCategories = categories

    const [TreeNodes, setTreeNodes] = useState<TreeNode[] | undefined>(undefined)
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [selectedStatus, setSelectedStatus] = useState<string>("Yeni")
    const [stock, setStock] = useState<number>(0)
    const [description, setDescription] = useState<string>('')



    const colorTemplete = (option: any) => {
        return (
            <div className="flex align-items-center">
                <div className="w-6 h-5 rounded-lg mr-2" style={{ backgroundColor: option.value }}></div>
                <div>{option.label}</div>
            </div>
        );
    };


    useEffect(() => {
        setTreeNodes(
            convertCategoriesToTreeSelectModel(exampleCategories)
        );
    }, [])

    useEffect(() => {
        if (TreeNodes && selectedNodeKey) {
            setSelectedCategory(findCategoryByKeyInTreeSelectModel(TreeNodes, selectedNodeKey))
            console.log("selectedCategory: ", selectedCategory);
        }
    }, [selectedCategory, selectedNodeKey]);

    return (
        <>
            <div className="flex h-auto flex-col gap-y-7">
                <h2 className="text-4xl font-semibold mb-5">Ürün Bilgileri</h2>
                <form className="flex flex-col gap-y-4" >

                    {/* category */}
                    <span className="p-float-label">
                        <TreeSelect id='ts-category' name='ts-category'
                            className='w-full md:w-56'
                            value={selectedNodeKey} options={TreeNodes}
                            onChange={(e: TreeSelectChangeEvent) => setSelectedNodeKey(e.value as any)}
                            filter

                        />
                        <label htmlFor="ts-category">
                            Bir Kategori Seç
                        </label>
                    </span>

                    {/* product name and pierce */}
                    <div className="flex flex-row flex-wrap gap-5 w-full">

                        <div className="w-full md:w-1/2">
                            <label htmlFor="in-product-name" className="font-bold block mb-2">Ürün Adı</label>
                            <InputText id="in-product-name" name="in-product-name" className="w-full " />
                        </div>
                        <div className="w-full md:w-1/2 flex gap-x-3 flex-col">
                            <label htmlFor="in-product-price" className="font-bold block mb-2">Fiyatı</label>
                            <InputNumber id="in-product-price" name="in-product-price" className="w-full mb-3 "
                                mode="currency" currency="TRY" locale="de-DE" minFractionDigits={2} />

                            {/* fiyat önerisi getir */}
                            <div className="flex items-center gap-x-2 flex-row flex-wrap">

                                <Button label="Fiyat Önerisi Al" className="w-44 !text-sm" type='button' />
                                <span>
                                    Önerisi : 4527.24,21 ₺
                                </span>
                            </div>
                        </div>


                    </div>

                    {/* colors and sizes (multi) */}
                    <div className="flex flex-row flex-wrap gap-x-5 w-full">
                        <div className="w-full md:w-1/3">
                            <label htmlFor="dd-colors" className="font-bold block mb-2">Renkler</label>
                            <MultiSelect id="dd-colors" name="dd-colors" className="w-full " multiple
                                options={[
                                    { label: 'Mavi', value: 'blue' },
                                    { label: 'Kırmızı', value: 'red' },
                                    { label: 'Sarı', value: 'yellow' },
                                    { label: 'Yeşil', value: 'green' },
                                    { label: 'Mor', value: 'purple' },
                                    { label: 'Turuncu', value: 'orange' },
                                    { label: 'Beyaz', value: 'white' },
                                    { label: 'Siyah', value: 'black' },
                                ]}
                                value={selectedColors}
                                onChange={(e: DropdownChangeEvent) => setSelectedColors(e.value as any)}
                                itemTemplate={colorTemplete}

                            />
                        </div>
                        <div className="w-full md:w-1/3">
                            <label htmlFor="dd-sizes" className="font-bold block mb-2">Bedenler</label>
                            <MultiSelect id="dd-sizes" name="dd-sizes" className="w-full " multiple
                                options={[
                                    { label: 'XS', value: 'xs' },
                                    { label: 'S', value: 's' },
                                    { label: 'M', value: 'm' },
                                    { label: 'L', value: 'l' },
                                    { label: 'XL', value: 'xl' },
                                    { label: '2XL', value: '2xl' },
                                    { label: '3XL', value: '3xl' }
                                ]}
                                value={selectedSizes}
                                onChange={(e: DropdownChangeEvent) => setSelectedSizes(e.value as any)}
                            />

                        </div>

                    </div>

                    {/* bilgiler ( durum, stok adet) */}
                    <div className="flex flex-row flex-wrap gap-x-5 w-full">
                        <div className="w-full md:w-1/3">
                            <label htmlFor="dd-status" className="font-bold block mb-2">Durum</label>
                            <Dropdown id="dd-status" name="dd-status" className="w-full "
                                options={[
                                    { label: 'Yeni', value: 'new' },
                                    { label: 'İkinci El', value: 'second-hand' },
                                    { label: 'Yenilenmiş', value: 'renewed' },
                                    { label: 'Kullanılmış', value: 'used' },
                                    { label: 'Kötü', value: 'bad' },
                                ]}
                                value={selectedStatus}
                                onChange={(e: DropdownChangeEvent) => setSelectedStatus(e.value as any)}
                            />
                        </div>

                        <div className="w-full md:w-1/3">
                            <label htmlFor="in-stock" className="font-bold block mb-2">Stok Adedi</label>
                            <InputNumber id="in-stock" name="in-stock" className="w-full " value={stock}
                                onValueChange={(e) => setStock(e.value as any)} />
                        </div>
                    </div>

                    {/* description */}
                    <div className="flex w-full mt-5 ">
                        <div className="w-full card mx-auto">
                            <label htmlFor="ed-description" className="font-bold block mb-2">Açıklama</label>
                            <Editor value={description} onTextChange={(e: EditorTextChangeEvent) => setDescription(e.htmlValue as any)}
                                style={{ height: '300px' }}
                                id="ed-description" name="ed-description"

                            />
                        </div>
                    </div>

                    {/* SUBMİT */}

                    <Button className='!bg-primary !border-primary text-white mt-5
                        hover:!bg-primaryDark w-1/2
                    ' label='Kaydet' type='submit' />


                </form>

            </div>

        </>
    )
}

/*
 for text editör showing 

<div className="ql-snow">
    <div className="ql-editor">
        <ol>Test</ol>
    </div>
</div>

*/

export default ProductInfo