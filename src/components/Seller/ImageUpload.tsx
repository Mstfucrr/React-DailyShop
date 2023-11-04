import { Tooltip } from "primereact/tooltip"
import { FileUpload, FileUploadHandlerEvent, FileUploadUploadEvent, ItemTemplateOptions, } from 'primereact/fileupload';
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';


type Props = {
    setcoverImage: React.Dispatch<React.SetStateAction<File | null>>
    setImages: React.Dispatch<React.SetStateAction<File[]>>
}

const ImageUpload = (
    { setcoverImage, setImages }: Props) => {
    const fileUploadRef = useRef(null);
    const [totalSize, setTotalSize] = useState(0);

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
    };

    const coverItemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as any;
        setcoverImage(file as File)
        return (
            <div className="flex items-center flex-wrap w-full">
                <div className="flex items-center w-full gap-4">
                    <div>
                        <img alt={file.name} role="presentation" src={file.objectURL} />
                    </div>
                    <div>
                        <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                            onClick={() => {setcoverImage(null); onTemplateRemove(file, props.onRemove)} } />
                    </div>

                </div>
            </div>
        );
    };

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
                        onClick={() =>{ setImages((prev) => { return prev.filter((item) => item !== file)}) ;onTemplateRemove(file, props.onRemove)}} />
                </div>
            </div>
        );
    };

    const onTemplateRemove = (file: File, callback: Function) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const customBase64Uploader = async (event: FileUploadHandlerEvent) => setImages(event.files)

    const chooseOptions = { icon: 'pi pi-fw pi-images', className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
    const ImagesUploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: false, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
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
                    onSelect={() => onTemplateSelect}
                    maxFileSize={10000000}
                    itemTemplate={coverItemTemplate}
                    name="demo[]" url="/api/upload" accept="image/*" customUpload
                    onClear={() => { onTemplateClear }}
                    cancelOptions={{className: "!hidden"}}
                    uploadOptions={{className: "!hidden"}}
                    chooseOptions={chooseOptions}
                    chooseLabel= "Seç"
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
                    name="demo[]" accept="image/*" uploadHandler={customBase64Uploader}
                    onClear={() => { onTemplateClear }}
                    cancelOptions={cancelOptions}
                    uploadOptions={ImagesUploadOptions}
                    chooseOptions={chooseOptions}
                    multiple
                    contentClassName="w-full"
                    customUpload
                    uploadLabel="Yükle"
                    chooseLabel= "Seç"
                    cancelLabel= "Temizle"
                />

            </div>

        </>
    )
}

export default ImageUpload