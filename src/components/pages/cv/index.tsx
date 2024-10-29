'use client';

import Image from 'next/image';
import Link from 'next/link';
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor';
import { formatDate } from '@/hooks/formatdate';
import { modifiedContent } from '@/hooks/modifiedContent';
import { useEffect, useState } from 'react';
import PortfolioPopUp from '@/components/PortfolioPopUp';
import {
  blogData,
  contactDetails,
  dateFormatsOptions,
  socialLinks,
} from '@/data/JsonData';
import WebsiteLoader from '@/components/WebsiteLoader';
import { useSearchParams } from 'next/navigation';
import { getRoutesDetails } from '@/hooks/url';
import { reportsApiHandler } from '@/hooks/apihandlers/reportsApiHandlers';
import { handleSkillsApiCall } from '@/hooks/apihandlers/skillsApiHandlers';
import { store } from '@/store';
import { setProfileLoading, setProfileUrlInfo } from '@/store/profileSlice';
import { scrollToSection } from '@/hooks/scrollToSection';
import { blogsListing } from '@/hooks/apihandlers/blogListingApiHandler';
import Newsletter from '@/components/Newsletter';
import PageRendering from '@/components/PageRendering';
import SkillsContainer from '@/components/SkillsContainer';

const CV = ({ params }: { params: any }) => {
  const searchParams = useSearchParams();
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [listOfskills, setListOfSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogsList, setBlogsList] = useState([]);
  const [loadingblogs, setLoadingBlogs] = useState(false);

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: 'cv',
        urlInfo,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

  useEffect(() => {
    if (listOfdata) {
      blogsListing(setLoadingBlogs, listOfdata, setBlogsList);
    }
  }, [listOfdata]);

  useBodyBackgroundColor('#EFF5FD');

  // Function to open the modal
  const openModal = (pictures, thumbnail, child_hero_banner) => {
    const portfolioImages = JSON.parse(pictures);
    const allImages = [thumbnail, child_hero_banner, ...portfolioImages];
    setSelectedPorfolioPicturesforPopup(allImages);

    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedPorfolioPicturesforPopup(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  return (
    <>
      <PageRendering
        props={{
          list: listOfdata,
          loading: loading,
          actualPage: (
            <>
              {isModalOpen && selectedPorfolioPicturesforPopup !== null && (
                <PortfolioPopUp
                  isModalOpen={isModalOpen}
                  closeModal={closeModal}
                  portfolioImages={selectedPorfolioPicturesforPopup}
                />
              )}
              <div className='mainContainer bg-white flex flex-col lg:flex-row gap-[4rem] relative pb-[5rem] lg:pb-[7rem] mb-[10rem] lg:mb-[9.6rem]'>
                {/* Side Panel */}
                <aside className='lg:max-w-[40rem] w-full flex-shrink-0 bg-cvSideBg bg-no-repeat bg-cover pb-[2rem] pt-[5rem] px-[3rem]'>
                  <div className='flex flex-col items-center'>
                    {/* Profile Bg */}
                    <Link href='/'>
                      <Image
                        src={listOfdata?.profile_photo_1}
                        height={1200}
                        width={1200}
                        alt='Profile Picture'
                        className='h-[20.12rem] w-[20.12rem] rounded-[50%] bg-cover bg-no-repeat bg-center'
                      />
                    </Link>
                    {/* Name */}
                    <Link
                      href={'/'}
                      className='text-heading text-[3.55rem] font-medium leading-[4.4rem] mt-[1.78rem] text-center'
                    >
                      {listOfdata?.name}
                    </Link>
                    {/* Designation */}
                    <h3 className='text-primary text-[2rem] font-medium leading-normal mt-[0.9rem]'>
                      {listOfdata?.designation}
                    </h3>
                    {/* Info */}
                    <p className='my-[4rem] text-[2rem] leading-[2.6rem] text-heading font-normal text-center'>
                      Reach out today and I'll provide you with my comprehensive
                      onboarding package designed for full-time employment or
                      Contract Based Jobs. This package covers various aspects
                      that potential employers often inquire about, such as my
                      salary expectations and the seamless integration process
                      into your company.
                    </p>
                    {/* Divider */}
                    <hr className='w-full h-[0.2rem] bg-[#E2E6EE] mb-[4rem] inline-block' />
                    {/* Availability */}
                    <div className='mb-[4rem] w-full text-center border border-solid border-[#E2E6EE] rounded-tl-[0.6rem] rounded-tr-[0.6rem] rounded-bl-[0.6rem] rounded-br-[0.6rem] overflow-hidden'>
                      <div className='bg-[#F7F9FC]  p-[1.5rem]'>
                        <p className='text-[1.6rem] leading-normal font-normal text-heading'>
                          Next available
                        </p>
                        <h4 className='text-[2rem] font-medium text-primary leading-normal'>
                          {formatDate(
                            new Date(
                              new Date().getFullYear(),
                              new Date().getMonth() + 1
                            ),
                            dateFormatsOptions.longMonthYear
                          )}
                        </h4>
                      </div>
                      {!urlInfo?.u && (
                        <>
                          {listOfdata?.calendly_link ? (
                            <Link
                              target='_blank'
                              href={listOfdata?.calendly_link || '#'}
                            >
                              <button className='text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300'>
                                Schedule Call
                              </button>
                            </Link>
                          ) : (
                            <button
                              onClick={() => scrollToSection('contact')}
                              className='text-[2rem] text-white w-full py-[1.6rem] px-[3.4rem] bg-gradient-to-b from-white/30 to-transparent bg-primary shadow-[0px_0px_0px_1px_#FFF] hover:bg-white hover:text-primary hover:border-primary hover:border-t border-solid duration-300'
                            >
                              Hire Me
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    {/* Email, Website, Phone, Location */}
                    <div className='mb-[4rem] w-full flex sm:hidden lg:flex flex-col gap-[2.6rem]'>
                      {/* Iterate through the contact details array */}
                      {contactDetails(listOfdata)
                        .filter(({ alt }) =>
                          urlInfo?.u ? alt === 'Location' : true
                        )
                        .map((contact, index) => (
                          <div
                            key={index}
                            className='flex items-center gap-[1.78rem]'
                          >
                            {contact?.iconSrc && (
                              <div className='h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center'>
                                <Image
                                  src={contact?.iconSrc}
                                  height={24}
                                  width={24}
                                  alt={contact.alt}
                                />
                              </div>
                            )}
                            <div className='flex flex-col gap-[0.45rem]'>
                              <p className='text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]'>
                                {contact.type}
                              </p>

                              <Link
                                target='_blank'
                                href={contact.href || '#'}
                                className='hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading'
                              >
                                {contact.value}
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <hr className='w-full h-[0.2rem] bg-[#E2E6EE] mb-[4rem] sm:hidden lg:inline-block' />

                    {/* Work Proof */}
                    <div className='mb-[4rem] w-full flex sm:hidden lg:flex flex-col gap-[2.6rem]'>
                      {/* Title */}
                      <h3 className='text-heading text-[1.33rem] font-medium leading-[1.77rem]'>
                        Work Proof
                      </h3>
                      {/* Iterating on Icons */}
                      {socialLinks(listOfdata)
                        .filter(({ alt }) =>
                          urlInfo?.u
                            ? alt === 'Github' ||
                              alt === 'Linkedin' ||
                              alt === 'Upwork'
                            : true
                        )
                        .map((social, index) => (
                          <>
                            {social?.href && (
                              <div
                                key={index}
                                className='flex items-center gap-[1.78rem]'
                              >
                                {social?.iconSrc && (
                                  <Image
                                    src={social?.iconSrc}
                                    height={35}
                                    width={35}
                                    alt={social.alt}
                                  />
                                )}
                                <div className='flex flex-col gap-[0.45rem]'>
                                  <p className='text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]'>
                                    {social.platform}
                                  </p>
                                  <Link
                                    href={social.href || '#'}
                                    className='break-all hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading'
                                  >
                                    {social.username}
                                  </Link>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                    </div>

                    {/* Only Display on The Devices Between Small To Large */}
                    <div className='hidden sm:flex lg:hidden w-full gap-[2rem] items-start'>
                      {/* Email, Website, Phone, Location */}
                      <div className='mb-[4rem] w-full flex flex-col gap-[2.6rem]'>
                        {contactDetails(listOfdata)
                          .filter(({ alt }) =>
                            urlInfo?.u ? alt === 'Location' : true
                          )
                          .map((contact, index) => (
                            <div
                              key={index}
                              className='flex items-center gap-[1.78rem]'
                            >
                              {contact.iconSrc && (
                                <div className='h-[3.5rem] w-[3.5rem] bg-[#E2E6EE] rounded-[50%] flex items-center justify-center'>
                                  <Image
                                    src={contact.iconSrc}
                                    height={24}
                                    width={24}
                                    alt={contact.alt}
                                  />
                                </div>
                              )}
                              <div className='flex flex-col gap-[0.45rem]'>
                                <p className='text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]'>
                                  {contact.type}
                                </p>

                                <Link
                                  href={contact.href || '#'}
                                  className='hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading'
                                >
                                  {contact.value}
                                </Link>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Work Proof */}
                      <div className='mb-[4rem] w-full flex flex-col gap-[2.6rem]'>
                        {/* Title */}
                        <h3 className='text-heading text-[1.33rem] font-medium leading-[1.77rem]'>
                          Work Proof
                        </h3>

                        {/* Iterating on Icons */}
                        {socialLinks(listOfdata)
                          .filter(({ alt }) =>
                            urlInfo?.u
                              ? alt === 'Github' ||
                                alt === 'Upwork' ||
                                alt === 'Linkedin'
                              : true
                          )
                          .map((social, index) => (
                            <div
                              key={index}
                              className='flex items-center gap-[1.78rem]'
                            >
                              {social.iconSrc && (
                                <Image
                                  src={social.iconSrc}
                                  height={35}
                                  width={35}
                                  alt={social.alt}
                                />
                              )}
                              <div className='flex flex-col gap-[0.45rem]'>
                                <p className='text-[1.33rem] leading-[1.77rem] text-[#3E3E3E]'>
                                  {social.platform}
                                </p>
                                <Link
                                  href={social.href || '#'}
                                  className='break-all hover:text-primary text-[1.55rem] font-medium leading-[2rem] text-heading'
                                >
                                  {social.username}
                                </Link>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </aside>
                {/* Right Content Section */}
                <section className='w-full md:pt-[7rem]'>
                  {/* 10 Years Experience */}
                  <div
                    dangerouslySetInnerHTML={{ __html: listOfdata?.tag_line }}
                    className='py-[5rem] px-[3.4rem] primaryGradient text-white text-[2.2rem] leading-[3.1rem] font-bold rounded-[1rem] text-center'
                  ></div>

                  {/* Timeline Section */}
                  <div className=' w-full '>
                    {/* Timeline */}
                    <div className='flex items-center justify-center mt-[4rem] lg:mt-[6rem]'>
                      <div className='relative'>
                        {/* Vertical line */}
                        <div className='absolute left-0 top-0 w-[1.5px] h-[100%] bg-border' />
                        {/* Timeline items Container */}
                        <div className='space-y-[1rem] lg:space-y-[2rem]'>
                          {/* Overview & Skills Timeline item */}
                          {listOfdata?.skills && (
                            <div className='relative flex items-start'>
                              {/* Dot */}
                              <div className='absolute top-0 left-[-1.3rem]'>
                                <div className='w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center'>
                                  <div className='w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full'></div>
                                </div>
                              </div>
                              <div className='ml-[2rem] md:ml-[3rem] lg:ml-[5rem]'>
                                {/* Title */}
                                <h2 className='text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] mb-[3rem]'>
                                  Overview & Skills
                                </h2>

                                <div
                                  className='text-heading list-div text-[1.6rem] leading-[2.4rem] flex flex-col gap-[1rem] mb-[5rem] list-inside'
                                  dangerouslySetInnerHTML={{
                                    __html: modifiedContent(
                                      listOfdata?.skills,
                                      listOfskills,
                                      listOfdata
                                    ),
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {/* Skills Timeline item */}
                          {listOfdata?.skills_ids && (
                            <div className='relative flex items-start'>
                              {/* Dot */}
                              <div className='absolute top-0 left-[-1.3rem] '>
                                <div className='w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center'>
                                  <div className='w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full'></div>
                                </div>
                              </div>
                              <div className=''>
                                {/* Title */}
                                <h2 className='ml-[2rem] md:ml-[3rem] lg:ml-[5rem] text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] mb-[3rem]'>
                                  Skills
                                </h2>

                                <div className='grid  grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-[1.5rem] ml-[2rem] '>
                                  {listOfdata?.skills_ids?.map(
                                    (skill, index) => (
                                      <div
                                        key={index}
                                        style={{
                                          animationDelay: `${index * 0.2}s`,
                                        }}
                                        className='mx-auto mb-[4rem] flex flex-col items-center justify-start gap-[0.8rem] max-w-[15rem] lg:max-w-[19rem] w-full animate-fadeIn opacity-0'
                                      >
                                        {skill.icon && (
                                          <div className='flex items-center justify-center max-h-[6.4rem] max-w-[6.4rem]'>
                                            <Image
                                              src={skill?.icon}
                                              alt={skill?.title}
                                              height={64}
                                              width={64}
                                              className='object-contain rounded-full max-h-[6.4rem] max-w-[6.4rem]'
                                            />
                                          </div>
                                        )}
                                        <p className='text-paragraph1 text-center text-[1.8rem] leading-[2.8rem] overflow-hidden text-ellipsis'>
                                          {skill.title}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* {Experience} */}
                          {listOfdata &&
                            listOfdata?.experiences_ids?.length > 0 && (
                              <div className='relative flex items-start'>
                                {/* Dot */}
                                <div className='absolute top-0 left-[-1.3rem] '>
                                  <div className='w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center mt-[3rem] mb-[2rem]'>
                                    <div className='w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full'></div>
                                  </div>
                                </div>
                                <div className='ml-[2rem] md:ml-[3rem] lg:ml-[5rem]'>
                                  {/* Title */}
                                  <div className='w-full mb-[3.5rem]'>
                                    <h2 className='text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] pt-[3rem] pb-[2rem]'>
                                      Experiences
                                    </h2>
                                    {/* <div className='flex items-center gap-[0.6rem] group cursor-pointer'>
                          <p className='text-[1.4rem] text-heading font-medium'>
                            View all
                          </p>
                          <div className='group-hover:translate-x-[1rem] duration-300'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='20'
                              height='20'
                              viewBox='0 0 20 20'
                              fill='none'
                            >
                              <path
                                d='M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337'
                                stroke='#262626'
                                strokeWidth='1.67'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                          </div>
                        </div> */}
                                  </div>

                                  {listOfdata?.experiences_ids?.map(
                                    (experience, index) => (
                                      <div
                                        className='relative flex items-start mt-[2rem]'
                                        key={index}
                                      >
                                        {/* Dot */}
                                        <div className='absolute top-0 left-[-3.2rem] md:left-[-4.2rem] lg:left-[-6.2rem] '>
                                          <div className='w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center'>
                                            <div className='w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full'></div>
                                          </div>
                                        </div>

                                        <div className='w-full'>
                                          {/* Date */}
                                          <h2 className='text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[3rem]'>
                                            {formatDate(
                                              experience?.starting_date,
                                              dateFormatsOptions.shortMonthYear
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
                                                  dateFormatsOptions.shortMonthYear
                                                )}
                                          </h2>
                                          {/* Card */}
                                          <div className='bg-[#F7F9FC] p-[1.5rem] lg:p-[2.4rem] rounded-[1rem] shadow mb-[2rem]'>
                                            <div className='flex items-center flex-wrap text-nowrap gap-[1.5rem] md:justify-between'>
                                              {/* About Content */}
                                              <div className='flex align-middle justify-center items-center gap-[1rem]'>
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
                                                    {experience.company_name}
                                                  </p>
                                                  <h3 className='text-[1.6rem] lg:text-[1.8rem] font-medium text-heading'>
                                                    {experience.title}
                                                  </h3>
                                                  {experience?.company_website && (
                                                    <div className='flex items-center gap-[0.52rem]'>
                                                      <Image
                                                        src={'/images/link.svg'}
                                                        height={18}
                                                        width={18}
                                                        alt='Link'
                                                      />
                                                      <Link
                                                        href={
                                                          experience?.company_website ||
                                                          '#'
                                                        }
                                                        className='text-[#1F4FE1] break-all text-[1.6rem] lg:text-[1.8rem] font-normal leading-normal'
                                                      >
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
                                                  )}
                                                </div>
                                              </div>

                                              {/* Link */}
                                              <div className='flex justify-center md:justify-end w-full md:w-auto'>
                                                <div className='flex flex-col-reverse gap-[1rem] max-w-max'>
                                                  <div className='py-[1rem] px-[2rem] bg-white border border-[#E2E6EE] border-solid text-[#47516B] rounded-[2rem] text-[1.5rem] font-medium leading-[0.8rem]'>
                                                    {formatDate(
                                                      experience?.starting_date,
                                                      dateFormatsOptions.shortMonthYear
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
                                                          dateFormatsOptions.shortMonthYear
                                                        )}
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
                                                      View my Freelance Profile
                                                    </Link>
                                                  )}{' '}
                                                </div>
                                              </div>
                                            </div>

                                            <p
                                              dangerouslySetInnerHTML={{
                                                __html: modifiedContent(
                                                  experience?.short_description,
                                                  listOfskills,
                                                  listOfdata
                                                ),
                                              }}
                                              className='mt-[2rem] list-div text-[1.6rem] font-medium text-paragraph1'
                                            ></p>
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: modifiedContent(
                                                  experience?.long_description,
                                                  listOfskills,
                                                  listOfdata
                                                ),
                                              }}
                                              className='mt-[2rem] list-div-portfolio text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem]'
                                            ></div>
                                            {/* Skills Badges */}
                                            <div className='mt-[2.2rem]'>
                                              <h4 className='text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]'>
                                                AREAS OF EXPERTISE I'VE WORKED
                                                IN
                                              </h4>
                                              <div className='flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]'>
                                                {experience?.skills?.map(
                                                  (skill, index) => (
                                                    <Link
                                                      href={skill?.url || '#'}
                                                      key={index}
                                                      className='hover:bg-primary py-[0.4rem] px-[2rem] hover:text-white bg-white border border-[#E2E6EE] border-solid text-heading rounded-[1.2rem] text-[1.2rem] font-medium leading-normal'
                                                    >
                                                      {skill.title}
                                                    </Link>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Portfolio Timeline item */}
                          {listOfdata &&
                            listOfdata?.portfolios_ids?.length > 0 && (
                              <div className='relative flex items-start'>
                                {/* Dot */}
                                <div className='absolute top-0 left-[-1.3rem] '>
                                  <div className='w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center mt-[3rem] mb-[2rem]'>
                                    <div className='w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full'></div>
                                  </div>
                                </div>
                                <div className='ml-[2rem] md:ml-[3rem] lg:ml-[5rem]'>
                                  {/* Title */}
                                  <div className='flex items-center justify-between w-full mb-[3rem]'>
                                    <h2 className='text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] pt-[3rem] pb-[2rem]'>
                                      Portfolios
                                    </h2>
                                    <Link
                                      href={'/portfolio'}
                                      className=' flex items-center gap-[0.6rem] group cursor-pointer'
                                    >
                                      <div className='hover:font-bold hover:text-primary text-[1.4rem] text-heading font-medium'>
                                        View all
                                      </div>
                                      <div className='group-hover:translate-x-[1rem] duration-300'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          width='20'
                                          height='20'
                                          viewBox='0 0 20 20'
                                          fill='none'
                                        >
                                          <path
                                            d='M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337'
                                            stroke='#262626'
                                            strokeWidth='1.67'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                          />
                                        </svg>
                                      </div>
                                    </Link>
                                  </div>
                                  {listOfdata?.portfolios_ids?.map(
                                    (portfolio, index) => (
                                      <div
                                        className='relative flex items-start mt-[2rem]'
                                        key={index}
                                      >
                                        {/* Dot */}
                                        <div className='absolute top-0 left-[-3.2rem] md:left-[-4.2rem] lg:left-[-6.2rem] '>
                                          <div className='w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center'>
                                            <div className='w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full'></div>
                                          </div>
                                        </div>
                                        <div className='w-full'>
                                          {/* Date */}
                                          <h2
                                            key={index}
                                            className='text-heading leading-[2.67rem] text-[2rem] font-bold pl-[0.5rem] mb-[3rem] '
                                          >
                                            {formatDate(
                                              portfolio?.starting_date,
                                              dateFormatsOptions.onlyYear
                                            )}{' '}
                                            -{' '}
                                            {isNaN(
                                              new Date(
                                                portfolio.ending_Date
                                              ).getFullYear()
                                            )
                                              ? portfolio.ending_Date
                                              : formatDate(
                                                  portfolio.ending_Date,
                                                  dateFormatsOptions.onlyYear
                                                )}
                                          </h2>
                                          {/* Card */}
                                          <div className='max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem] mb-[2rem]'>
                                            {/* Content */}
                                            <div className='w-full '>
                                              <div className='flex gap-[2.2rem] flex-wrap-reverse lg:flex-nowrap '>
                                                <div>
                                                  {portfolio?.company_icon && (
                                                    <div className='bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block mb-[1rem]'>
                                                      <Image
                                                        src={
                                                          portfolio?.company_icon
                                                        }
                                                        alt='Case'
                                                        height={34}
                                                        width={34}
                                                        className='h-[2rem] w-[2rem]'
                                                      />
                                                    </div>
                                                  )}
                                                  {/* Heading and Para */}
                                                  <div className='text-heading'>
                                                    {/* Heading */}
                                                    <h1 className='text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]'>
                                                      {portfolio?.title}
                                                    </h1>
                                                    {/* Para */}
                                                    <p
                                                      className='text-[1.4rem] leading-[1.8rem] font-normal mt-[1rem]'
                                                      dangerouslySetInnerHTML={{
                                                        __html: modifiedContent(
                                                          portfolio?.tagline_1,
                                                          listOfskills,
                                                          listOfdata
                                                        ),
                                                      }}
                                                    ></p>
                                                    <p
                                                      className='text-primary text-[1.4rem] leading-[1.8rem] font-normal mt-[1rem]'
                                                      dangerouslySetInnerHTML={{
                                                        __html: modifiedContent(
                                                          portfolio?.tagline_2,
                                                          listOfskills,
                                                          listOfdata
                                                        ),
                                                      }}
                                                    ></p>
                                                  </div>
                                                </div>
                                                {/* Image */}
                                                <div className='w-full rounded-[1.2rem] relative align-middle justify-center flex-col flex items-center'>
                                                  {portfolio?.thumbnail && (
                                                    <Image
                                                      src={portfolio?.thumbnail}
                                                      alt='Project Image'
                                                      height={800}
                                                      width={800}
                                                      className='rounded-[1.2rem] object-cover h-full w-full'
                                                    />
                                                  )}
                                                  {/* Centered Positioned Button */}
                                                  <button
                                                    onClick={() =>
                                                      openModal(
                                                        portfolio?.pictures,
                                                        portfolio?.thumbnail,
                                                        portfolio?.child_hero_banner
                                                      )
                                                    }
                                                    className='mt-[1rem] py-[1rem]  px-[2rem]  rounded-[7.77rem] border-2 border-solid border-[#fff] text-[1.2rem]  font-medium  max-w-max  backdrop-blur-[0.8rem] duration-300 bg-primary hover:bg-opacity-80 text-white hover:bg-white hover:text-primary hover:border-1 hover:border-primary'
                                                  >
                                                    Explore the Gallery
                                                  </button>
                                                </div>
                                              </div>
                                              {/* Line */}
                                              <hr className='w-full my-[2.1rem] h-px bg-border' />
                                              {/* List */}
                                              <div
                                                dangerouslySetInnerHTML={{
                                                  __html: modifiedContent(
                                                    portfolio.features_short,
                                                    listOfskills,
                                                    listOfdata
                                                  ),
                                                }}
                                                className='mt-[2rem] list-div-portfolio text-heading text-[1.4rem] font-normal leading-[150%] list-disc pl-[2rem] flex flex-col gap-[0.8rem] mb-[2rem]'
                                              ></div>
                                              {/* Skills Badges */}
                                              <div>
                                                <h4 className='text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]'>
                                                  AREAS OF EXPERTISE I'VE WORKED
                                                  IN
                                                </h4>
                                                <div className='flex items-center gap-[1rem] lg:gap-[0.7rem]   text-nowrap flex-wrap text-[1.2rem]'>
                                                  {portfolio?.skills?.map(
                                                    (skill, index) => (
                                                      <Link
                                                        href={skill?.url || '#'}
                                                        className='hover:text-white hover:bg-primary py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'
                                                      >
                                                        {skill?.title}
                                                      </Link>
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                              <hr className='w-full my-[2.4rem] h-px bg-border' />
                                              <div className='flex items-center flex-wrap max-sm:flex-col max-md:items-start gap-[1.4rem]'>
                                                <Link
                                                  href={`/portfolio/${portfolio.id}`}
                                                  className='text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 w-full md:max-w-max text-center rounded-[0.6rem]'
                                                >
                                                  View Details
                                                </Link>
                                                <Link
                                                  href={portfolio?.link}
                                                  className='py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] w-full md:max-w-max text-center'
                                                >
                                                  Launch Project - Live Preview
                                                </Link>
                                                {portfolio?.has_testimonial ==
                                                  true && (
                                                  <Link
                                                    href={'#'}
                                                    className='text-primary  text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center'
                                                  >
                                                    Check Client Testimonial
                                                  </Link>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Education Timeline item */}
                          {listOfdata &&
                            listOfdata?.education_ids?.length > 0 && (
                              <div className='relative flex items-start'>
                                {/* Dot */}
                                <div className='absolute top-0 left-[-1.3rem] '>
                                  <div className='w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center my-[3rem] '>
                                    <div className='w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full'></div>
                                  </div>
                                </div>
                                <div className='ml-[2rem] md:ml-[3rem] lg:ml-[5rem]'>
                                  {/* Title */}
                                  <h2 className='text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]'>
                                    Education
                                  </h2>
                                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1.2rem] w-full'>
                                    {listOfdata?.education_ids?.map((edu) => (
                                      <div
                                        key={edu.id}
                                        className='p-[2rem] rounded-[0.8rem] border border-solid border-[#E2E6EE] bg-[#F7F9FC]'
                                      >
                                        <div className='flex items-center gap-[1.8rem]'>
                                          {edu?.thumbnail && (
                                            <Image
                                              src={edu?.thumbnail}
                                              height={34}
                                              width={34}
                                              alt={edu.university_name}
                                            />
                                          )}
                                          <h3 className='text-[1.4rem] text-heading font-medium leading-[1.8rem]'>
                                            {edu.university_name}
                                          </h3>
                                        </div>
                                        {/* Divider */}
                                        <hr className='w-full h-[0.2rem] bg-[#E2E6EE] my-[2rem] inline-block' />
                                        <div>
                                          <h2 className='text-heading font-medium text-[1.6rem] leading-[2rem]'>
                                            {edu.degree_name}
                                          </h2>
                                          <p className='text-[1.2rem] font-normal text-[#3E3E3E]'>
                                            {formatDate(
                                              edu.degree_start_date,
                                              dateFormatsOptions.shortMonthYear
                                            )}{' '}
                                            -{' '}
                                            {isNaN(
                                              new Date(
                                                edu.degree_end_date
                                              ).getFullYear()
                                            )
                                              ? edu.degree_end_date
                                              : formatDate(
                                                  edu.degree_end_date,
                                                  dateFormatsOptions.shortMonthYear
                                                )}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                          {/* Blogs Timeline item */}
                          <div className='relative flex items-start'>
                            {/* Dot */}
                            <div className='absolute top-0 left-[-1.3rem] '>
                              <div className='w-[3rem] h-[3rem] bg-white rounded-full flex items-center shadow-md justify-center my-[3rem]'>
                                <div className='w-[0.8rem] h-[0.8rem] bg-sectionBG rounded-full'></div>
                              </div>
                            </div>
                            <div className='ml-[2rem] md:ml-[3rem] lg:ml-[5rem] w-full'>
                              {/* Title */}
                              <div className='flex items-center justify-between mb-5'>
                                <h2 className='text-heading leading-[3.56rem] text-[3.67rem] font-medium pl-[0.5rem] py-[3rem]'>
                                  Blogs
                                </h2>
                                <Link
                                  href={'/blog-listing'}
                                  className=' flex items-center gap-[0.6rem] group cursor-pointer'
                                >
                                  <div className='hover:font-bold hover:text-primary text-[1.4rem] text-heading font-medium'>
                                    View all
                                  </div>
                                  <div className='group-hover:translate-x-[1rem] duration-300'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='20'
                                      height='20'
                                      viewBox='0 0 20 20'
                                      fill='none'
                                    >
                                      <path
                                        d='M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337'
                                        stroke='#262626'
                                        strokeWidth='1.67'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                      />
                                    </svg>
                                  </div>
                                </Link>
                              </div>
                              {/* Map Through the Blogs Array */}
                              {loadingblogs ? (
                                <WebsiteLoader height='h-[20rem]' />
                              ) : (
                                <>
                                  {blogsList
                                    ?.slice(0, Math.min(3, blogsList.length))
                                    .map((blog, index) => (
                                      <article
                                        key={index}
                                        className='w-full flex items-start gap-[2rem] p-[1.2rem] bg-white shadow-lg mb-[1.2rem] flex-col sm:flex-row'
                                      >
                                        {/* Card Image */}
                                        {blog?._embedded?.[
                                          'wp:featuredmedia'
                                        ][0]?.source_url && (
                                          <div className='sm:w-[20rem] h-[19rem] w-full flex-shrink-0'>
                                            <Image
                                              src={
                                                blog?._embedded?.[
                                                  'wp:featuredmedia'
                                                ][0]?.source_url
                                              }
                                              height={300}
                                              width={300}
                                              alt={`Blog ${index + 1}`}
                                              className='object-cover h-full w-full'
                                            />
                                          </div>
                                        )}
                                        {/* Card Content */}
                                        <div className=''>
                                          {/* Date */}
                                          <div className='mb-[1.2rem] flex items-center'>
                                            <div className='flex items-center'>
                                              {/* SVG Dot */}
                                              <div className='mx-[0.6rem]'>
                                                <svg
                                                  xmlns='http://www.w3.org/2000/svg'
                                                  width='5'
                                                  height='6'
                                                  viewBox='0 0 5 6'
                                                  fill='none'
                                                >
                                                  <circle
                                                    cx='2.5'
                                                    cy='3'
                                                    r='2.5'
                                                    fill='#C6CBD8'
                                                  />
                                                </svg>
                                              </div>
                                              <p className='text-paragraph1 text-[1.4rem] leading-[2rem] font-normal'>
                                                {formatDate(
                                                  blog?.date,
                                                  dateFormatsOptions.dayMonthYear
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                          {/* Title */}
                                          <h2
                                            dangerouslySetInnerHTML={{
                                              __html: blog?.title?.rendered,
                                            }}
                                            className='text-[2.4rem] font-medium leading-[3.2rem] text-heading mb-[1.2rem]'
                                          ></h2>
                                          {/* Description */}
                                          <p
                                            dangerouslySetInnerHTML={{
                                              __html: blog?.excerpt?.rendered,
                                            }}
                                            className='text-[1.6rem] leading-[2.4rem] text-paragraph1 mb-[3rem]'
                                          ></p>
                                          <Link
                                            href={`/blog-listing/${blog?.id}`}
                                            className='duration-300 inline-flex items-center gap-[0.8rem] group'
                                          >
                                            <p className='text-primary text-[1.4rem] font-medium leading-[2.4rem]'>
                                              Read Now
                                            </p>
                                            {/* Arrow */}
                                            <svg
                                              xmlns='http://www.w3.org/2000/svg'
                                              width='25'
                                              height='25'
                                              viewBox='0 0 25 25'
                                              fill='none'
                                              className='group-hover:translate-x-[1rem] duration-300'
                                            >
                                              <path
                                                d='M4.02783 12.8789H20.5278'
                                                stroke='#00473C'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                              />
                                              <path
                                                d='M13.7778 6.12891L20.5278 12.8789L13.7778 19.6289'
                                                stroke='#00473C'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                              />
                                            </svg>
                                          </Link>
                                        </div>
                                      </article>
                                    ))}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              {!urlInfo?.u && (
                <div className='w-full mb-[5rem]'>
                  <Newsletter />
                </div>
              )}
            </>
          ),
        }}
      />
    </>
  );
};
export default CV;
