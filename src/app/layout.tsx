'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layouts/header/page';
import Footer from '@/components/layouts/footer/page';
import ClientWrapper from '@/components/ClientWrapper'; // Import the ClientWrapper
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getRoutesDetails } from '@/hooks/url';
import { reportsApiHandler } from '@/hooks/apihandlers/reportsApiHandlers';
import { getColors, updateCSSVariables } from '@/hooks/colors';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Cypex Portfolio',
//   description: 'Next Level Web Application Service Poviders',
// };

export default function RootLayout({ children, params }) {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useEffect(() => {
    reportsApiHandler({
      actionType: 'home',
      urlInfo,
      setLoading,
      setListOfData,
    });
  }, [urlInfo]);

  useEffect(() => {
    document.title = listOfdata?.name || 'Loading...';
  }, [listOfdata]);

  const colors = getColors(listOfdata);

  useEffect(() => {
    updateCSSVariables(colors);
  }, [colors]);

  return (
    <html lang='en'>
      <body>
        <div>
          <ClientWrapper>
            <Header
              scrollToContact={scrollToContact}
              listOfdata={listOfdata}
              loading={loading}
              urlInfo={urlInfo}
            />
            {children}
            <Footer
              ref={contactRef}
              listOfdata={listOfdata}
              loading={loading}
              urlInfo={urlInfo}
            />
          </ClientWrapper>
        </div>
      </body>
    </html>
  );
}
