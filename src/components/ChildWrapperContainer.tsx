'use client';

import React, { Suspense, useEffect } from 'react';
import ReduxProvider from '@/store/redux-provider';
import ChildWrapper from './ChildWrapper';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

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
        <Suspense fallback={<></>}>
          <ChildWrapper>{children}</ChildWrapper>
        </Suspense>
      </ReduxProvider>
    </div>
  );
};

export default ChildWrapperContainer;
