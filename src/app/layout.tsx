import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientWrapper from '@/components/ClientWrapper'; // Import the ClientWrapper
import React, { Suspense, useEffect, useRef, useState } from 'react';
import WebsiteLoader from '@/components/WebsiteLoader';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Portfolio',
//   description: 'Next Level Web Application Service Poviders',
// };

export default function RootLayout({ children, params }) {
  return (
    <html lang='en'>
      <body>
        <div>
          <Suspense fallback={<WebsiteLoader />}>
            <ClientWrapper params={params}>{children}</ClientWrapper>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
