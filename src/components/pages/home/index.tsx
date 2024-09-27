'use client';
import Image from 'next/image';
import VideoPlayer from '@/components/VideoPlayer';
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor';
import HomeSlider from '@/components/Sliders/HomeSlider';
import Faqs from '@/components/Faqs';
import WorkProofLinks from '@/components/WorkProofLinks';
import ContactMeLinks from '@/components/ContactMeLinks';
import MyServices from '@/components/MyServicesCards';
import TestimonialSlider from '@/components/Sliders/TestimonialSlider';
import FreeTrialPopup from '@/components/FreeTrialPopup';
import Welcome from '@/components/Welcome';
import { useEffect, useState } from 'react';
import { formatPhoneNumber } from '@/hooks/formatPhoneNumber';
import Link from 'next/link';
import { formatDate } from '@/hooks/formatdate';
import { modifiedContent } from '@/hooks/modifiedContent';
import { dateFormatsOptions } from '@/data/JsonData';
import WebsiteLoader from '@/components/WebsiteLoader';
import { useSearchParams } from 'next/navigation';
import { getRoutesDetails } from '@/hooks/url';
import { skillsSyncApi } from '@/apiHandlers/skillsApi';
import { reportsApiHandler } from '@/hooks/apihandlers/reportsApiHandlers';
import { handleSkillsApiCall } from '@/hooks/apihandlers/skillsApiHandlers';
import { getColors, updateCSSVariables } from '@/hooks/colors';
import { store } from '@/store';
import { setProfileLoading, setProfileUrlInfo } from '@/store/profileSlice';
import { downloadFile } from '@/hooks/downloadFile';
import OurBlogs from '@/components/OurBlogs';
import Newsletter from '@/components/Newsletter';
import PageRendering from '@/components/PageRendering';

