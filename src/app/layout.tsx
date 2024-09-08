'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layouts/header/page';
import Footer from '@/components/layouts/footer/page';
import ClientWrapper from '@/components/ClientWrapper'; // Import the ClientWrapper
import React, { useEffect, useRef } from 'react';
import Reports from '@/apiCalls/reports';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Cypex Portfolio',
//   description: 'Next Level Web Application Service Poviders',
// };

export default function RootLayout({ children }) {
  const contactRef = useRef(null);
  const { listOfdata, loading } = Reports('home');

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
            />
            {children}
            <Footer
              ref={contactRef}
              listOfdata={listOfdata}
              loading={loading}
            />
          </ClientWrapper>
        </div>
      </body>
    </html>
  );
}
