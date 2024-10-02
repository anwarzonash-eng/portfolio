'use client';

import React, { Suspense } from 'react';
import ReduxProvider from '@/store/redux-provider';
import ChildWrapper from './ChildWrapper';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ChildWrapperContainer = ({ children }) => {
  return (
    <div>
      <ProgressBar
        height='5px'
        color='primary'
        options={{ showSpinner: false }}
        shallowRouting
      />
      <ReduxProvider>
        <Suspense fallback={<></>}>
          <ChildWrapper>{children}</ChildWrapper>
        </Suspense>
      </ReduxProvider>
    </div>
  );
};

export default ChildWrapperContainer;
