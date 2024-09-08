'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layouts/header/page';
import Footer from '@/components/layouts/footer/page';
import ClientWrapper from '@/components/ClientWrapper'; // Import the ClientWrapper
import React, { useEffect, useRef } from 'react';
import Reports from '@/apiCalls/reports';
import UseURLInfo from '@/components/UseUrlInfo';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Cypex Portfolio',
//   description: 'Next Level Web Application Service Poviders',
// };

export default function RootLayout({ children, params }) {
  const urlInfo: any = UseURLInfo(params);
  const payload = {
    actionType: 'home',
    domain: urlInfo?.domain,
    uniqueId: urlInfo?.uniqueID,
  };

  const contactRef = useRef(null);
  const { listOfdata, loading } = Reports(payload);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    document.title = listOfdata?.name || 'Loading...';
  }, [listOfdata]);

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
