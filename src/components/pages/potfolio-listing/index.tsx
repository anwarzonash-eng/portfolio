'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor';
import PortfolioPopUp from '@/components/PortfolioPopUp';
import WebsiteLoader from '@/components/WebsiteLoader';
import { useSearchParams } from 'next/navigation';
import { getRoutesDetails } from '@/hooks/url';
import { reportsApiHandler } from '@/hooks/apihandlers/reportsApiHandlers';
import { store } from '@/store';
import { setProfileLoading, setProfileUrlInfo } from '@/store/profileSlice';
import OurBlogs from '@/components/OurBlogs';
import { modifiedContent } from '@/hooks/modifiedContent';
import { handleSkillsApiCall } from '@/hooks/apihandlers/skillsApiHandlers';
import { skillsGrouping } from '@/hooks/skillsGrouping';
import { toggleShowMoreSkills } from '@/hooks/toggleShowMoreSkills';
import ShowmoreSkills from '@/components/showmoreSkills';
import Background from '@/components/background';

const PortfolioListing = ({ params }: { params: any }) => {
  const [
    selectedPorfolioPicturesforPopup,
    setSelectedPorfolioPicturesforPopup,
  ] = useState(null);
  const [showMoreSkills, setShowMoreSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        actionType: 'portfolio',
        urlInfo,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useBodyBackgroundColor('#EFF5FD');

  useEffect(() => {
    handleSkillsApiCall({ setListOfSkills });
  }, []);

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
    <div className='bg-[#EFF5FD]'>
      {/* Hero Banner */}

      <section className='w-full relative '>
        <div className='mainContainer h-[60.7rem] lg:h-[65rem] w-full relative '>
          {/* Background SVG */}
          <Background />
          {/* Badge Heading and Paara Text */}
          <div className='max-w-[1024px] mx-auto text-center px-[2rem] pt-[8rem] relative z-20'>
            {/* Badge */}
            <div className='px-[2rem] py-[0.4rem] bg-white rounded-[2.2rem] border border-border border-solid text-center max-w-max text-heading text-[1.4rem] font-medium font-Inter leading-tight mx-auto mb-[1.6rem]'>
              Portfolio
            </div>
            {/* Heading */}
            <div className='text-center text-primary text-[4rem] lg:text-[6rem] font-medium  leading-[5rem] lg:leading-[6rem] mt-[1.6rem] mb-[2.4rem]'>
              My Recent Work
            </div>
            {/* Pars Text */}
            <p className='text-[2rem] leading-[3rem] font-normal text-heading'>
              Check out some of the best work I have done.
            </p>
            {loading && <WebsiteLoader height='h-[30rem]' />}
          </div>
        </div>
      </section>

      {isModalOpen && selectedPorfolioPicturesforPopup !== null && (
        <PortfolioPopUp
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          portfolioImages={selectedPorfolioPicturesforPopup}
        />
      )}

      {listOfdata && listOfdata?.portfolios_ids?.length > 0 && (
        <>
          {/* Portfolio Timeline Section */}
          <div className='mainContainer mt-[-30rem] lg:mt-[-40rem] xl:mt-[-36rem]  w-full '>
            {/* Timeline */}
            <div className='flex items-center justify-center mt-[2rem]'>
              <div className='relative'>
                {/* Vertical line */}
                <div className='absolute left-[-1rem] lg:left-[1rem] top-0 w-[2px] h-[100%] bg-[#7B869E;] mx-[2.1rem] ' />
                {/* Timeline items Container */}
                <div className='space-y-[3.5rem]'>
                  {listOfdata?.portfolios_ids?.map((portfolio, index) => {
                    const skills: {
                      [key: string]: {
                        title: string;
                        url?: string;
                        order?: string;
                      }[];
                    } = skillsGrouping(
                      showMoreSkills[index]
                        ? portfolio?.skills
                        : portfolio?.skills?.slice(0, 15)
                    );
                    return (
                      <div className='relative flex items-start' key={index}>
                        {/* Dot */}
                        <div className='absolute top-0 left-0 lg:left-[1.8rem]'>
                          <div className='w-[2.6rem] h-[2.6rem] bg-white rounded-full flex items-center shadow-md justify-center'>
                            <div className='w-[0.7rem] h-[0.7rem] bg-[#5531A7] rounded-full'></div>
                          </div>
                        </div>
                        <div className='ml-[3rem] lg:ml-[6rem]'>
                          {/* Year */}
                          <h1 className='mb-[3rem] text-heading text-[2rem] leading-[2.7rem] font-bold max-lg:ml-[0.5rem]'>
                            {new Date(portfolio.starting_date).getFullYear()} -{' '}
                            {isNaN(
                              new Date(portfolio.ending_Date).getFullYear()
                            )
                              ? portfolio.ending_Date
                              : new Date(portfolio.ending_Date).getFullYear()}
                          </h1>
                          {/* Card */}
                          <div className='flex flex-col-reverse lg:flex-row max-lg:p-[1.5rem] bg-white shadow-testimonialeShadow relative rounded-[1.2rem] border border-solid border-[#DDD] overflow-hidden p-[2.4rem] gap-[2.4rem]'>
                            {/* Content */}
                            <div className=''>
                              {' '}
                              {/* Title and Description */}
                              {portfolio?.thumbnail && (
                                <div className='ms-0 lg:ms-5 lg:w-[50rem]  float-right w-full  rounded-[1.2rem] relative align-middle justify-center flex-col flex items-center'>
                                  <Image
                                    src={portfolio?.thumbnail}
                                    alt='Project Image'
                                    height={800}
                                    width={800}
                                    className='object-contain w-full rounded-[1.2rem] border border-solid border-border'
                                  />
                                  <button
                                    className='mb-3 hover:tracking-[.25em] mt-[1rem] py-[1rem]  px-[2rem]  rounded-[7.77rem] border-2 border-solid border-[#fff] text-[1.8rem]  font-medium  min-w-[137px] lg:min-w-[220px]  backdrop-blur-[0.8rem] duration-300 bg-primary hover:bg-opacity-80 text-white'
                                    onClick={() =>
                                      openModal(
                                        portfolio?.pictures,
                                        portfolio?.thumbnail,
                                        portfolio?.child_hero_banner
                                      )
                                    }
                                  >
                                    Explore the Gallery
                                  </button>
                                </div>
                              )}
                              {portfolio?.company_icon && (
                                <div className='bg-[#1B6393] p-[1.46rem] rounded-[1rem] inline-block mb-[1rem]'>
                                  <Image
                                    src={portfolio?.company_icon}
                                    alt='Case'
                                    height={34}
                                    width={34}
                                    className='h-[2rem] w-[2rem] rounded-[1rem] object-contain'
                                  />
                                </div>
                              )}
                              <h1 className='text-[1.8rem] lg:text-[2rem] font-bold leading-[2.69rem]'>
                                {portfolio?.title}
                              </h1>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: portfolio.tagline_1,
                                }}
                                className='text-[1.9rem] leading-[150%] font-medium mt-[1rem] text-primary'
                              ></p>
                              {/* <hr className='w-full my-[1.6rem] h-px bg-border' /> */}
                              {/* Points */}
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: modifiedContent(
                                    portfolio.features_short,
                                    listOfskills,
                                    listOfdata
                                  ),
                                }}
                                className='mt-[2rem] list-div-portfolio1 pl-[2rem]'
                              ></p>
                              {/* Skills */}
                              <h4 className='text-heading text-[1.2rem] font-medium mb-[1.2rem] ml-[0.2rem]'>
                                AREAS OF EXPERTISE I'VE WORKED IN
                              </h4>
                              <div className='flex items-center gap-[1rem] lg:gap-[0.7rem] flex-wrap text-[1.2rem] w-full'>
                                {Object?.values(skills)?.map(
                                  (group, groupIndex) => (
                                    <React.Fragment key={groupIndex}>
                                      {group.map((skill, i) => (
                                        <Link
                                          key={i}
                                          href={skill.url || '#'}
                                          target='_blank'
                                          className='hover:bg-primary hover:text-white py-[0.4rem] px-[2rem] border border-primary border-solid text-primary rounded-[1.8rem] text-[1.4rem] font-medium leading-normal'
                                        >
                                          {skill.title}
                                        </Link>
                                      ))}
                                      {/* Line break after each group */}
                                      {showMoreSkills[index] && (
                                        <div className='w-full mb-[1px]' />
                                      )}
                                    </React.Fragment>
                                  )
                                )}

                                <ShowmoreSkills
                                  props={{
                                    list: portfolio?.skills,
                                    index,
                                    setShowMoreSkills,
                                    showMoreSkills,
                                  }}
                                />
                              </div>
                              <hr className='w-full my-[2.4rem] h-px bg-border' />
                              {/* Links */}
                              <div className='flex items-center flex-wrap max-sm:flex-col max-md:items-start gap-[1.4rem]'>
                                <Link
                                  href={`/portfolio/${portfolio.id}`}
                                  className='text-white py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium primaryGradient hover:bg-white hover:text-primary border border-solid border-transparent hover:border-primary duration-300 max-sm:w-full text-center rounded-[0.6rem]'
                                >
                                  View Details
                                </Link>
                                <Link
                                  href={portfolio?.link}
                                  className='py-[1rem] px-[3.4rem] text-[1.6rem] leading-[2.4rem] font-medium text-primary border border-solid hover:border-transparent border-primary duration-300 hover:bg-primary hover:text-white rounded-[0.6rem] max-sm:w-full text-center'
                                >
                                  Launch Project - Live Preview
                                </Link>
                                {portfolio?.has_testimonial == true && (
                                  <Link
                                    href={'#'}
                                    className='text-primary  text-[1.6rem] leading-[2.4rem] font-medium max-sm:w-full text-center'
                                  >
                                    Check Client Testimonial
                                  </Link>
                                )}
                              </div>
                            </div>
                            {/* Image */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Our Blogs Section */}
          <div className='w-full my-[10rem] lg:my-[12rem]'>
            <OurBlogs listOfdata={listOfdata} />
          </div>
          {/* Newsletter */}
          {!urlInfo?.u && (
            <div className='w-full mb-[5rem]'>
              <Newsletter />
            </div>
          )}{' '}
        </>
      )}
    </div>
  );
};

export default PortfolioListing;
