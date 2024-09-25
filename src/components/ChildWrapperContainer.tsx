'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import WebsiteLoader from '@/components/WebsiteLoader';
import ReduxProvider from '@/store/redux-provider';
import ChildWrapper from './ChildWrapper';
import ProgressBar from './ProgressBar';

const ChildWrapperContainer = ({ children }) => {
  return (
    <div>
      <ReduxProvider>
        <ProgressBar />
        <Suspense>
          <ChildWrapper>{children}</ChildWrapper>
        </Suspense>
      </ReduxProvider>
    </div>
  );
};

export default ChildWrapperContainer;
