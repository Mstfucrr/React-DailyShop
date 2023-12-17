import { settingsService } from "@/services/admin/admin.service"
import { ISiteSettings } from "@/services/admin/types"
import { SET_TOAST } from "@/store/Toast"
import { IToast } from "@/store/Toast/type"
import { authSelector } from "@/store/auth"
import to from "await-to-js"
import { Button } from "primereact/button"
import { Editor } from "primereact/editor"
import { InputMask } from "primereact/inputmask"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ProgressSpinner } from "primereact/progressspinner"
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup"
import { Fieldset } from "primereact/fieldset"

const Settings = () => {

    // hakkımızda, iletişim bilgileri , adres bilgileri ve site icon ayarları
    const [about, setAbout] = useState<string | undefined>(undefined)
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [phone, setPhone] = useState<string | undefined>(undefined)
    const [address, setAddress] = useState<string | undefined>(undefined)
    const [siteSettings, setSiteSettings] = useState<ISiteSettings | null>()
    const [siteIcon, setSiteIcon] = useState<File | string | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const [saveLoading, setSaveLoading] = useState<boolean>(false)
    const { token } = useSelector(authSelector)
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const showErrorMessage = (err: Error) => {
        const toast: IToast = { severity: 'error', summary: "Hata", detail: err.message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }
    const showSuccess = (message: string) => {
        const toast: IToast = { severity: 'success', summary: "Başarılı", detail: message, life: 3000 }
        dispatch(SET_TOAST(toast))
    }

    const fetchDatas = async () => {
        setLoading(true)
        const [err, data] = await to(settingsService.fetchSettings(token))
        if (err) return showErrorMessage(err)
        setSiteSettings(data.data)
        setLoading(false)
    }


    useEffect(() => {
        fetchDatas()
    }, [])

    const SaveSettings = async () => {
        const val: ISiteSettings = {
            about: about,
            email: email,
            phone: phone,
            address: address,
            siteIcon: siteIcon
        }

        setSaveLoading(true)
        const formData = new FormData();
        formData.append("about", val.about || "")
        formData.append("email", val.email || "")
        formData.append("phone", val.phone || "")
        formData.append("address", val.address || "")
        formData.append("siteIcon", val.siteIcon || "")
        const [err, data] = await to(settingsService.saveSettings(formData, token))
        if (err) return showErrorMessage(err)
        showSuccess(data.message)
        setSaveLoading(false)
        fetchDatas()
    }

    useEffect(() => {
        if (siteSettings) {
            setAbout(siteSettings.about)
            setEmail(siteSettings.email)
            setPhone(siteSettings.phone)
            setAddress(siteSettings.address)
            setSiteIcon(siteSettings.siteIcon)
        }
    }, [siteSettings])


    const handleFileChange = (e: any) => {
        const file = e?.target?.files[0];
        console.log(file)
        if (file)
            setSiteIcon(file);
    };

    const openFileInput = () => {
        if (inputRef && inputRef.current) {
            (inputRef.current as HTMLInputElement).click();
        }
    };

    const confirmSave = (event: any) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Kaydetmek istediğinize emin misiniz?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => SaveSettings(),
            reject: () => { },
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır',
            acceptIcon: 'pi pi-check',
            rejectIcon: 'pi pi-times',
            acceptClassName: 'p-button-success'
        });
    }

    const confirmReset = (event: any) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Varsayılan ayarlara dönmek istediğinize emin misiniz?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => fetchDatas(),
            reject: () => { },
            acceptLabel: 'Evet',
            rejectLabel: 'Hayır',
            acceptIcon: 'pi pi-check',
            rejectIcon: 'pi pi-times',
            acceptClassName: 'p-button-danger'
        });
    }



    return (
        <>
            {loading ? <>
                <ProgressSpinner strokeWidth="4" style={{ width: '50px', height: '50px' }} />
                <span className="text-2xl">Yükleniyor...</span>
            </> :
                <div className="flex flex-col gap-y-8 w-full">

                    {/* Hakkımızda */}
                    <div className="flex flex-col gap-y-6">
                        <h3 className="text-2xl" >Hakkımızda</h3>
                        {about &&
                            <Editor style={{ height: '320px' }} value={about} onTextChange={(e) => setAbout(e.htmlValue as any)} />
                        }
                    </div>
                    {/* test show about */}
                    <Fieldset legend="Hakkımızda Önizleme" toggleable collapsed={true}>
                        <div className="flex flex-col gap-y-6">
                            <div className="ql-editor"
                                dangerouslySetInnerHTML={{ __html: about as string }} />
                        </div>
                    </Fieldset>
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
                        <div className="relative flex">
                            {/* site icon */}
                            {siteIcon !== undefined &&
                                <img src={typeof siteIcon === "string" ? siteIcon : URL.createObjectURL(siteIcon)}
                                    alt="site icon" className="w-60 max-h-52 h-auto object-cover" />
                            }

                            <div className="absolute top-12 left-0 h-full w-60 flex items-end justify-center">
                                <Button label="Resmi değiştir" text rounded severity="help" icon="pi pi-image" iconPos="left"
                                    onClick={openFileInput} />
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                            </div>
                        </div>

                    </div>

                    {/* Kaydet ve iptal Butonu */}

                    <div className="flex justify-end gap-3 relative">
                        <ConfirmPopup />

                        <Button label="Kaydet"
                            onClick={confirmSave}
                            severity="success"
                            loading={saveLoading || loading}
                        />
                        <Button label="Reset"
                            onClick={confirmReset}
                            className="ml-3" 
                            severity="danger"
                            loading={saveLoading || loading}
                        />
                    </div>

                </div>
            }
        </>
    )
}

export default Settings