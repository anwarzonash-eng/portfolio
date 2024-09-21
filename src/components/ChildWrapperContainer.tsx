'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import WebsiteLoader from '@/components/WebsiteLoader';
import ReduxProvider from '@/store/redux-provider';
import ChildWrapper from './ChildWrapper';

const ChildWrapperContainer = ({ children }) => {
  return (
    <div>
      <ReduxProvider>
        <Suspense fallback={<div>loading...</div>}>
          <ChildWrapper>{children}</ChildWrapper>
        </Suspense>
      </ReduxProvider>
    </div>
  );
};

export default ChildWrapperContainer;
