import { getAbout } from '@/services/about/about'
import { getContact } from '@/services/contact/contact'
import to from 'await-to-js'
import { Messages } from 'primereact/messages'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaLocationArrow, FaPhone } from 'react-icons/fa'
import { MdMail } from 'react-icons/md'

const AboutUs = () => {
  const [about, setAbout] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [phone, setPhone] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const msgs = useRef<Messages>(null)

  const fetchAbout = async () => {
    setLoading(true)
    const [err, data] = await to(getAbout())
    if (err) {
      msgs.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: err.message,
        life: 3000
      })
      return setLoading(false)
    }
    setAbout(data.data)
    setLoading(false)
  }

  const fetchContact = async () => {
    setLoading(true)
    const [err, data] = await to(getContact())
    console.log('contact', data)
    if (err) {
      msgs.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: err.message,
        life: 3000
      })
      return setLoading(false)
    }
    if (!data.data) return
    setAddress(data.data.address)
    setPhone(data.data.phone)
    setEmail(data.data.email)
    setLoading(false)
  }

  useEffect(() => {
    fetchAbout()
    fetchContact()
  }, [])

  const renderAbout = useCallback(
    (about: string | null, address: string | null, phone: string | null, email: string | null) => {
      return (
        <div className='mx-auto flex w-full flex-col items-center justify-center lg:w-2/3'>
          <div className='my-10 flex flex-col items-center justify-center'>
            <div className='my-10 flex items-center gap-7 '>
              <div className='h-1 w-full bg-black md:w-11' />

              <h2 className='text-center text-4xl font-bold text-gray-800'>
                <span className='px-20'>Hakkımızda</span>
              </h2>
              <div className='h-1 w-full bg-black md:w-11' />
            </div>
            {about ? (
              <p
                dangerouslySetInnerHTML={{ __html: about }}
                className='w-full px-10 text-center text-sm text-gray-800 md:w-3/4'
              />
            ) : (
              <p className='w-full px-10 text-center text-sm text-gray-800 md:w-3/4'>Hakkımızda bilgi bulunamadı.</p>
            )}
          </div>
          {/* iletişim */}
          <div className='my-10 flex flex-col items-center justify-center'>
            <div className='flex items-center gap-7 '>
              <div className='h-1 w-full bg-black md:w-11' />

              <h2 className='text-center text-4xl font-bold text-gray-800'>
                <span className='px-20'>İletişim</span>
              </h2>
              <div className='h-1 w-full bg-black md:w-11' />
            </div>

            <div className='my-10 flex flex-col items-center justify-center'>
              <div className='my-10 flex flex-col justify-center gap-9'>
                <span className='text-center text-lg font-bold text-gray-800'>Adres</span>
                <div className='flex gap-4'>
                  <FaLocationArrow className='text-2xl' />
                  {address ? <p>{address}</p> : <p>Adres bilgisi bulunamadı.</p>}
                </div>

                <span className='text-center text-lg font-bold text-gray-800'>Telefon</span>
                <div className='flex gap-4'>
                  <FaPhone className='text-2xl' />
                  {phone ? (
                    <>
                      <p>{phone}</p>
                      <a href={`tel:${phone}`} className='text-primary'>
                        Aramak için tıklayın
                      </a>
                    </>
                  ) : (
                    <p>Telefon bilgisi bulunamadı.</p>
                  )}
                </div>

                <span className='text-center text-lg font-bold text-gray-800'>Email</span>
                <div className='flex gap-4'>
                  <MdMail className='text-2xl' />
                  {email ? (
                    <>
                      <p>{email}</p>
                      <a href={`mailto:${email}`} className='text-primary'>
                        Mail atmak için tıklayın
                      </a>
                    </>
                  ) : (
                    <p>Email bilgisi bulunamadı.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    []
  )

  return (
    <>
      {loading ? (
        <div className='flex w-full justify-start'>
          <ProgressSpinner />
        </div>
      ) : (
        renderAbout(about, address, phone, email)
      )}
    </>
  )
}

export default AboutUs
