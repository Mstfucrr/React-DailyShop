import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { TreeSelect, TreeSelectChangeEvent } from "primereact/treeselect";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import {
  convertCategoriesToTreeSelectModel,
  findCategoryByKeyInTreeSelectModel,
} from "../../utils/categoryTreeModel";
import { TreeNode } from "primereact/treenode";
import { MultiSelect } from "primereact/multiselect";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Button } from "primereact/button";
import { ICategory } from "@/shared/types";
import categoryService from "@/services/category/category.service";
import to from "await-to-js";
import { IProductInfo } from "@/services/product/types";
import { IToast } from "@/store/Toast/type";
import { useDispatch } from "react-redux";
import { SET_TOAST } from "@/store/Toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { colors, productStatus, sizes } from "@/shared/constants";
import { get_quote } from "@/services/ai/get_quote.service";

type Props = {
  productInfo: IProductInfo;
  setProductInfo: React.Dispatch<React.SetStateAction<IProductInfo>>;
  formik: any;
  loading: boolean;
};

const ProductInfo = ({
  formik,
  setProductInfo,
  productInfo,
  loading,
}: Props) => {
  const [treeNodes, setTreeNodes] = useState<TreeNode[] | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | undefined>(
    undefined
  );
  const [selectedSizes, setSelectedSizes] = useState<string[] | undefined>([]);
  const [priceQuated, setPriceQuated] = useState<
    { min: number; max: number } | undefined
  >(undefined);
  const [getPriceQuatedLoading, setGetPriceQuatedLoading] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const colorTemplete = (option: any) => {
    return (
      <div className="flex align-items-center">
        <div
          className="w-6 h-5 rounded-lg mr-2"
          style={{ backgroundColor: option.value }}
        ></div>
        <div>{option.label}</div>
      </div>
    );
  };

  const showErrorMessage = (err: Error) => {
    const toast: IToast = {
      severity: "error",
      summary: "Hata",
      detail: err.message,
      life: 3000,
    };
    dispatch(SET_TOAST(toast));
  };

  const showSuccessMessage = (message: string) => {
    const toast: IToast = {
      severity: "success",
      summary: "Başarılı",
      detail: message,
      life: 3000,
    };
    dispatch(SET_TOAST(toast));
  };

  const getCategories = async () => {
    const [err, data] = await to(categoryService.fetchCategories());
    if (err) return showErrorMessage(err);
    if (data) setTreeNodes(convertCategoriesToTreeSelectModel(data));
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (treeNodes && selectedNodeKey)
      setSelectedCategory(
        findCategoryByKeyInTreeSelectModel(treeNodes, selectedNodeKey)
      );
  }, [selectedCategory, selectedNodeKey]);

  const handleGetQuatedPrice = async () => {
    setGetPriceQuatedLoading(true);
    const [err, data] = await to(get_quote(formik.values!));
    if (err) {
      showErrorMessage(err);
      setGetPriceQuatedLoading(false);
      return;
    }
    if (data.status === 200) {
      showSuccessMessage(data.message);
      setPriceQuated(data.data);
      setGetPriceQuatedLoading(false);
    } else {
      showErrorMessage(data);
      setGetPriceQuatedLoading(false);
    }
  };

  const showFormErrorMessage = (err: string) => {
    return <small className="p-error block h-0 mb-6"> {err} </small>;
  };

  return (
    <div className="flex h-auto flex-col gap-y-7">
      <h2 className="text-4xl font-semibold mb-5">Ürün Bilgileri</h2>
      <form className="flex flex-col gap-y-4" onSubmit={formik.handleSubmit}>
        {/* category */}
        <span className="p-float-label">
          <TreeSelect
            id="ts-category"
            name="ts-category"
            className={`w-full md:w-56 ${
              formik.touched.category && formik.errors.category
                ? "p-invalid"
                : ""
            }`}
            value={formik.values.category}
            options={treeNodes}
            onChange={(e: TreeSelectChangeEvent) => {
              formik.setFieldValue("category", e.value);
              setSelectedNodeKey(e.value as string);
            }}
            filter
          />
          <label htmlFor="ts-category">Bir Kategori Seç</label>

          {formik.touched.category &&
            showFormErrorMessage(formik.errors.category!)}
        </span>

        {/* product name and pierce */}
        <div className="flex flex-row flex-wrap gap-5 w-full">
          <div className="w-full md:w-1/2">
            <label htmlFor="name" className="font-bold block mb-2">
              Ürün Adı
            </label>
            <InputText
              id="name"
              name="name"
              className={`w-full ${
                formik.touched.name && formik.errors.name ? "p-invalid" : ""
              }`}
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
            />
            {formik.touched.name && showFormErrorMessage(formik.errors.name!)}
          </div>
          <div className="w-full md:w-1/2 flex gap-x-3 flex-col">
            <label htmlFor="in-product-price" className="font-bold block mb-2">
              Fiyatı
            </label>
            <InputNumber
              id="in-product-price"
              name="in-product-price"
              mode="currency"
              currency="TRY"
              locale="de-DE"
              minFractionDigits={2}
              className={`w-full mb-2 ${
                formik.touched.price && formik.errors.price ? "p-invalid" : ""
              }`}
              onChange={(e) => formik.setFieldValue("price", e.value as any)}
              value={formik.values.price}
            />
            {formik.touched.price && showFormErrorMessage(formik.errors.price!)}

            {/* fiyat önerisi getir */}
            <div className="flex items-center gap-x-2 flex-row flex-wrap">
              <Button
                label="Fiyat Önerisi Al"
                className="w-44 !text-sm"
                type="button"
                onClick={handleGetQuatedPrice}
                disabled={getPriceQuatedLoading}
              />

              {getPriceQuatedLoading ? (
                <ProgressSpinner strokeWidth="3.5" className="!w-10" />
              ) : (
                priceQuated && (
                  <span
                    className={`text-sm font-medium ${
                      priceQuated.min > formik.values.price ||
                      priceQuated.max < formik.values.price
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    Ürün için önerilen fiyat aralığı: [{priceQuated.min} -{" "}
                    {priceQuated.max}]
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* colors and sizes (multi) */}
        <div className="flex flex-row flex-wrap gap-x-5 w-full">
          <div className="w-full md:w-1/3">
            <label htmlFor="dd-colors" className="font-bold block mb-2">
              Renkler
            </label>
            <MultiSelect
              id="dd-colors"
              name="dd-colors"
              multiple
              options={colors}
              value={formik.values.colors}
              onChange={(e: DropdownChangeEvent) =>
                formik.setFieldValue("colors", e.value)
              }
              itemTemplate={colorTemplete}
              className={`w-full ${
                formik.touched.colors && formik.errors.colors ? "p-invalid" : ""
              }`}
            />
            {formik.touched.colors &&
              showFormErrorMessage(formik.errors.colors!)}
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="dd-sizes" className="font-bold block mb-2">
              Bedenler
            </label>
            <MultiSelect
              id="dd-sizes"
              name="dd-sizes"
              className="w-full "
              multiple
              options={sizes}
              value={selectedSizes}
              onChange={(e: DropdownChangeEvent) => setSelectedSizes(e.value)}
            />
          </div>
        </div>

        {/* bilgiler ( durum, stok adet) */}
        <div className="flex flex-row flex-wrap gap-x-5 w-full">
          <div className="w-full md:w-1/3">
            <label htmlFor="dd-status" className="font-bold block mb-2">
              Durum
            </label>
            <Dropdown
              id="dd-status"
              name="dd-status"
              options={productStatus}
              onChange={(e: DropdownChangeEvent) => {
                formik.setFieldValue("status", e.value);
              }}
              value={formik.values.status}
              className={`w-full ${
                formik.touched.status && formik.errors.status ? "p-invalid" : ""
              }`}
            />

            {formik.touched.status &&
              showFormErrorMessage(formik.errors.status!)}
          </div>

          <div className="w-full md:w-1/3">
            <label htmlFor="in-stock" className="font-bold block mb-2">
              Stok Adedi
            </label>
            <InputNumber
              id="in-stock"
              name="in-stock"
              min={1}
              onChange={(e) => formik.setFieldValue("stock", e.value as any)}
              className={`w-full ${
                formik.touched.stock && formik.errors.stock ? "p-invalid" : ""
              }`}
              value={formik.values.stock}
            />
          </div>
        </div>

        {/* description */}
        <div className="flex w-full mt-5 ">
          <div className="w-full card mx-auto">
            <label htmlFor="ed-description" className="font-bold block mb-2">
              Açıklama
            </label>
            <Editor
              value={formik.values.description}
              onTextChange={(e: EditorTextChangeEvent) =>
                formik.setFieldValue("description", e.htmlValue as any)
              }
              style={{ height: "300px" }}
              id="ed-description"
              name="ed-description"
              className={`w-full ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500 border"
                  : ""
              }`}
            />

            {formik.touched.description &&
              showFormErrorMessage(formik.errors.description!)}
          </div>
        </div>

        {/* SUBMİT */}

        <Button
          className="text-white !mt-7 w-1/3"
          type="submit"
          disabled={loading}
          text={loading}
          severity="help"
          onClick={() => {
            setProductInfo({
              ...productInfo,
              price: formik.values.price,
              stock: formik.values.stock,
              status: formik.values.status,
              description: formik.values.description,
              colors: formik.values.colors,
              sizes: selectedSizes,
              categoryId: selectedCategory?.id!,
              name: formik.values.name,
            });
          }}
        >
          {loading ? (
            <div className="flex items-center w-1/2 gap-x-2 max-h-10">
              <ProgressSpinner className="!w-16" strokeWidth="3.5" />
              <span>Kaydediliyor...</span>
            </div>
          ) : (
            <span className="w-full text-center">Kaydet</span>
          )}
        </Button>
      </form>
    </div>
  );
};

/*
 for text editör showing 

<div className="ql-snow">
    <div className="ql-editor">
        <ol>Test</ol>
    </div>
</div>

*/

export default ProductInfo;
