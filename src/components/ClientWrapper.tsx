'use client';

import { usePathname } from 'next/navigation';
import OfferBanner from '@/components/OfferBanner';

import { useEffect, useRef, useState } from 'react';

const Header = dynamic(() => import('./layouts/header/page'), {
  ssr: false,
});

const Footer = dynamic(() => import('./layouts/footer/page'), {
  ssr: false,
});

import { getColors, updateCSSVariables } from '@/hooks/colors';
import { useAppSelector } from '@/store';
import dynamic from 'next/dynamic';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const listOfdata = useAppSelector((state) => state.profile.listOfProfileData);

  const colors = getColors(listOfdata);

  useEffect(() => {
    document.title = listOfdata?.name || 'Loading...';
  }, [listOfdata]);

  useEffect(() => {
    updateCSSVariables(colors);
  }, [colors]);

  return (
    <>
      {isHomepage && <OfferBanner />}
      <Header />

      {children}

      <Footer />
    </>
  );
}
