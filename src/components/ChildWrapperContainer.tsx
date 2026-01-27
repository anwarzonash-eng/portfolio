"use client";

import React, { Suspense } from "react";
import ReduxProvider from "@/store/redux-provider";
import ChildWrapper from "./ChildWrapper";
import { usePathname } from "next/navigation";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ChildWrapperContainer = ({ children }) => {
  const pathname = usePathname();

  return (
    <div>
      <ProgressBar
        height="4px"
        color="primary"
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
