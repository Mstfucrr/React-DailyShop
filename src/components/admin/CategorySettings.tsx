import adminService from '@/services/admin/admin.service'
import { ICategory } from '@/shared/types'
import { authSelector } from '@/store/auth'
import to from 'await-to-js'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { TreeSelect } from 'primereact/treeselect'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findCategoryByKeyInTreeSelectModel, convertCategoriesToTreeSelectModel, categoriesEx } from '../shop/example.products'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { IToast } from '@/store/Toast/type'
import { SET_TOAST } from '@/store/Toast'
import { Tree } from 'primereact/tree';

const CategorySettings = () => {

    const [TreeNodes, setTreeNodes] = useState<any>(null)
    const [selectedNodeKey, setSelectedNodeKey] = useState<any>(null)
    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined)
    const [loading, setLoading] = useState(true);
    const [updateCategoryActive, setUpdateCategoryActive] = useState<boolean>(false);
    const [updateCategory, setUpdateCategory] = useState<ICategory | null>(null);

    const { token } = useSelector(authSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if (TreeNodes && selectedNodeKey)
            setSelectedCategory(findCategoryByKeyInTreeSelectModel(TreeNodes, selectedNodeKey))
    }, [selectedCategory, selectedNodeKey]);

    useEffect(() => {

        const getAllCategories = async () => {
            await handleGetAllCategories();
        }
        getAllCategories();
    }, []);


    const validationSchema = Yup.object({
        categoryName: Yup.string()
            .required('Kategori adı boş olamaz')
            .min(2, 'Kategori adı en az 2 karakter olmalıdır')
            .max(50, 'Kategori adı en fazla 50 karakter olmalıdır'),
    })

    const handleAddCategory = async (val: any) => {
        const [err, data] = await to(adminService.addCategory(val, token));
        if (err) {
            const errMessage = err as any;
            const toast: IToast = { severity: 'error', summary: 'Kategori Eklenemedi', detail: errMessage.response.data.message || errMessage.message, life: 5000 }
            dispatch(SET_TOAST(toast))
            return
        }
        const toast: IToast = { severity: 'success', summary: 'Kategori Eklendi', detail: data.message, life: 5000 }
        dispatch(SET_TOAST(toast))
    }

    const handleGetAllCategories = async () => {
        const [err, data] = await to(adminService.getAllCategories());
        if (err) {
            setTreeNodes(convertCategoriesToTreeSelectModel(categoriesEx));
            const res = err as any
            const errorMessage = res.response.data.Message || err.message;
            const toast: IToast = { severity: 'error', summary: "Hata", detail: errorMessage, life: 3000 }
            dispatch(SET_TOAST(toast))
            return
        }
        if (data) {
            setTreeNodes(convertCategoriesToTreeSelectModel(data));
        }
    }


    const formik = useFormik({
        initialValues: {
            categoryName: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const val = {
                name: values.categoryName,
                parrentCategoryId: selectedCategory?.id || null
            }
            await handleAddCategory(val)
                .then(async () => {
                    await handleGetAllCategories()
                })
                .then(() => {
                    setSelectedNodeKey(null)
                    setSelectedCategory(undefined)
                    formik.resetForm()
                })
            setLoading(false);
        },
    })



    // update selec category

    const handleUpdateCategory = async (id: number, val: any) => {
        const [err, data] = await to(adminService.updateCategoryById(id, val, token));
        if (err) {
            const res = err as any
            const errorMessage = res.response.data.Message || err.message;
            const toast: IToast = { severity: 'error', summary: "Hata", detail: errorMessage, life: 3000 }
            dispatch(SET_TOAST(toast))
            return
        }
        else if (data) {

            const toast: IToast = { severity: 'success', summary: data.message, detail: data.message, life: 5000 }
            dispatch(SET_TOAST(toast))
            handleGetAllCategories()
            setSelectedNodeKey(null)
            setSelectedCategory(undefined)
            setUpdateCategory(null)
            updateCategoryFormik.resetForm()

        }
    }


    const updateCategoryValidationSchema = Yup.object({
        categoryName: Yup.string()
            .required('Kategori adı boş olamaz')
            .min(2, 'Kategori adı en az 2 karakter olmalıdır')
            .max(50, 'Kategori adı en fazla 50 karakter olmalıdır'),
    })

    const updateCategoryFormik = useFormik({
        initialValues: {
            categoryName: updateCategory?.name || '',
        },
        validationSchema: updateCategoryValidationSchema,
        onSubmit: async (values) => {

            setLoading(true);
            const val = {
                name: values.categoryName
            }
            if (updateCategory)
                await handleUpdateCategory(updateCategory?.id, val)
            setLoading(false);
        }
    })


    return (
        <>
            {loading &&
                <div className="flex justify-center items-center w-full h-full">
                    <i className="pi pi-spin pi-spinner text-4xl"></i>
                </div>
            }
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-4xl mb-3">Kategori İşlemleri</h1>
                <div className="w-full text-center">

                    <Button className='p-button-rounded p-button-info w-64' icon="pi pi-pencil"
                        onClick={() => { setUpdateCategoryActive(!updateCategoryActive) }}
                        label={updateCategoryActive ? 'İptal' : 'Kategorileri Düzenle'}
                    />
                </div>
                {!updateCategoryActive && (
                    <>
                        <h2 className="text-2xl font-semibold">Kategori Ekle</h2>
                        <span className="text-sm text-gray-500">
                            Eğer üst kategori seçilmezse kategori kök kategori olarak eklenecektir.
                        </span>
                    </>
                )}

                <div className="flex flex-col gap-4 w-full">
                    {/* Üst Kategori seçimi */}
                    {!updateCategoryActive && <>

                        <div className="flex flex-col gap-4 w-full">
                            {TreeNodes &&
                                <>
                                    <div className="flex flex-row flex-wrap gap-2">

                                        <TreeSelect
                                            value={selectedNodeKey}
                                            options={TreeNodes}
                                            onChange={(e) => setSelectedNodeKey(e.value)}
                                            filter
                                            filterBy="label"
                                            placeholder="Üst Kategori Seç"
                                            className="md:w-1/2 w-full"

                                        />
                                        <Button onClick={() => {
                                            setSelectedCategory(undefined)
                                            setSelectedNodeKey(null)
                                        }} icon="pi pi-times" className="p-button-danger"
                                            disabled={!selectedNodeKey}
                                        />
                                        {/* <Button className='p-button-rounded p-button-danger' label='Seçili Kategoriyi Sil' icon="pi pi-trash" /> */}
                                    </div>
                                </>
                            }

                        </div>

                        {/* Kategori adı */}

                        <InputText placeholder='Yeni Kategori Adı*' className={
                            formik.touched.categoryName && formik.errors.categoryName
                                ? "p-invalid md:w-1/2 w-full" : "md:w-1/2 w-full"
                        }
                            id='categoryName'
                            name='categoryName'
                            value={formik.values.categoryName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.categoryName && formik.errors.categoryName ? (
                            <small id="categoryName-help" className="p-error p-d-block">
                                {formik.errors.categoryName}
                            </small>
                        ) : null}


                        <Button label="Ekle" className="p-button-success max-w-xs" onClick={() => formik.handleSubmit()} type='submit' />

                    </>
                    }
                </div>

                {/* seçili kategoryi düzenle */}
                {updateCategoryActive &&
                    <>
                        <div className="flex w-full justify-evenly flex-wrap">

                            <Tree
                                className='w-full max-w-xl'
                                value={TreeNodes} selectionMode="single"
                                selectionKeys={selectedNodeKey}
                                onSelectionChange={(e) => setSelectedNodeKey(e.value)}
                                dragdropScope='demo'
                                onDragDrop={(e) => {
                                    setLoading(true);
                                    handleUpdateCategory(e.dragNode.data.id, { parrentCategoryId: e.dropNode.data.id })
                                    setLoading(false);
                                }}
                                nodeTemplate={(node) => {
                                    return (
                                        <div className="flex flex-row justify-between items-center w-full">
                                            <span className="p-2">{node.label}</span>
                                            <div className='flex gap-x-3'>
                                                <Button className='p-button-rounded p-button-info' icon="pi pi-pencil"
                                                    onClick={() => { setUpdateCategory(node.data) }}
                                                />
                                                <Button className='p-button-rounded p-button-danger' icon="pi pi-trash" />
                                            </div>

                                        </div>
                                    )
                                }}
                            />

                            {updateCategory &&
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-2xl font-semibold">
                                        {updateCategory?.name} düzenleniyor
                                    </h3>

                                    <InputText placeholder='Yeni Kategori Adı*'
                                        className={
                                            updateCategoryFormik.touched.categoryName && updateCategoryFormik.errors.categoryName
                                                ? "p-invalid w-full" : "w-full"
                                        }
                                        id='categoryName'
                                        name='categoryName'
                                        value={updateCategoryFormik.values.categoryName}
                                        onChange={updateCategoryFormik.handleChange}
                                        onBlur={updateCategoryFormik.handleBlur}
                                    />

                                    {updateCategoryFormik.touched.categoryName && updateCategoryFormik.errors.categoryName ? (
                                        <small id="categoryName-help" className="p-error p-d-block">
                                            {updateCategoryFormik.errors.categoryName}
                                        </small>
                                    ) : null}

                                    <Button label="Güncelle" className="p-button-help max-w-xs" onClick={() => updateCategoryFormik.handleSubmit()} type='submit' />


                                </div>
                            }

                        </div>
                    </>
                }
            </div>

        </>
    )
}

export default CategorySettings