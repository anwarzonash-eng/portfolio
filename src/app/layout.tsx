import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ChildWrapperContainer from '@/components/ChildWrapperContainer';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal Website, CV, Portfolios, Cover Letter, Contact Details',
  description:
    'Welcome to my personal website! Explore my professional journey through my introductory statement, cover letter, comprehensive CV, and detailed portfolios. Connect with me through my contact details and delve into my educational background. Discover the essence of who I am and what I bring to the table.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <ChildWrapperContainer>{children}</ChildWrapperContainer>
      </body>
    </html>
  );
}
