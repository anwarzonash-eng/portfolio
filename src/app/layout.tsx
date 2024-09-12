'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientWrapper from '@/components/ClientWrapper'; // Import the ClientWrapper
import React, { Suspense, useEffect, useRef, useState } from 'react';
import WebsiteLoader from '@/components/WebsiteLoader';
import ReduxProvider from '@/store/redux-provider';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Portfolio',
//   description: 'Next Level Web Application Service Poviders',
// };

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <div>
          <ReduxProvider>
            <Suspense fallback={<WebsiteLoader />}>
              <ClientWrapper>{children}</ClientWrapper>
            </Suspense>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
