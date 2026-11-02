"use client";
import { useEffect, useState } from "react";

/**
 * Shared replacement for the copy-pasted `checkMobile` resize effect.
 * Defaults to the < lg (1024px) breakpoint the pages were using.
 */
export const useIsMobile = (breakpoint: number = 1024): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
