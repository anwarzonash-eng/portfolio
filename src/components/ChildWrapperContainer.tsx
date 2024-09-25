'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import ReduxProvider from '@/store/redux-provider';
import ChildWrapper from './ChildWrapper';

const ChildWrapperContainer = ({ children }) => {
  return (
    <div>
      <ReduxProvider>
        <Suspense>
          <ChildWrapper>{children}</ChildWrapper>
        </Suspense>
      </ReduxProvider>
    </div>
  );
};

export default ChildWrapperContainer;
