import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { SET_TOAST } from "@/store/Toast";
import { IToast } from "@/store/Toast/type";
import { FaTimes } from "react-icons/fa";
import { useCallback } from "react";

type Props = {
  setcoverImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  productImages: File[] | null;
  coverImage: File | null;
};

const ImageUpload = ({
  setcoverImage,
  setImages,
  productImages,
  coverImage,
}: Props) => {
  const handleCoverImage = (e: any) => {
    if (e.target.files == null) return;
    setcoverImage(e.target.files[0]);
  };

  const RenderCoverImage = useCallback(() => {
    return (
      <>
        <div className="relative flex justify-center h-80">
          {coverImage !== null ? (
            <img
              src={URL.createObjectURL(coverImage)}
              alt={coverImage.name || "resim"}
              className="w-[350px] h-auto object-contain"
            />
          ) : (
            <div className="flex items-center justify-center w-[350px] h-[350px] bg-gray-200">
              <i className="pi pi-image" style={{ fontSize: "5em" }}></i>
            </div>
          )}
          <div
            className="absolute top-2/3 bg-white bg-opacity-60 rounded-full
                              hover:bg-opacity-80 transition-all duration-300 ease-in-out transform hover:scale-110
                              border border-green-500 border-dashed mt-28
                          "
          >
            <Button
              icon="pi pi-upload"
              severity="success"
              rounded
              text={true}
              className="w-full h-full"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = handleCoverImage;
                input.click();
              }}
            >
              <div className="px-5">
                <span className="text-sm">Kapak Fotoğrafı Yükle</span>
              </div>
            </Button>
          </div>
        </div>
      </>
    );
  }, [coverImage]);

  const RenderAnotherImages = useCallback(() => {
    return (
      <>
        {productImages != null && (
          <div className="flex flex-row gap-4 w-full flex-wrap mt-3">
            {productImages.map((image) => (
              <div
                className="flex relative justify-end md:w-[300px] w-full h-auto rounded-3xl border-dashed border border-blue-600"
                key={image.name}
              >
                <FaTimes
                  className="text-red-400 text-2xl cursor-pointer absolute float-right right-3 top-3"
                  onClick={() => {
                    handleRemoveImage(image);
                  }}
                />
                <img
                  src={URL.createObjectURL(image)}
                  alt="resim"
                  className=" object-contain p-2 "
                />
              </div>
            ))}

            <button
              className="md:w-[300px] w-full text-2xl text-blue-600 h-auto border border-blue-600 border-dashed rounded-3xl
                                                hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 bg-opacity-10"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.multiple = true;
                input.click();
                input.onchange = (e) => {
                  handleAddImage(e as any);
                };
              }}
            >
              +
            </button>
          </div>
        )}
      </>
    );
  }, [productImages]);

  const dispatch = useDispatch();

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;
    if (e.target.files.length === 0) return;
    // aynı dosya varsa hata ver
    for (const file of e.target.files) {
      if (productImages?.find((img) => img.name === file.name)) {
        const toast: IToast = {
          severity: "warn",
          summary: "Uyarı",
          detail: "Aynı dosyadan var",
          life: 5000,
        };
        dispatch(SET_TOAST(toast));
        return;
      }
    }
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (image: File) => {
    if (productImages === null) return;
    if (typeof image === "string") {
      setImages(productImages.filter((img) => img !== image));
      return;
    }
    setImages(productImages.filter((img) => img !== image));
  };

  return (
    <>
      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      {/* for cover phote */}
      <div className="flex flex-col gap-y-28 w-full">
        <div className="flex flex-col gap-y-5 relative">
          <h2 className="text-2xl font-semibold">Kapak Fotoğrafı</h2>
          <RenderCoverImage />
        </div>

        {/* for another photos ( multi ) */}
        <div className="flex flex-col gap-y-5 relative">
          <h2 className="text-2xl font-semibold">Diğer Fotoğraflar</h2>
          <RenderAnotherImages />
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
