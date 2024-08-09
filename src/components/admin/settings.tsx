import { ISiteSettings } from '@/services/admin/types'
import { Button } from 'primereact/button'
import { Editor } from 'primereact/editor'
import { InputMask } from 'primereact/inputmask'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { useEffect, useState, useRef } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { Fieldset } from 'primereact/fieldset'
import toast from 'react-hot-toast'
import { useGetSettings, useSaveSettings } from '@/services/admin/settings.service'
import Image from 'next/image'

const Settings = () => {
  const [about, setAbout] = useState<string | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)
  const [phone, setPhone] = useState<string | undefined>(undefined)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [siteIcon, setSiteIcon] = useState<File | string | undefined>(undefined)
  const inputRef = useRef(null)

  const showErrorMessage = (err: Error) => toast.error(err.message)
  const showSuccess = (message: string) => toast.success(message)

  const {
    data: siteSettings,
    refetch: refetchSiteSettings,
    isLoading: isSiteSettingsLoading,
    error: siteSettingsError
  } = useGetSettings()

  const { mutate: saveSettingsMutate, isPending: saveLoading } = useSaveSettings()

  useEffect(() => {
    if (siteSettingsError) showErrorMessage(siteSettingsError)
    if (!siteSettings) return
    setAbout(siteSettings.data.data.about)
    setEmail(siteSettings.data.data.email)
    setPhone(siteSettings.data.data.phone)
    setAddress(siteSettings.data.data.address)
    setSiteIcon(siteSettings.data.data.siteIcon)
  }, [siteSettings, siteSettingsError])

  const SaveSettings = async () => {
    const val: ISiteSettings = {
      about: about,
      email: email,
      phone: phone,
      address: address,
      siteIcon: siteIcon
    }

    const formData = new FormData()
    formData.append('about', val.about ?? '')
    formData.append('email', val.email ?? '')
    formData.append('phone', val.phone ?? '')
    formData.append('address', val.address ?? '')
    formData.append('siteIcon', val.siteIcon ?? '')

    saveSettingsMutate(formData, {
      onSuccess: () => showSuccess('Ayarlar başarıyla kaydedildi'),
      onError: err => showErrorMessage(err)
    })
  }

  const handleFileChange = (e: any) => {
    const file = e?.target?.files[0]
    if (file) setSiteIcon(file)
  }

  const openFileInput = () => {
    if (inputRef?.current) {
      ;(inputRef.current as HTMLInputElement).click()
    }
  }

  const confirmSave = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Kaydetmek istediğinize emin misiniz?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => SaveSettings(),
      reject: () => {},
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptClassName: 'p-button-success'
    })
  }

  const confirmReset = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Varsayılan ayarlara dönmek istediğinize emin misiniz?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => refetchSiteSettings(),
      reject: () => {},
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      acceptClassName: 'p-button-danger'
    })
  }

  return (
    <>
      {isSiteSettingsLoading ? (
        <>
          <ProgressSpinner strokeWidth='4' style={{ width: '50px', height: '50px' }} />
          <span className='text-2xl'>Yükleniyor...</span>
        </>
      ) : (
        <div className='flex w-full flex-col gap-y-8'>
          {/* Hakkımızda */}
          <div className='flex flex-col gap-y-6'>
            <h3 className='text-2xl'>Hakkımızda</h3>
            <Editor style={{ height: '320px' }} value={about ?? ''} onTextChange={e => setAbout(e.htmlValue as any)} />
          </div>
          {/* test show about */}
          <Fieldset legend='Hakkımızda Önizleme' toggleable collapsed={true}>
            <div className='flex flex-col gap-y-6'>
              <div className='ql-editor' dangerouslySetInnerHTML={{ __html: about as string }} />
            </div>
          </Fieldset>
          {/* İletişim Bilgileri */}
          <div className='flex flex-col gap-y-6'>
            <h3 className='text-2xl'>İletişim Bilgileri</h3>
            <div className='flex gap-6'>
              {/* eposta ve phone */}
              <div className='flex flex-wrap gap-5'>
                <div className='flex gap-5'>
                  <span>Eposta</span>
                  <InputText value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='flex gap-5'>
                  <span>Telefon</span>
                  <InputMask mask='(999) 999-9999' value={phone} onChange={e => setPhone(e.target.value as any)} />
                </div>
              </div>
            </div>
          </div>

          {/* Adres Bilgileri */}
          <div className='flex flex-col gap-y-6'>
            <h3 className='text-2xl'>Adres Bilgileri</h3>
            <InputTextarea value={address} onChange={e => setAddress(e.target.value)} />
          </div>

          {/* Site Icon */}

          <div className='flex flex-col gap-y-6'>
            <h3 className='text-2xl'>Site Icon</h3>
            <div className='relative flex'>
              {/* site icon */}
              {siteIcon !== undefined && (
                <Image
                  src={typeof siteIcon === 'string' ? siteIcon : URL.createObjectURL(siteIcon)}
                  alt='site icon'
                  className='h-auto max-h-52 w-60 object-cover'
                  width={60}
                  height={60}
                />
              )}

              <div className='absolute left-0 top-12 flex h-full w-60 items-end justify-center'>
                <Button
                  label='Resmi değiştir'
                  text
                  rounded
                  severity='help'
                  icon='pi pi-image'
                  iconPos='left'
                  onClick={openFileInput}
                />
                <input ref={inputRef} type='file' accept='image/*' className='hidden' onChange={handleFileChange} />
              </div>
            </div>
          </div>

          {/* Kaydet ve iptal Butonu */}

          <div className='relative flex justify-end gap-3'>
            <ConfirmPopup />

            <Button
              label='Kaydet'
              onClick={confirmSave}
              severity='success'
              loading={saveLoading || isSiteSettingsLoading}
            />
            <Button
              label='Reset'
              onClick={confirmReset}
              className='ml-3'
              severity='danger'
              loading={saveLoading || isSiteSettingsLoading}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Settings
