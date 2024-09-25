'use client';
import { useEffect } from 'react';
import { getColors, updateCSSVariables } from '@/hooks/colors';
import { useAppSelector } from '@/store';
import dynamic from 'next/dynamic';
import Tawkto from './Tawkto';
import ProgressBar from './ProgressBar';

const Header = dynamic(() => import('./layouts/header/page'), {
  ssr: false,
});

const Footer = dynamic(() => import('./layouts/footer/page'), {
  ssr: false,
});

export default function ChildWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);

  const colors = getColors(listOfdata);

  useEffect(() => {
    document.title = listOfdata?.name;

    const updateFavicon = (url: string | undefined) => {
      let favicon = document.querySelector(
        'link[rel="icon"]'
      ) as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.href = url || '';
    };

    // Update favicon based on listOfData
    updateFavicon(listOfdata?.profile_photo_1);
  }, [listOfdata]);

  useEffect(() => {
    updateCSSVariables(colors);
  }, [colors]);

  return (
    <>
      {/* <ProgressBar /> */}
      <Tawkto />
      <Header />

      {children}

      <Footer />
    </>
  );
}
