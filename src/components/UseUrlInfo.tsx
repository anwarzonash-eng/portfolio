'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getRoutesDetails } from '@/hooks/url';

const UseURLInfo = (params: { slug: string }) => {
  const [urlInfo, setURLInfo] = useState({});
  const searchParams = useSearchParams();

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  return urlInfo;
};

export default UseURLInfo;
