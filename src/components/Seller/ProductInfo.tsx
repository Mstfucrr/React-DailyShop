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
import * as Yup from 'yup'
import { useFormik } from 'formik'

type Props = {
    setProductInfo: React.Dispatch<React.SetStateAction<{
        name: string;
        price: number;
        stock: number;
        description: string;
        status: string;
        categoryId: number;
        colors: string[];
    }>>

}

const ProductInfo = (
    props: Props
) => {

    const exampleCategories = categories

    const [TreeNodes, setTreeNodes] = useState<TreeNode[] | undefined>(undefined)
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])

    const validationSchema = Yup.object().shape({
        productName: Yup.string()
            .required('Ürün adı gereklidir')
            .min(3, 'Ürün adı çok kısa')
            .max(50, 'Ürün adı çok uzun'),
        price: Yup.number()
            .required('Fiyat gereklidir')
            .min(2, 'Fiyat 2 dan küçük olamaz'),
        stock: Yup.number()
            .required('Stok gereklidir')
            .min(0, 'Stok 0 dan küçük olamaz'),
        description: Yup.string()
            .required('Açıklama gereklidir')
            .min(40, 'Açıklama çok kısa')
            .max(1000, 'Açıklama çok uzun'),
        status: Yup.string()
            .required('Durum gereklidir'),

    })

    const formik = useFormik({
        initialValues: {
            productName: '',
            price: 0,
            stock: 0,
            description: '',
            status: '',
            category: '',
        },
        validationSchema: validationSchema,
        validate: (data) => {
            let errors = {}
            if (!data.category) {
                errors = { ...errors, category: 'Kategori seçiniz' }
            }
            return errors
        },
        onSubmit: async (values) => {

            props.setProductInfo(
                {
                    categoryId: selectedCategory?.id!,
                    colors: selectedColors,
                    description: values.description,
                    name: values.productName,
                    price: values.price,
                    status: values.status,
                    stock: values.stock
                }
            )

        }
    })


    const colorTemplete = (option: any) => {
        return (
            <div className="flex align-items-center">
                <div className="w-6 h-5 rounded-lg mr-2" style={{ backgroundColor: option.value }}></div>
                <div>{option.label}</div>
            </div>
        );
    };


    useEffect(() => {
        setTreeNodes(convertCategoriesToTreeSelectModel(exampleCategories));
    }, [])

    useEffect(() => {
        if (TreeNodes && selectedNodeKey)
            setSelectedCategory(findCategoryByKeyInTreeSelectModel(TreeNodes, selectedNodeKey))
    }, [selectedCategory, selectedNodeKey]);


    const showFormErrorMessage = (err: string) => {
        return <small className="p-error block h-0 mb-6"> {err} </small>;
    };


    return (
        <>
            <div className="flex h-auto flex-col gap-y-7">
                <h2 className="text-4xl font-semibold mb-5">Ürün Bilgileri</h2>
                <form className="flex flex-col gap-y-4"
                    onSubmit={formik.handleSubmit}
                >

                    {/* category */}
                    <span className="p-float-label">
                        <TreeSelect id='ts-category' name='ts-category'
                            className={`w-full md:w-56 ${formik.touched.category && formik.errors.category ? 'p-invalid' : ''}`}
                            value={formik.values.category}
                            options={TreeNodes}
                            onChange={(e: TreeSelectChangeEvent) => {
                                formik.setFieldValue('category', e.value);
                                setSelectedNodeKey(e.value as string)
                            }}
                            filter


                        />
                        <label htmlFor="ts-category">
                            Bir Kategori Seç
                        </label>

                        {formik.touched.category &&
                            showFormErrorMessage(formik.errors.category!)
                        }

                    </span>


                    {/* product name and pierce */}
                    <div className="flex flex-row flex-wrap gap-5 w-full">

                        <div className="w-full md:w-1/2">
                            <label htmlFor="in-product-name" className="font-bold block mb-2">Ürün Adı</label>
                            <InputText id="in-product-name" name="in-product-name"
                                className={`w-full ${formik.touched.productName && formik.errors.productName ? 'p-invalid' : ''}`}
                                value={formik.values.productName}
                                onChange={(e) => formik.setFieldValue('productName', e.target.value)}
                            />
                            {formik.touched.productName &&
                                showFormErrorMessage(formik.errors.productName!)
                            }


                        </div>
                        <div className="w-full md:w-1/2 flex gap-x-3 flex-col">
                            <label htmlFor="in-product-price" className="font-bold block mb-2">Fiyatı</label>
                            <InputNumber id="in-product-price" name="in-product-price"
                                mode="currency" currency="TRY" locale="de-DE" minFractionDigits={2}
                                className={`w-full mb-2 ${formik.touched.price && formik.errors.price ? 'p-invalid' : ''}`}
                                onChange={(e) => formik.setFieldValue('price', e.value as any)}
                                value={formik.values.price}
                            />
                            {formik.touched.price &&
                                showFormErrorMessage(formik.errors.price!)
                            }

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
                            <Dropdown id="dd-status" name="dd-status"
                                options={[
                                    { label: 'Yeni', value: 'new' },
                                    { label: 'İkinci El', value: 'second-hand' },
                                    { label: 'Yenilenmiş', value: 'renewed' },
                                    { label: 'Kullanılmış', value: 'used' },
                                    { label: 'Kötü', value: 'bad' },
                                ]}
                                onChange={(e: DropdownChangeEvent) => {
                                    formik.setFieldValue('status', e.value as any);
                                }}
                                value={formik.values.status}
                                className={`w-full ${formik.touched.status && formik.errors.status ? 'p-invalid' : ''}`}
                            />

                            {formik.touched.status &&
                                showFormErrorMessage(formik.errors.status!)
                            }

                        </div>

                        <div className="w-full md:w-1/3">
                            <label htmlFor="in-stock" className="font-bold block mb-2">Stok Adedi</label>
                            <InputNumber id="in-stock" name="in-stock" min={1}
                                onChange={(e) => formik.setFieldValue('stock', e.value as any)}
                                className={`w-full ${formik.touched.stock && formik.errors.stock ? 'p-invalid' : ''}`}
                                value={formik.values.stock}
                            />
                        </div>
                    </div>

                    {/* description */}
                    <div className="flex w-full mt-5 ">
                        <div className="w-full card mx-auto">
                            <label htmlFor="ed-description" className="font-bold block mb-2">Açıklama</label>
                            <Editor value={formik.values.description}
                                onTextChange={(e: EditorTextChangeEvent) => formik.setFieldValue('description', e.htmlValue as any)}
                                style={{ height: '300px' }}
                                id="ed-description" name="ed-description"
                                className={`w-full ${formik.touched.description && formik.errors.description ? 'border-red-500 border' : ''}`}
                            />

                            {formik.touched.description &&
                                showFormErrorMessage(formik.errors.description!)
                            }

                        </div>
                    </div>

                    {/* SUBMİT */}

                    <Button className='!bg-primary !border-primary text-white !mt-7
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