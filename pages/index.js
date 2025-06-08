import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import GoogleSearch from './components/GoogleSearch'
import Link from 'next/link'
import portoProfilePic from '../public/personal/porto-profile-pic.jpg'
import profileInfo from '../public/personal/profile-info.json'

// svg icons
import phone from '../public/phone.svg'
import email from '../public/email.svg'
import linkedin from '../public/linkedin.svg'
export default function Home() {
  return (
    <div className='grid   h-screen' >
      <div className="grid m-auto w-fit h-fit p-6 rounded-xl bg-[#2c2f33]">
        <div className="grid md:grid-cols-[160px_1fr] md:gap-4 py-2">
          <div className="xsm:grid md:block">
            <div className=" xsm:grid xsm:m-auto md:block rounded-full overflow-hidden border-4 shadow h-fit w-fit translate duration-500 ease-in-out hover:scale-125">
              <Image
                src={portoProfilePic}
                alt="Picture of the author"
                width={160}
                height={160}
              />
            </div>
            <div className='flex flex-wrap justify-center gap-2 pt-2'>
              <a href={`tel:${profileInfo.phone}`} className='translate duration-500 ease-in-out hover:scale-125 flex items-center text-gray-200 hover:text-gray-300'>
                <span>
                  <div className=" rounded-full p-[5px] border-2  border-green-400">
                    <Image src={phone} alt="phone icon" width={15} height={15} />
                  </div>
                </span>
              </a>
              <span>
                <a href={`mailto:${profileInfo.email}`} className='translate duration-500 ease-in-out hover:scale-125 flex items-center text-gray-200 hover:text-gray-300' rel="noreferrer">
                  <div className=" rounded-full p-[5px] border-2 border-blue-400">
                    <Image src={email} alt="email icon" width={15} height={15} />
                  </div>
                </a>
              </span>
              <span>
                <a target='_blank' href={`${profileInfo.linkedin}`} className='translate duration-500 ease-in-out hover:scale-125 flex items-center text-gray-200 hover:text-gray-300' rel="noreferrer">
                  <div className=" rounded-full p-[5px] border-2 border-blue-600">
                    <Image src={linkedin}  alt="email icon" width={15} height={15} />
                  </div>
                </a>
              </span>

            </div>
          </div>
          <div className="py-6 text-white max-w-[26rem] xsm:px-[5%] md:px-[1%] ">
            <div className="leading-relaxed">

              <div className="w-fit">
                <p className='text-gray-300 text-right xsm:text-sm md:text-base'>{profileInfo.socialTag}</p>
                <h1 className='xsm:text-3xl md:text-5xl'>{profileInfo.name}</h1>
              </div>
              <h2 className=' text-gray-200 md:text-[1.05rem] inline-block'>{profileInfo.quote}, {profileInfo.supQuote}</h2>
              <h3 className='text-2xl pt-2 md:px-2'>
                <span className='xsm:text-xs md:text-sm flex flex-wrap'>
                  {profileInfo.skills && profileInfo.skills.map((skill, index) => (
                    <span
                      className='py-1 px-2 m-1 font-bold rounded-full border shadow'
                      style={
                        {
                          // random background color for each skill
                          backgroundColor: `${skill[1]}`
                        }
                      }
                      key={index}>{skill[0]} </span>
                  ))}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
