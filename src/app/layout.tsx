'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layouts/header/page';
import Footer from '@/components/layouts/footer/page';
import ClientWrapper from '@/components/ClientWrapper'; // Import the ClientWrapper
import React, { useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Cypex Portfolio',
//   description: 'Next Level Web Application Service Poviders',
// };

export default function RootLayout({ children }) {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <html lang='en'>
      <body>
        <div>
          <ClientWrapper>
            <Header scrollToContact={scrollToContact} />
            {children}
            <Footer ref={contactRef} />
          </ClientWrapper>
        </div>
      </body>
    </html>
  );
}
