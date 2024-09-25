'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';

const ProgressBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
};

export default ProgressBar;
