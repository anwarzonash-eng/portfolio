
import { MoveUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function UpworkActivitySection({ urlInfo, cvTrue, data }) {

  const upworkActivityList = [
    {
      id: 1,
      title: "5000+ Hour Tracked for clients",
      content: "With over 2500 hours logged, I bring extensive experience in delivering exceptional web development projects that drive results."
    },
    {
      id: 2,
      title: "70+ Project Completed",
      content: "Having successfully completed over 35 web development projects, I have a proven track record of building innovative and user-focused websites."
    },
    {
      id: 3,
      title: "Rated 5 stars by Clients",
      content: "Rated 5 stars by my clients, I pride ourselves on exceeding expectations with high-quality web development services. Your satisfaction drives my commitment to excellence."
    },
  ]

  const upworkFinancialActivityList = [
    {
      id: 1,
      title: "Hourly rate",
      content: "$10.00 - $30.00"
    },

    {
      id: 2,
      title: "Total earned",
      content: "$100K+"
    },
    {
      id: 3,
      title: "Total hours completed on Upwork",
      content: "5,000+"
    },
    {
      id: 4,
      title: "Total jobs on Upwork",
      content: "70+"
    },
    {
      id: 5,
      title: "Upwork Member since",
      content: "Jan 31, 2022"
    },
  ]

  // console.log("URLInfo: ",urlInfo)
  return (

    <section className={`${urlInfo?.domain === "findusman.me" ? "w-full " : "hidden"} ${cvTrue ? "py-0" : "py-10"} bg-white `}>
      <div className={`${cvTrue ? "p-[2rem] lg:p-[3rem]" : "mainContainer"}`}>

        {/* Top Content */}
        <div className='flex items-center flex-wrap justify-center lg:justify-between w-full gap-5'>
          <Link href={data?.upwork ?? "#"} target='_blank' className="py-2 inline-block">
            <img src="/images/up-logo.png" alt="Upwork Logo" />
          </Link>
          <div className='flex items-center gap-2'>
            <Link href={data?.upwork ?? "#"} target='_blank' className="
          bg-black text-white border border-transparent hover:border-primary hover:bg-white hover:text-primary duration-300 text-nowrap
          flex items-center justify-center
          text-[2rem] rounded-[20rem] px-[2rem] py-[1rem] group">
              <span>Check My</span>
              <div className='h-[3rem] w-[3rem] rounded-full relative mx-2 inline-block'>
                <Image
                  src="/images/upworkforContactComponent.svg"
                  alt="Upwork Logo" width={30} height={30} className='h-full w-full object-cover rounded-full group-hover:border-primary border border-transparent duration-300
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
              </div>
              <span>Profile</span>
            </Link>
            <Link href={data?.upwork ?? "#"} target='_blank' className='h-[4rem] w-[4rem] rounded-full relative mx-2 bg-sectionBG text-white flex items-center justify-center animate-bounce cursor-pointer hover:bg-white hover:text-primary border border-transparent hover:border-primary duration-300'>
              <MoveUpRight />
            </Link>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="px-4 py-8 flex flex-col lg:flex-row-reverse gap-8 w-full">
          {/* Upwork Activity Column */}
          <div className='lg:w-1/2'>
            <h2 className={`text-[2.5rem] ${cvTrue ? "lg:text-[3rem]" : "lg:text-[4rem]"} font-bold mb-[1rem] max-lg:text-center`}>My <Link href={data?.upwork ?? "#"} target='_blank' className='text-primary'>Upwork</Link> Activities</h2>
            <ul className="space-y-4">
              {upworkActivityList.map((item) => (
                <li className="flex" key={item.id}>
                  <span className="upworkSectionDot"></span>
                  <div>
                    <p className="text-[1.6rem] lg:text-[2.4rem] 
                    font-semibold">{item.title}</p>
                    <p className="text-heading text-[1.4rem] lg:text-[1.5rem]">{item.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/*Financial Activity Column */}
          <div className='lg:w-1/2'>
            <h2 className={`text-[2.5rem] ${cvTrue ? "lg:text-[3rem]" : "lg:text-[4rem]"} font-bold mb-[1rem] max-lg:text-center`}>My <Link href={data?.upwork ?? "#"} target='_blank' className='text-primary'>Upwork</Link> Finanancial Activities</h2>
            <div className="space-y-4">
              {upworkFinancialActivityList.map((item) => (
                <div key={item.id}>
                  <p className="text-heading text-[1.8rem]">{item.title}</p>
                  <p className="text-[1.8rem] lg:text-[2.4rem] font-semibold">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpworkActivitySection