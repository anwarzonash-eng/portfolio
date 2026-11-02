"use client";
import { useEffect, useState, type DependencyList, type RefObject } from "react";

/**
 * Reports whether an element's content overflows its visible height.
 * Re-checks whenever the given deps change (extracted from pages/home).
 */
export const useOverflowCheck = (
  ref: RefObject<HTMLElement | null>,
  deps: DependencyList = []
): boolean => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = ref?.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return isOverflowing;
};

export default useOverflowCheck;
