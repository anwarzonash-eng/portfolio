import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layouts/header/page';
import Footer from '@/components/layouts/footer/page';
import ClientWrapper from '@/components/ClientWrapper'; // Import the ClientWrapper

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cypex Portfolio',
  description: 'Next Level Web Application Service Poviders',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <div>
          <ClientWrapper>
            {' '}
            {/* Wrap content with ClientWrapper */}
            <Header />
            {children}
            <Footer />
          </ClientWrapper>
        </div>
      </body>
    </html>
  );
}
