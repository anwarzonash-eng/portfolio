'use client';
import Home from '@/components/pages/home';
import React from 'react';

const index = ({ params }: { params: { slug: string } }) => {
  return <Home params={params} />;
};

export default index;
