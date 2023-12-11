import { settingsService } from "@/services/admin/admin.service"
import { ISiteSettings } from "@/services/admin/types"
import { SET_TOAST } from "@/store/Toast"
import { IToast } from "@/store/Toast/type"
import { authSelector } from "@/store/auth"
import to from "await-to-js"
import { Button } from "primereact/button"
import { Editor } from "primereact/editor"
import { FileUpload } from "primereact/fileupload"
import { InputMask } from "primereact/inputmask"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

const Settings = () => {

    // hakkımızda, iletişim bilgileri , adres bilgileri ve site icon ayarları
    const [about, setAbout] = useState<string | undefined>('')
    const [email, setEmail] = useState<string | undefined>('')
    const [phone, setPhone] = useState<string | undefined>('')
    const [address, setAddress] = useState<string | undefined>('')
    const [siteSettings, setSiteSettings] = useState<ISiteSettings | null>()
    const [siteIcon, setSiteIcon] = useState<File>()

    const { token } = useSelector(authSelector)
    const dispatch = useDispatch();

    const showErrorMessage = (err: Error) => {
        const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }
    const showSuccess = (message: string) => {
        const toast: IToast = { severity: 'success', summary: "Başarılı", detail: message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }

    const fetchDatas = async () => {

        const [err, data] = await to(settingsService.fetchSettings(token))
        if (err) return showErrorMessage(err)
        setSiteSettings(data.data)
    }


    useEffect(() => {
        fetchDatas()
    }, [])

    const SaveSettings = async () => {

        const val: ISiteSettings = {
            id: siteSettings?.id,
            about: about,
            email: email,
            phone: phone,
            address: address,
            siteIcon: siteIcon
        }

        const formData = new FormData();
        formData.append("about", val.about || "")
        formData.append("email", val.email || "")
        formData.append("phone", val.phone || "")
        formData.append("address", val.address || "")
        formData.append("siteIcon", val.siteIcon || "")
        const [err, data] = await to(settingsService.saveSettings(formData, token))
        if (err) return showErrorMessage(err)
        showSuccess(data.message)
        fetchDatas()
    }

    const emptyTemplate = () => {
        return (
            <>
                {siteIcon ?
                    (<div className="flex items-center flex-col">
                        <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                            {siteIcon?.name}
                        </span>
                    </div>
                    )
                    : (
                        <div className="flex items-center flex-col">
                            <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                            <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                                Resmi Buraya Sürükleyip Bırakın
                            </span>
                        </div>
                    )
                }

            </>
        );
    };

    const renderItemTemplate = useCallback((inFile: object) => {
        const file = inFile as any;
        setSiteIcon(file as File);

        return (
        <div className="flex items-center flex-wrap w-full">
            <div className="flex items-center w-full">
                <img alt={file?.name} role="presentation" src={file?.objectURL as string} className="max-h-96" />
            </div>
        </div>


    )}, [setSiteIcon]);

    useEffect(() => {
        if (siteSettings) {
            setAbout(siteSettings.about)
            setEmail(siteSettings.email)
            setPhone(siteSettings.phone)
            setAddress(siteSettings.address)
        }
    }, [siteSettings])


    return (
        <>
            <div className="flex flex-col gap-y-8 w-full">

                {/* Hakkımızda */}
                <div className="flex flex-col gap-y-6">
                    <h3 className="text-2xl" >Hakkımızda</h3>
                    <Editor style={{ height: '320px' }} value={about} onTextChange={(e) => setAbout(e.htmlValue as any)} />
                </div>
                {/* test show about */}
                <div className="flex flex-col gap-y-6">
                    <h3 className="text-2xl" >Hakkımızda</h3>
                    <div className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: about as string }} />
                </div>

                {/* İletişim Bilgileri */}
                <div className="flex flex-col gap-y-6">
                    <h3 className="text-2xl" >İletişim Bilgileri</h3>
                    <div className="flex gap-6">
                        {/* eposta ve phone */}
                        <div className="flex flex-wrap gap-5">
                            <div className="flex gap-5">
                                <span>Eposta</span>
                                <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex gap-5">
                                <span>Telefon</span>
                                <InputMask mask="(999) 999-9999" value={phone} onChange={(e) => setPhone(e.target.value as any)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Adres Bilgileri */}
                <div className="flex flex-col gap-y-6">
                    <h3 className="text-2xl" >Adres Bilgileri</h3>
                    <InputTextarea value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                {/* Site Icon */}

                <div className="flex flex-col gap-y-6">
                    <h3 className="text-2xl" >Site Icon</h3>
                    <img src={siteSettings?.siteIcon as string} alt="site icon" className="max-h-96" />
                    <FileUpload accept="image/*" maxFileSize={1000000}
                        itemTemplate={renderItemTemplate}
                        emptyTemplate={emptyTemplate}
                        name="demo[]" customUpload
                        onUpload={(e) => setSiteIcon(e.files[0])}
                    />
                </div>

                {/* Kaydet ve iptal Butonu */}
                <div className="flex justify-end gap-3">
                    <Button label="Kaydet" onClick={SaveSettings} severity="success" />
                    <Button label="İptal" className="ml-3" severity="danger" />
                </div>

            </div>
        </>
    )
}

export default Settings