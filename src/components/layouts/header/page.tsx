'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import WorkProofLinks from '@/components/WorkProofLinks';
import ContactMeLinks from '@/components/ContactMeLinks';
import Reports from '@/apiCalls/reports';

interface HeaderLink {
  title: string;
  src: string;
}

interface HeaderProps {
  initialBgColor?: string;
}

const Header = ({ initialBgColor = 'bg-transparent' }) => {
  // Use localStorage or initialBgColor for initial background state
  const [bgColor, setBgColor] = useState(initialBgColor);
  const { listOfdata } = Reports();

  useEffect(() => {
    // Check if `window` is available to safely access `localStorage`
    if (typeof window !== 'undefined') {
      const savedBgColor = localStorage.getItem('bgColor');
      if (savedBgColor) {
        setBgColor(savedBgColor);
      }
    }
  }, [initialBgColor]);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll > 10) {
        setBgColor('bg-white');
        localStorage.setItem('bgColor', 'bg-white');
      } else {
        setBgColor(initialBgColor);
        localStorage.setItem('bgColor', initialBgColor);
      }
    };

    // Initial check to set the background color based on the current scroll position
    handleScroll();

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialBgColor]);

  // Header Links
  const headerLinks: HeaderLink[] = [
    { title: 'Home', src: '/' },
    { title: 'Cover Letter', src: '/offer' },
    { title: 'Services', src: '/services' },
    { title: 'Projects', src: '/portfolio-listing' },
    { title: 'Blog', src: '/blog-listing' },
    { title: 'CV', src: '/cv' },
  ];

  const pathname = usePathname(); // Gets the current pathname
  // Gets the search params (query string)

  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle the dropdown on click
  const handleToggle = () => {
    setIsResourceOpen(!isResourceOpen);
  };

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsResourceOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsResourceOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSidebar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <>
      {pathname !== '/cv' && (
        <header
          className={`sticky top-0 left-0 w-full z-[100]  transition-colors duration-300 ${bgColor}`}
        >
          {/* Header Navbar */}
          <div className='w-full'>
            {/* Desktop Header */}
            <div className='max-[1100px]:hidden mainContainer h-[8.8rem] py-[2rem] border-b border-border flex justify-between items-center'>
              {/* User Profile */}
              <div className='flex justify-center items-center gap-[1.2rem] '>
                <Link href={'/'}>
                  <Image
                    src={listOfdata?.profile_photo_1}
                    height={48}
                    width={48}
                    alt='Profile Picture'
                    className='rounded-[50%]'
                  />
                </Link>

                <div className='text-heading text-[1.6rem] font-normal leading-tight break-all capitalize'>
                  {listOfdata?.name}
                </div>
              </div>
              {/* NavLinks and Buttons */}
              <div className='flex justify-center items-center'>
                <div className='flex items-center gap-[2.4rem]'>
                  {/* Nav Link */}
                  <nav className='text-paragraph1 text-[1.6rem] font-normal leading-normal flex justify-center items-center gap-[2.4rem]'>
                    {headerLinks.map((link, index) => (
                      <div
                        key={index}
                        className={`hover:text-primary duration-300 ${
                          index == 0 ? 'font-bold' : ''
                        }`}
                      >
                        <Link href={link.src}>{link.title}</Link>
                      </div>
                    ))}
                  </nav>

                  {/* New Updated Drop  */}
                  <div
                    className='flex items-center relative mr-[2.4rem]'
                    ref={dropdownRef}
                  >
                    <div
                      className='text-paragraph1 text-[1.6rem] font-normal leading-normal hover:text-primary duration-300 cursor-pointer'
                      onClick={handleToggle}
                    >
                      Resources
                    </div>
                    <Image
                      src='/images/dropDown.svg'
                      height={24}
                      width={24}
                      onClick={handleToggle}
                      alt='Dropdown'
                      className={`cursor-pointer duration-300 ${
                        isResourceOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                    {/* Positioned DropDown Menu */}
                    <nav
                      className={`rounded-[0.8rem] duration-300 shadow-md bg-white absolute top-[4rem] left-[-10rem] z-50
                         ${isResourceOpen ? 'opacity-100' : 'opacity-0'}
                         p-[2rem] text-primary text-[1.6rem] font-normal leading-normal flex flex-col gap-[1.5rem] w-[29.6rem] text-nowrap`}
                    >
                      {/* Work Proof */}
                      <div className='w-full'>
                        <div className='w-full flex items-center gap-[1.4rem]'>
                          <WorkProofLinks
                            props={{
                              upwork: listOfdata?.upwork,
                              github: listOfdata?.github,
                              linkedIn: listOfdata?.linkedIn,
                              behance_link: listOfdata?.behance_link,
                            }}
                          />
                        </div>
                        <p className='text-[1.4rem] font-normal text-paragraph1 mt-[1.6rem]'>
                          My Work Proof
                        </p>
                      </div>
                      <hr className='h-[0.1rem] w-full bg-border' />
                      {/* Contact Me */}
                      <div className='w-full'>
                        <div className='w-full flex items-center gap-[1.4rem]'>
                          <ContactMeLinks
                            props={{
                              email: listOfdata?.email,
                              phone_no: listOfdata?.phone_no,
                            }}
                          />
                        </div>
                        <p className='text-[1.4rem] font-normal text-paragraph1 mt-[1.6rem]'>
                          Contact Me
                        </p>
                      </div>
                    </nav>
                  </div>
                </div>
                {/* Buttons */}
                <div className='flex items-center gap-[1rem]'>
                  <button className='btn-secondary  py-[1rem] px-[2.4rem] text-[1.6rem] font-medium rounded-[0.6rem]'>
                    Contact Me
                  </button>
                  <button className='btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-white'>
                    Hire Me
                  </button>
                </div>
              </div>
            </div>
            {/* Mobile Header  */}
            <div className='min-[1100px]:hidden mainContainer flex items-center justify-between bg-white py-[1.2rem] relative z-[200]'>
              {/* User Profile  */}
              <div className='flex justify-center items-center gap-[1.2rem]'>
                <Image
                  src={listOfdata?.profile_photo_1}
                  height={48}
                  width={48}
                  alt='Profile Picture'
                  className='rounded-[50%]'
                />

                <div className='text-heading text-[1.6rem] font-normal leading-tight break-all capitalize'>
                  {listOfdata?.name}
                </div>
              </div>
              {/* Hamburger Icon */}
              <Image
                src={'./images/menu.svg'}
                height={24}
                width={24}
                className={`cursor-pointer`}
                onClick={handleSidebar}
                alt='menu'
              />
              {/* Positioned Sidebar */}
              <div
                className={`fixed top-[7.2rem] w-[30rem] right-0 z-[100] h-full bg-white shadow-lg  duration-300  ${
                  sideBarOpen
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-[30rem] opacity-0'
                }`}
              >
                <div className='overflow-y-auto h-full'>
                  {/* Navinks and Buttons */}
                  <div className='flex flex-col p-[1rem]'>
                    <div className='flex flex-col'>
                      {/* Nav Link */}
                      <nav className='text-[#101828] text-[1.6rem] font-medium leading-[2.4rem] flex flex-col  gap-[2.4rem]'>
                        {headerLinks.map((link, index) => (
                          <div
                            key={index}
                            className={`hover:text-primary duration-300`}
                          >
                            <Link href={link.src}>{link.title}</Link>
                          </div>
                        ))}
                      </nav>
                      {/* Resources DropDwon Menu */}
                      <div className='flex flex-col my-[2rem]'>
                        <div
                          className='text-paragraph1 text-[1.6rem] font-normal leading-normal hover:text-primary duration-300 cursor-pointer flex gap-[0.8rem]'
                          onClick={handleToggle}
                        >
                          <p>Resources</p>
                          <Image
                            src='/images/dropDown.svg' // Use a relative path starting with '/'
                            alt='dropMenu'
                            height={24}
                            width={24}
                            onClick={handleToggle}
                            className={`cursor-pointer duration-300 ${
                              isResourceOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        </div>
                        {/* Positioned DropDown Menu */}
                        <nav
                          className={`rounded-[0.8rem] duration-300 shadow-md bg-white z-50
                  ${isResourceOpen ? 'h-[21.5rem]' : 'h-0'}
                  ${isResourceOpen ? 'opacity-100' : 'opacity-0'}
                     p-[2rem] text-primary text-[1.6rem] font-normal leading-normal flex flex-col gap-[1.5rem] max-w-[32rem] w-full text-nowrap`}
                        >
                          <div className='w-full'>
                            <div className='w-full flex items-center gap-[1.4rem]'>
                              <WorkProofLinks
                                props={{
                                  upwork: listOfdata?.upwork,
                                  github: listOfdata?.github,
                                  linkedIn: listOfdata?.linkedIn,
                                  behance_link: listOfdata?.behance_link,
                                }}
                              />
                            </div>
                            <p className='text-[1.4rem] font-normal text-paragraph1 mt-[1.6rem]'>
                              My Work Proof
                            </p>
                          </div>
                          <hr className='h-[0.1rem] w-full bg-border' />
                          <div className='w-full'>
                            <div className='w-full flex items-center gap-[1.4rem]'>
                              <ContactMeLinks
                                props={{
                                  email: listOfdata?.email,
                                  phone_no: listOfdata?.phone_no,
                                }}
                              />
                            </div>
                            <p className='text-[1.4rem] font-normal text-paragraph1 mt-[1.6rem]'>
                              Contact Me
                            </p>
                          </div>
                        </nav>
                      </div>
                    </div>
                    {/* Buttons */}
                    <div className='w-full flex flex-col gap-[1rem] h-[200px] '>
                      <button className='py-[1rem] px-[2.4rem] text-[1.6rem] font-medium  rounded-[0.6rem] btn-secondary'>
                        Contact Me
                      </button>
                      <button className='btn-primary rounded-[0.6rem] border-2 border-border border-solid py-[1rem] px-[3.4rem] text-[1.6rem] font-medium text-white'>
                        Hire Me
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
