'use client';

import React, { useEffect, useState } from 'react';
import useBodyBackgroundColor from '@/hooks/useBodyBackgroundColor';
import { useSearchParams } from 'next/navigation';
import { getRoutesDetails } from '@/hooks/url';
import { store } from '@/store';
import { setProfileLoading, setProfileUrlInfo } from '@/store/profileSlice';
import { reportsApiHandler } from '@/hooks/apihandlers/reportsApiHandlers';

const ContactMePage = ({ params }: { params: any }) => {
  const [urlInfo, setURLInfo] = useState(null);
  const [listOfdata, setListOfData] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    setURLInfo(getRoutesDetails(params, searchParams));
  }, [params, searchParams]);

  useBodyBackgroundColor('#EFF5FD');

  useEffect(() => {
    urlInfo &&
      reportsApiHandler({
        actionType: 'home',
        urlInfo,
        setLoading,
        setListOfData,
      });
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileUrlInfo(urlInfo));
  }, [urlInfo]);

  useEffect(() => {
    store.dispatch(setProfileLoading(loading));
  }, [loading]);

  return <></>;
};

export default ContactMePage;