const Home = ({ params }: { params: any }) => {
  useBodyBackgroundColor('#f8f9fa');
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: 'home',
        urlInfo,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    if (listOfdata) {
      // console.log(listOfdata);
      // skillsSyncApi({ setListOfSkills });
    }
    listOfdata && handleSkillsApiCall({ setListOfSkills });
  }, [listOfdata]);

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  return (
    <>
      <main className='w-full'>
        <PageRendering
          props={{
            list: listOfdata,
            loading: loading,
            actualPage: (
              <>
                <FreeTrialPopup listOfdata={listOfdata} urlInfo={urlInfo} />
                {/* <Welcome /> */}

                {/* Hero Section */}
                <div className='w-full overflow-hidden relative bg-bannerBG'>
                  {/*Hero Section For Mobile and Tablet Devices*/}
                  <div className='mainContainer relative xl:hidden'>
                    {/* Hero Section Mobile Content */}
                    <div className='text-center mt-[7.6rem]'>
                      <p className='text-heading text-[2rem] md:text-[3.66rem] font-normal'>
                        Hello! I’m
                      </p>
                      <div className='mt-[0.5rem] font-bold text-[4rem] md:text-[8rem] lg:text-[12rem] text-primary  gap-[1rem] relative inline-block'>
                        <h1>{listOfdata?.name}</h1>
                        {/* Positioned Image */}
                        <Image
                          src={'/images/mobileStars.svg'}
                          height={45}
                          width={45}
                          alt='Mobile Stars'
                          className='max-[365px]:hidden block mt-[1rem] h-[4.5rem] w-[4.5rem] absolute top-0 right-[-4.5rem]'
                        />
                      </div>
                      {/* Badge */}
                      <div className='flex items-center justify-center lg:justify-start max-w-[88rem] mx-auto'>
                        <button className='px-[2rem] py-[1.5rem] md:py-[2rem] md:px-[4rem] bg-primary rounded-[5rem] text-center text-[1.6rem] md:text-[2.4rem] font-bold text-white border-none outline-none my-[2rem] lg:mb-auto'>
                          {listOfdata?.designation}
                        </button>
                      </div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: listOfdata?.tag_line,
                        }}
                        className='mb-[2rem] text-primary leading-[2rem] text-[1.6rem] text-center lg:hidden'
                      ></p>
                      {listOfdata &&
                        listOfdata.skills_ids &&
                        listOfdata.skills_ids.length > 0 && (
                          <div className='w-full p-[1.5rem] flex justify-center items-center gap-[0.6rem] flex-wrap lg:hidden'>
                            {listOfdata?.skills_ids?.map((skill, index) => (
                              <div
                                key={index}
                                className='hover:bg-primary px-[1.4rem] py-[0.7rem] bg-white rounded-[5rem] shadow border border-[#767676] border-solid flex justify-center items-center gap-[1rem]'
                              >
                                <Link
                                  href={skill?.url}
                                  className=' hover:text-white text-center text-primary text-[1.4rem] font-medium'
                                >
                                  {skill?.title}
                                </Link>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                    {/*Hero Section Developer Image */}
                    <div className='relative mt-[-3rem]  md:flex justify-center'>
                      <Image
                        width={731}
                        height={707}
                        alt=''
                        src={listOfdata?.profile_photo_2}
                      />
                      {/* Positioned Elementes Price */}

                      <div className='flex gap-[0.35rem] text-nowrap text-primary text-[1.4rem] font-medium rounded-[3.5rem] py-[0.69rem] bg-white shadow-lg px-[1.2rem] absolute top-[8%] left-[90%] translate-x-[-90%] md:left-[80%] md:translate-x-[-80%] animate-pulse min-w-max'>
                        <Image
                          src={'/images/clock.svg'}
                          height={14}
                          width={14}
                          alt='Clock'
                        />
                        <p>45 hr / Week Availability</p>
                      </div>

                      {/* Positioned Elementes Availability */}
                      <div className='flex gap-[0.35rem] text-nowrap text-primary text-[2rem] font-medium rounded-[3.5rem] py-[0.69rem] bg-white shadow-lg max-w-max px-[0.9rem] pr-[1.4rem] absolute bottom-[25%] left-[10%] translate-x-[-15%] md:left-[20%] md:translate-x-[-20%] animate-pulse'>
                        <Image
                          src={'/images/dollar-symbol.svg'}
                          height={14}
                          width={14}
                          alt='Dollar Symbol'
                          className='h-[auto] w-[auto]'
                        />
                        <p>${listOfdata?.hourly_rate} / hour</p>
                      </div>
                    </div>
                  </div>
                  {/* Hero Section For Desktop */}
                  <div className='mainContainer hidden xl:block'>
                    <div className='text-center mt-[3rem]'>
                      <p className='text-heading text-[3.66rem] font-normal leading-normal mb-[1rem]'>
                        Hello! I’m
                      </p>
                      <h1 className='font-bold md:text-[8rem] lg:text-[12rem] text-primary mt-[-3.5rem]'>
                        {listOfdata?.name}
                      </h1>
                      {/* Badge */}
                      <div className='flex items-center justify-center lg:justify-start max-w-[88rem] mx-auto mt-[-1.5rem] relative z-[50]'>
                        <button className='px-[2rem] py-[1.5rem] lg:py-[1rem] lg:px-[4rem] bg-primary rounded-[5rem] text-center text-[1.6rem] lg:text-[2.4rem] font-bold text-white border-none outline-none mb-[2rem] cursor-pointer '>
                          {listOfdata?.designation}
                        </button>
                      </div>
                      <div className='mt-[-15rem] flex justify-center relative'>
                        {/* Center Dev Image */}
                        <Image
                          width={731}
                          height={707}
                          alt=''
                          src={listOfdata?.profile_photo_2}
                          className=''
                        />
                        {/* Left Pricing and Hours Badge Positoned */}
                        <div className='absolute left-0 top-[24rem] w-[33.5rem] h-[18rem] inline-flex items-center justify-center bg-Circle bg-no-repeat bg-contain animate-bounce'>
                          <div className='h-[100px] p-5 rounded  justify-center items-center gap-5 inline-flex'>
                            <div className='text-primary'>
                              <h3 className='text-[4rem] font-medium leading-[4rem]'>
                                ${listOfdata?.hourly_rate}
                              </h3>
                              <p className='text-[2rem] font-normal'>hour</p>
                            </div>
                            <hr className='h-[6rem] w-[0.1rem] bg-border' />
                            <div className='text-primary'>
                              <h3 className='text-[4rem] font-medium leading-[4rem]'>
                                40hr
                              </h3>
                              <p className='text-[2rem] font-normal'>week</p>
                            </div>
                          </div>
                        </div>
                        {/* Positioned Skills and Text Desktop */}
                        <div className='max-w-[55rem] w-full absolute right-[-4rem] top-[7rem]'>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: listOfdata?.tag_line,
                            }}
                            className='w-full text-primary text-[2.2rem] font-medium leading-[3rem] mb-[2rem] text-left'
                          ></p>

                          {listOfdata &&
                            listOfdata.skills_ids &&
                            listOfdata.skills_ids.length > 0 && (
                              <div className='max-w-[49rem] w-full rounded-[0.6rem] border border-border border-solid overflow-hidden'>
                                <div className='h-[4.8rem] w-full p-[1.5rem] bg-primary border-b border-border flex justify-start items-center gap-2.5 text-center text-white text-[1.8rem] font-medium'>
                                  My Skills
                                </div>

                                <div className='w-full p-[1.5rem] bg-white/70 backdrop-blur-xl justify-start items-center gap-[0.6rem] flex flex-wrap'>
                                  {listOfdata?.skills_ids?.map(
                                    (skill, index) => (
                                      <div
                                        key={index}
                                        className='hover:bg-primary hover:text-white  px-[21px] py-[0.8rem] bg-white rounded-[5rem] shadow border border-[#757575] justify-center items-center gap-[1rem] flex opacity-0 animate-fadeIn'
                                        style={{
                                          animationDelay: `${index * 0.3}s`,
                                        }}
                                      >
                                        <Link
                                          href={skill?.url}
                                          className=' hover:text-white text-center text-primary text-[1.8rem] font-medium'
                                        >
                                          {skill?.title}
                                        </Link>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Custom Shape Divider */}
                  <div className='custom-shape-divider-bottom-1722849639'>
                    <svg
                      data-name='Layer 1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 1200 120'
                      preserveAspectRatio='none'
                    >
                      <path
                        d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
                        className='shape-fill'
                      />
                    </svg>
                  </div>
                </div>

                {/* About Section Completed*/}
                <section className='w-full mb-[5rem]'>
                  {/* Container Div*/}
                  <div className='mainContainer flex flex-col-reverse gap-[5rem] xl:gap-0 xl:flex-row items-center justify-center xl:justify-between'>
                    {/* Container For Image and Badges */}
                    <div className='w-full h-full xl:w-[67rem] xl:h-[64rem] flex-shrink-0 max-xl:flex  justify-center'>
                      <div
                        className='relative h-[44rem] xl:h-[65rem] max-w-[56rem] bg-center bg-cover bg-no-repeat w-full rounded-[1rem]'
                        style={{
                          backgroundImage: `url('${listOfdata?.profile_photo_3}')`,
                        }}
                      >
                        {/* Experience Badge */}
                        <div className='bg-white rounded-[0.8rem] absolute   bottom-auto left-auto top-[-3rem] right-[3rem] xl:top-[7rem] xl:right-[-8rem] p-[1.4rem] xl:h-[12rem] xl:w-[26rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] xl:gap-[2rem] animate-bounce'>
                          {/* Badge SVG */}
                          <div className='bg-[#2A97FC] rounded-[50%] flex items-center justify-center h-[4.9rem] w-[4.9rem] xl:h-[6.8rem] xl:w-[6.8rem]'>
                            <img
                              src='./images/experience.svg'
                              alt='Experience'
                              className='h-[2.4rem] w-[2.4rem] xl:h-[3.4rem] xl:w-[3.4rem]'
                            />
                          </div>
                          {/* Badge Content */}
                          <div className='flex flex-col justify-center'>
                            <h3 className='uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold  text-heading leading-none mt-[1rem]'>
                              Experience
                            </h3>
                            <p className='text-[2.4rem] xl:text-[3rem] font-bold text-primary'>
                              {listOfdata?.no_of_experiences}+{' '}
                              <span className='text-[2rem]'>
                                {listOfdata?.no_of_experiences === 1
                                  ? 'year'
                                  : 'years'}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Projects Badge */}
                        <div className='bg-white  mb-3 rounded-[0.8rem] absolute   top-auto right-auto bottom-[-4rem]   xl:bottom-[3rem] xl:left-[3rem] left-[3rem] p-[1.4rem] xl:h-[12rem] xl:rounded-[2rem] flex items-center shadow-md gap-[1rem] xl:gap-[2rem] animate-bounce xl:animate-none'>
                          {/* Badge SVG */}
                          <div className='bg-[#FC822A] rounded-[50%] flex items-center justify-center h-[4.9rem] w-[4.9rem] xl:h-[6.8rem] xl:w-[6.8rem]'>
                            <img
                              src='./images/badge.svg'
                              alt='Experience'
                              className='h-[2.4rem] w-[2.4rem] xl:h-[3.4rem] xl:w-[3.4rem]'
                            />
                          </div>
                          {/* Badge Content */}
                          <div className='flex flex-col justify-center'>
                            <h3 className='uppercase text-[1.4rem] xl:text-[1.8rem] font-semibold  text-heading leading-none mt-[1rem]'>
                              Projects Completed
                            </h3>
                            <p className='text-[2.4rem] xl:text-[3rem] font-bold text-primary'>
                              {listOfdata?.projects_completed}+
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Contact Details */}
                    <div className='w-full'>
                      {/* About Context */}
                      <div className='w-full'>
                        {/* Badge */}
                        <div className='px-[2rem] mt-[3rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium  font-Inter leading-[2rem]'>
                          About Me
                        </div>
                        {/* Heading */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: listOfdata?.tag_line,
                          }}
                          className='text-heading text-[2.4rem] mt-[2rem] mb-[1.2rem] font-medium leading-[2.8rem] lg:text-[3rem] lg:leading-[3.8rem]'
                        ></div>
                        {/* Paragraph */}
                        {listOfdata?.designation && (
                          <p className='text-[1.6rem] font-normal text-paragraph1  leading-[2.4rem]'>
                            Currently Open for full time position as a{' '}
                            <span className='lowercase'>
                              {listOfdata?.designation}
                            </span>
                            .
                          </p>
                        )}
                      </div>
                      {/* Info Cards */}
                      <div className='my-[2rem] rounded-[0.8rem] overflow-hidden  w-full grid grid-cols-12'>
                        <div
                          className={`w-full border border-border border-solid py-[3rem] px-[2rem] col-span-12 ${
                            urlInfo?.u ? 'md:col-span-12' : 'md:col-span-6'
                          }`}
                        >
                          <div className='w-full'>
                            <h4 className='hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary'>
                              {listOfdata?.name}
                            </h4>
                            <p className='text-[1.4rem] font-normal text-paragraph1'>
                              Name
                            </p>
                          </div>
                        </div>
                        {!urlInfo?.u && (
                          <div className='md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]'>
                            <div className='w-full text-wrap break-words'>
                              <Link
                                href={`mailto:${listOfdata?.email}`}
                                className='hover:font-bold  text-[1.6rem] duration-300  font-normal text-primary '
                              >
                                {listOfdata?.email}
                              </Link>
                              <p className='text-[1.4rem] font-normal text-paragraph1'>
                                Email
                              </p>
                            </div>
                          </div>
                        )}

                        {!urlInfo?.u && (
                          <div className='md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]'>
                            <div className='w-full'>
                              <Link
                                href={`tel:${listOfdata?.phone_no}`}
                                className='hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary'
                              >
                                {formatPhoneNumber(listOfdata?.phone_no)}
                              </Link>
                              <p className='text-[1.4rem] font-normal text-paragraph1'>
                                Contact
                              </p>
                            </div>
                          </div>
                        )}

                        <div
                          className={`w-full border border-border border-solid py-[3rem] px-[2rem]  col-span-12 ${
                            urlInfo?.u ? 'md:col-span-12' : 'md:col-span-6'
                          }`}
                        >
                          <div className='w-full'>
                            <Link
                              target='_blank'
                              href={`https://www.google.com/maps/place/${listOfdata?.location}
                )}`}
                              className='hover:font-bold  text-[1.6rem] duration-300 font-normal text-primary'
                            >
                              {listOfdata?.location}
                            </Link>
                            <p className='text-[1.4rem] font-normal text-paragraph1'>
                              Address
                            </p>
                          </div>
                        </div>

                        <div
                          className={`w-full border border-border border-solid py-[3rem] px-[2rem]  col-span-12 ${
                            urlInfo?.u ? 'md:col-span-12' : 'md:col-span-6'
                          }`}
                        >
                          <div className='w-full flex items-center gap-[1.4rem] mb-[0.8rem]'>
                            <WorkProofLinks
                              props={{
                                upwork: listOfdata?.upwork,
                                github: listOfdata?.github,
                                linkedIn: listOfdata?.linkedIn,
                                behance_link: listOfdata?.behance_link,
                                u: urlInfo?.u,
                              }}
                            />
                          </div>
                          <p className='text-[1.35rem] font-normal text-paragraph1'>
                            My Work Proof
                          </p>
                        </div>
                        {!urlInfo?.u && (
                          <div className='md:col-span-6 col-span-12 w-full border border-border border-solid py-[3rem] px-[2rem]'>
                            <div className='w-full flex items-center  gap-[1.4rem] mb-[0.8rem]'>
                              <ContactMeLinks
                                props={{
                                  email: listOfdata?.email,
                                  phone_no: listOfdata?.phone_no,
                                }}
                              />
                            </div>
                            <p className='text-[1.35rem] font-normal text-paragraph1'>
                              Contact Me
                            </p>
                          </div>
                        )}
                      </div>
                      {/* Button Line */}
                      <div className='md:space-x-5 py-[2rem] '>
                        <Link href={'/cv'}>
                          <button className='w-full md:max-w-max btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom'>
                            {' '}
                            View CV Online
                          </button>
                        </Link>

                        {listOfdata?.is_pdf_generated &&
                          listOfdata?.pdf_download_links?.length > 0 &&
                          listOfdata.pdf_download_links
                            .filter((link) => link.type === 'CV')
                            .map((cvLink, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  downloadFile(
                                    cvLink.cvFileUrl,
                                    `${listOfdata?.name} - CV`
                                  )
                                }
                                className='w-full md:max-w-max mt-5 md:mt-0 btn-primary rounded-[0.6rem] text-white py-[2rem] px-[5.6rem] text-[1.8rem] font-medium border border-solid border-custom'
                              >
                                Download CV
                              </button>
                            ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Custom Video Player Section */}
                {listOfdata?.video_attached?.videoURL && (
                  <div className='w-full mb-[10rem] xl:mb-[12rem] mainContainer'>
                    {/* <VideoPlayer
            videoSrc={listOfdata?.video_attached?.videoURL}
            videoClassName='rounded-[1.2rem] h-full w-full h-[40rem] lg:h-[70rem] object-cover'
            thumbnailSrc={
              listOfdata?.profile_photo_3 || '/images/thumbnail.png'
            }
            containerClassName='rounded-[1.2rem] max-w-[1550px] mx-auto w-full'
            thumbnailClassName='rounded-[1.2rem] h-[40rem] lg:h-[70rem]'
            thumbnailImage='rounded-[1.2rem] object-cover h-full w-full'
            playButtonClassName='w-[100px] h-[100px] relative border-[0.4rem] rounded-[3.2rem] flex items-center justify-center backdrop-blur-[2.2rem] '
            closeButtonClassName='rounded-full custom-close-button'
            playIcon='/images/Play.svg'
            closeIcon='/images/close-icon.svg'
          /> */}
                    <video
                      autoPlay
                      muted
                      loop
                      controls
                      className='rounded-xl h-[40rem] lg:h-[70rem] w-full object-cover'
                    >
                      <source
                        src={listOfdata?.video_attached?.videoURL}
                        type='video/mp4'
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {listOfdata && listOfdata?.skills_ids?.length > 0 && (
                  <>
                    {/* Skills Section Completed */}
                    <div className='mainContainer my-[5rem] '>
                      {/* Badge */}
                      <div className='px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto'>
                        Skills
                      </div>
                      {/* Heading */}
                      <div className='text-center text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]'>
                        The skills, tools and technologies I am really good at:
                      </div>
                      {/* Skills Container */}
                      <div className='flex items-center justify-center flex-wrap gap-[1.5rem] mt-[6rem]'>
                        {listOfdata?.skills_ids?.map((skill, index) => (
                          <div
                            key={index}
                            className='flex flex-col items-center justify-center gap-[0.8rem] max-w-[10rem] lg:max-w-[13rem] w-full'
                          >
                            {skill.icon && (
                              <div className='flex items-center justify-center'>
                                <Image
                                  src={skill?.icon}
                                  alt={skill?.title}
                                  height={64}
                                  width={64}
                                  className='h-[6.4rem] w-[6.4rem] rounded-full'
                                />
                              </div>
                            )}
                            <p className='text-paragraph1 text-center text-[1.8rem] leading-[2.8rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                              {skill.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>{' '}
                  </>
                )}

                {/* Services Section Completed */}
                {listOfdata &&
                  listOfdata?.services &&
                  listOfdata?.services?.length > 0 && (
                    <section className='w-full bg-sectionBG my-[5rem]'>
                      <div className='mainContainer py-[5rem] xl:py-[10rem]'>
                        {/* Badge */}
                        <div className='px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto'>
                          My Services
                        </div>
                        {/* Heading */}
                        <div className='text-center text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]'>
                          I am not limited with this only services. Together we
                          can do more
                        </div>
                        {/* Services Cards */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:flex xl:grid lg:grid-cols-4 place-items-center items-center justify-center gap-[2.4rem] mt-[6rem] md:flex-wrap '>
                          <MyServices services={listOfdata?.services} />
                        </div>
                      </div>
                    </section>
                  )}

                {listOfdata &&
                  listOfdata.portfolios_ids &&
                  listOfdata.portfolios_ids.length > 0 && (
                    <>
                      {/* My Work Section Slider  */}
                      <section className='w-full my-[5rem]'>
                        <div className='mainContainer my-[5rem]'>
                          {/* Badge */}
                          <div className='px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto'>
                            My Work
                          </div>
                          {/* Heading */}
                          <div className='text-center text-heading text-[3rem] font-medium leading-[2.8rem] mt-[2rem]'>
                            Explore My Technical Endeavors
                          </div>

                          {/* Home Page Slider */}
                          <HomeSlider portfolios={listOfdata?.portfolios_ids} />
                        </div>
                      </section>
                    </>
                  )}

                {listOfdata &&
                  listOfdata.experiences_ids &&
                  listOfdata.experiences_ids.length > 0 && (
                    <>
                      {/* Professional Experience Timeline Section Completed */}
                      <section className='w-full'>
                        <div className='mainContainer '>
                          {/* Badge */}
                          <div className='px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto'>
                            Professional Experience
                          </div>
                          {/* Heading */}
                          <div className='text-center text-heading text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]'>
                            My Professional Career Journey
                          </div>
                          {/* Timeline */}
                          <div className='mainContainer flex items-center justify-center mt-[2rem] '>
                            <div className='relative'>
                              {/* Vertical line */}
                              <div className='absolute left-[10rem] top-[3rem] w-[0.4rem] h-[100%] bg-border  mx-[2.1rem] hidden lg:block' />
                              {listOfdata?.experiences_ids &&
                                [...listOfdata.experiences_ids]
                                  ?.sort(
                                    (a, b) =>
                                      new Date(b.ending_Date).getFullYear() -
                                      new Date(a.ending_Date).getFullYear()
                                  )
                                  ?.map((experience, index) => (
                                    <>
                                      {/* Timeline items Container */}
                                      <div className='space-y-[1rem] lg:space-y-[3rem] lg:space-x-[9rem] mt-10'>
                                        {/* Date and divider */}
                                        <div className='ml-[0.5rem] lg:mb-auto lg:ml-auto lg:absolute left-[-1.6rem] z-10 text-[1.8rem] text-paragraph1 capitalize'>
                                          {formatDate(
                                            experience.starting_date,
                                            dateFormatsOptions.onlyYear
                                          )}{' '}
                                          -{' '}
                                          {isNaN(
                                            new Date(
                                              experience.ending_Date
                                            ).getFullYear()
                                          )
                                            ? experience.ending_Date
                                            : formatDate(
                                                experience.ending_Date,
                                                dateFormatsOptions.onlyYear
                                              )}
                                        </div>
                                        {/* Timeline item */}
                                        <>
                                          <div className='relative flex items-start'>
                                            {/* Dot */}
                                            <div className='absolute top-0 left-[2rem] hidden lg:block'>
                                              <div className='w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center'>
                                                <div className='w-[0.7rem] h-[0.7rem] bg-heading rounded-full'></div>
                                              </div>
                                            </div>
                                            {/* Card */}
                                            <div className='bg-white p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow lg:ml-[6rem] w-full'>
                                              <div className='flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between'>
                                                {/* About Content */}
                                                <div className='flex gap-[1rem]'>
                                                  {experience?.thumbnail && (
                                                    <div className='h-[4.2rem] w-[4.2rem] lg:h-[4.9rem] lg:w-[4.9rem] bg-[#D1E9FF] rounded-[0.4rem] flex items-center justify-center'>
                                                      <Image
                                                        src={
                                                          experience?.thumbnail
                                                        }
                                                        height={32}
                                                        width={32}
                                                        alt='Logo Mark'
                                                      />
                                                    </div>
                                                  )}
                                                  <div>
                                                    <p className='text-[1.4rem] lg:text-[1.6rem] font-normal text-paragraph1'>
                                                      {experience?.company_name}
                                                    </p>
                                                    <h3 className='text-[1.6rem] lg:text-[1.8rem] font-medium text-heading'>
                                                      {experience?.title}
                                                    </h3>
                                                  </div>
                                                </div>

                                                {/* Link */}

                                                <div className='flex justify-center md:justify-end w-full md:w-auto'>
                                                  <div className='flex flex-col-reverse gap-[1rem] max-w-max'>
                                                    <div className=' py-[0.4rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem] hover:bg-primary hover:text-white '>
                                                      <Link
                                                        href={
                                                          experience?.company_website ||
                                                          '#'
                                                        }
                                                        className='flex gap-2 justify-center align-middle items-center hover:text-white hover:text-semibold'
                                                      >
                                                        <Image
                                                          src={
                                                            '/images/link.svg'
                                                          }
                                                          height={18}
                                                          width={18}
                                                          alt='Link'
                                                        />{' '}
                                                        {
                                                          experience.company_website
                                                            .replace(
                                                              /^(https?:\/\/)?(www\.)?/,
                                                              ''
                                                            )
                                                            .split('/')[0]
                                                        }{' '}
                                                      </Link>
                                                    </div>
                                                    {experience.company_website.includes(
                                                      'upwork'
                                                    ) && (
                                                      <Link
                                                        href={
                                                          experience.company_website
                                                        }
                                                        className='hover:bg-primary hover:text-white py-[0.4rem] px-[1rem] text-heading bg-[#A3DDD3] rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'
                                                      >
                                                        View my Freelance
                                                        Profile
                                                      </Link>
                                                    )}{' '}
                                                  </div>
                                                </div>
                                              </div>

                                              <p
                                                className='mt-[2rem] list-div text-[1.6rem] font-medium text-paragraph1'
                                                dangerouslySetInnerHTML={{
                                                  __html: modifiedContent(
                                                    experience?.short_description,
                                                    listOfskills,
                                                    listOfdata
                                                  ),
                                                }}
                                              ></p>
                                              {/* <p
                      className='my-[2rem] text-paragraph1 text-[1.4rem] list-disc pl-[2rem] flex flex-col gap-[0.8rem]'
                      dangerouslySetInnerHTML={{
                        __html: experience?.long_description,
                      }}
                    ></p> */}
                                              <div className='w-full'>
                                                <h4 className='text-paragraph1 text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]'>
                                                  AREAS OF EXPERTISE I'VE WORKED
                                                  IN
                                                </h4>
                                                <div className='flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]'>
                                                  {experience?.skills?.map(
                                                    (skill, index) => (
                                                      <Link
                                                        key={index}
                                                        href={skill?.url}
                                                        className='py-[0.4rem] px-[2rem] bg-white border border-solid border-sectionBG text-heading rounded-[1.6rem] text-[1.2rem] font-medium leading-normal hover:text-white hover:bg-primary'
                                                      >
                                                        {skill?.title}
                                                      </Link>
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      </div>{' '}
                                    </>
                                  ))}{' '}
                            </div>
                          </div>
                        </div>
                      </section>
                    </>
                  )}

                {/* Testimonial Section */}
                {/* <section className='bg-sectionBG py-[7rem] lg:py-[10rem]'>
      <div className='mainContainer'>
     
        <div className='w-full lg:hidden'>
       
          <div className='px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight'>
            Professional Experience
          </div>
       
          <div className='text-paragraph2 text-[2.4rem] xl:text-[3rem] font-medium leading-[2.8rem] mt-[2rem]'>
            My Professional Career Journey
          </div>
        </div>
       
        <div className='w-full flex gap-[2rem] lg:gap-[10rem] flex-col md:flex-row-reverse  mt-[4rem] lg:items-end'>
          <div className='h-[37.2rem] lg:h-[56.8rem]  max-w-[36.3rem] lg:w-[39.4rem] w-full rounded-[2rem] bg-testmonialBG bg-center bg-no-repeat bg-cover relative  overflow-hidden flex-shrink-0'>
            <div className='absolute bottom-0 left-0 p-[2rem] flex items-center justify-between w-full bg-[rgba(0,0,0,0.05)] '>
              <p className='text-[1.8rem] font-bold text-white leading-[2.4rem]'>
                Founder of <br /> GearUp
              </p>
              <div className='w-[5.8rem] h-[5.8rem] relative border-[0.4rem] rounded-[1.9rem] flex items-center justify-center backdrop-blur-[2.2rem]'>
                <Image
                  src={'/images/Play.svg'}
                  height={20}
                  width={20}
                  className='mr-[-0.5rem]'
                  alt='Play Icon'
                />
              </div>
            </div>
          </div>

          <TestimonialSlider />
        </div>
      </div>
    </section> */}

                {/* FAQ Section Completed */}
                <Faqs urlInfo={urlInfo} companyType={listOfdata?.companytype} />
                {/* Our Blogs */}
                <div className='my-[5rem]'>
                  <OurBlogs listOfdata={listOfdata} />
                </div>
                {/* Newsletter */}
                {!urlInfo?.u && (
                  <div className='w-full mb-[5rem]'>
                    <Newsletter />
                  </div>
                )}
              </>
            ),
          }}
        />
      </main>
    </>
  );
};

export default Home;
