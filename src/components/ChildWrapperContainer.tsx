"use client";

import React, { Suspense } from "react";
import ReduxProvider from "@/store/redux-provider";
import ChildWrapper from "./ChildWrapper";
import { usePathname } from "next/navigation";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ChildWrapperContainer = ({ children }) => {
  const pathname = usePathname();

  // const hideHeaderFooterPaths = [
  //   "/print/home",
  //   "/print/portfolio",
  //   "/print/cvPortrait",
  //   "/print/cvLandscape",
  //   "/print/cvPortrait1",
  // ];

  // const isHiddenPaths =
  //   hideHeaderFooterPaths.includes(pathname) ||
  //   pathname.includes("/print/portfolio") ||
  //   pathname.includes("/print/home") ||
  //   pathname.includes("/print/cvPortrait") ||
  //   pathname.includes("/print/cvLandscape") ||
  //   pathname.includes("/print/cvPortrait1");

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
