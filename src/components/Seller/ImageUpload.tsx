import { Tooltip } from "primereact/tooltip"
import { FileUpload, FileUploadHandlerEvent, FileUploadUploadEvent, ItemTemplateOptions, } from 'primereact/fileupload';
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';


type Props = {
    setcoverImage: React.Dispatch<React.SetStateAction<File | null>>
    setImages: React.Dispatch<React.SetStateAction<File[]>>
    images: File[]
}

const ImageUpload = (
    { setcoverImage, setImages, images }
        : Props) => {
    const fileUploadRef = useRef(null);
    const [totalSize, setTotalSize] = useState(0);

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const emptyTemplate = () => {
        return (
            <div className="flex items-center flex-col">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Resmi Buraya Sürükleyip Bırakın
                </span>
            </div>
        );
    };
    const onTemplateSelect = (e: FileUploadUploadEvent) => {
        let _totalSize = totalSize;
        let files = e.files;

        for (let i = 0; i < files.length; i++) {
            _totalSize += files[i].size || 0;
        }
        setTotalSize(_totalSize);
    };

    const onTemplateClear = () => {
        setTotalSize(0);
        setcoverImage(null)
    };

    const coverItemTemplate = (inFile: object) => {
        const file = inFile as any;
        setcoverImage(file as File)

        return (
            <div className="flex items-center flex-wrap w-full">
                <div className="flex items-center w-full">
                    <img alt={file.name} role="presentation" src={file.objectURL} />
                </div>
            </div>
        );
    };

    const imagesItemTemplate = (inFile: object) => {
        const file = inFile as any;

        return (
            <div className="flex w-52">
                <img alt={file.name} role="presentation" src={file.objectURL} className="w-52" />
            </div>
        );
    }

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as any;
        return (
            <div className="flex items-center flex-wrap justify-between gap-y-2">
                <div className="flex items-center ">
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-col text-left ml-3 ">
                        {file.name.length > 15 ? file.name.slice(0, 15) + "..." : file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <div className="flex gap-x-2 justify-between xl:w-2/5 md:w-full">

                    <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                    <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                        onClick={() => onTemplateRemove(file, props.onRemove)} />
                </div>
            </div>
        );
    };

    const onTemplateRemove = (file: File, callback: Function) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const customBase64Uploader = async (event: FileUploadHandlerEvent) => {
        // convert file to base64 encoded
        const file = event.files[0] as any;
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
    };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: '', iconOnly: true, className: '!hidden' };

    return (
        <>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            {/* for cover phote */}
            <div className="flex flex-col gap-y-10 w-full">
                <h2 className="text-2xl font-semibold">Kapak Fotoğrafı</h2>
                <FileUpload
                    className="w-full"
                    ref={fileUploadRef}
                    emptyTemplate={emptyTemplate}
                    onSelect={() => { onTemplateSelect }}
                    maxFileSize={10000000}
                    itemTemplate={coverItemTemplate}
                    name="demo[]" url="/api/upload" accept="image/*" customUpload uploadHandler={customBase64Uploader}
                    onClear={() => { onTemplateClear }}
                    cancelOptions={cancelOptions}
                    uploadOptions={uploadOptions}
                    chooseOptions={chooseOptions}
                    multiple={false}
                />

                {/* for another photos ( multi ) */}
                <h2 className="text-2xl font-semibold">Diğer Fotoğraflar</h2>
                <FileUpload
                    className="w-full"
                    ref={fileUploadRef}
                    onSelect={() => { onTemplateSelect }}
                    maxFileSize={10000000}
                    itemTemplate={itemTemplate}
                    name="demo[]" url="/api/upload" accept="image/*" customUpload uploadHandler={customBase64Uploader}
                    onClear={() => { onTemplateClear }}
                    cancelOptions={cancelOptions}
                    uploadOptions={uploadOptions}
                    chooseOptions={chooseOptions}
                    multiple
                    contentClassName="w-full"

                />

            </div>

        </>
    )
}

export default ImageUpload