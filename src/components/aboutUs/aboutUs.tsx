import { useGetAbout } from '@/services/about/about'
import { useGetContact } from '@/services/contact/contact'
import Link from 'next/link'
import { Messages } from 'primereact/messages'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useEffect, useRef, useState } from 'react'
import { FaLocationArrow, FaPhone } from 'react-icons/fa'
import { MdMail } from 'react-icons/md'

const AboutUs = () => {
  const [about, setAbout] = useState<string | undefined>(undefined)
  const [address, setAddress] = useState<string | null>(null)
  const [phone, setPhone] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const msgs = useRef<Messages>(null)

  const { data: contactData, isLoading: isContactLoading, error: contactError } = useGetContact()

  const { data: aboutData, isLoading: isAboutLoading, error: aboutError } = useGetAbout()

  useEffect(() => {
    if (aboutError) {
      msgs.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: aboutError.message,
        life: 3000
      })
      return
    }
    console.log(aboutData)
    setAbout(aboutData?.data)
  }, [aboutData, aboutError])

  useEffect(() => {
    if (contactError) {
      msgs.current?.show({
        severity: 'error',
        summary: 'Hata',
        detail: contactError.message,
        life: 3000
      })
    }
    if (!contactData) return
    setAddress(contactData.data.address)
    setPhone(contactData.data.phone)
    setEmail(contactData.data.email)
  }, [contactData, contactError])

  return (
    <>
      {isContactLoading || isAboutLoading ? (
        <div className='flex w-full justify-start'>
          <ProgressSpinner />
        </div>
      ) : (
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
                  <span>{address ?? 'Adres bilgisi bulunamadı.'}</span>
                </div>

                <span className='text-center text-lg font-bold text-gray-800'>Telefon</span>
                <div className='flex gap-4'>
                  <FaPhone className='text-2xl' />
                  {phone ? (
                    <>
                      <p>{phone}</p>
                      <Link href={`tel:${phone}`} className='text-primary'>
                        Aramak için tıklayın
                      </Link>
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
                      <Link href={`mailto:${email}`} className='text-primary'>
                        Mail atmak için tıklayın
                      </Link>
                    </>
                  ) : (
                    <p>Email bilgisi bulunamadı.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AboutUs
