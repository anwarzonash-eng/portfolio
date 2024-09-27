'use client';

import React, { Suspense, useEffect } from 'react';
import ReduxProvider from '@/store/redux-provider';
import ChildWrapper from './ChildWrapper';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Make sure to import the CSS

const ChildWrapperContainer = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [pathname, searchParams]);
  return (
    <div>
      <ReduxProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <ChildWrapper>{children}</ChildWrapper>
        </Suspense>
      </ReduxProvider>
    </div>
  );
};

export default ChildWrapperContainer;
