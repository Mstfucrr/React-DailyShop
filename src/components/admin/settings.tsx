import adminService from "@/services/admin/admin.service"
import { authSelector } from "@/store/auth"
import to from "await-to-js"
import { Button } from "primereact/button"
import { Editor } from "primereact/editor"
import { FileUpload } from "primereact/fileupload"
import { InputMask } from "primereact/inputmask"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Settings = () => {

    // hakkımızda, iletişim bilgileri , adres bilgileri ve site icon ayarları
    const [about, setAbout] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [siteIcon, setSiteIcon] = useState<File>()

    const { token } = useSelector(authSelector)

    useEffect(() => {

        const fetchDatas = async () => {

            const [err, data] = await to(adminService.fetchSettings(token))
            if (err) {
                console.log(err)
                return
            }
            if (data) {
                console.log(data)
                setAbout(data.data.about)
                setEmail(data.data.email)
                setPhone(data.data.phone)
                setAddress(data.data.address)
            }
            
        }

        fetchDatas()

    }, [])



    const ItemTemplate = (inFile: object) => {
        const file = inFile as any;
        setSiteIcon(file as File)
        return (
            <div className="flex items-center flex-wrap w-full">
                <div className="flex items-center w-full">
                    <img alt={siteIcon?.name} role="presentation" src={siteIcon?.objectURL as string} />
                </div>
            </div>
        );
    };

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
    useEffect(() => {

        console.log(siteIcon)
    }, [siteIcon])

    const saveAbout = async () => {

        const [err, data] = await to(adminService.saveAbout(about, token))
        if (err) {
            console.log(err)
            return
        }
        if (data)
            console.log(data)
    }

    const saveContact = async () => {

        const [err, data] = await to(adminService.saveContact(email, phone, token))
        if (err) {
            console.log(err)
            return
        }
        if (data)
            console.log(data)

    }

    const saveAddress = async () => {

        const [err, data] = await to(adminService.saveAddress(address, token))
        if (err) {
            console.log(err)
            return
        }
        if (data)
            console.log(data)

    }

    const saveSiteIcon = async () => {

        const [err, data] = await to(adminService.saveSiteIcon(siteIcon as File, token))
        if (err) {
            console.log(err)
            return
        }
        if (data)
            console.log(data)

    }



    const UploadOptions = { icon: '', iconOnly: true, className: '!hidden' };


    return (
        <>
            <div className="flex flex-col gap-y-8 w-full">

                {/* Hakkımızda */}
                <div className="flex flex-col gap-y-6">
                    <h3 className="text-2xl" >Hakkımızda</h3>
                    <Editor style={{ height: '320px' }} />
                    <Button label="Kaydet" className="w-1/6" onClick={saveAbout} />
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
                    <Button label="Kaydet" className="w-1/6" onClick={saveContact} />
                </div>

                {/* Adres Bilgileri */}
                <div className="flex flex-col gap-y-6">
                    <h3 className="text-2xl" >Adres Bilgileri</h3>
                    <InputTextarea value={address} onChange={(e) => setAddress(e.target.value)} />
                    <Button label="Kaydet" className="w-1/6" onClick={saveAddress} />
                </div>

                {/* Site Icon */}

                <div className="flex flex-col gap-y-6">
                    <h3 className="text-2xl" >Site Icon</h3>
                    <FileUpload accept="image/*" maxFileSize={1000000}
                        itemTemplate={ItemTemplate}
                        emptyTemplate={emptyTemplate}
                        name="demo[]" customUpload
                        onUpload={(e) => setSiteIcon(e.files[0])}
                    />
                    <Button label="Kaydet" className="w-1/6" onClick={saveSiteIcon} />
                </div>


            </div>
        </>
    )
}

export default Settings