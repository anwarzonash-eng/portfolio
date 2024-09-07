'use client';
import CV from '@/components/pages/cv';
import React from 'react';

const cv = ({ params }: { params: { slug: string } }) => {
  return <CV params={params} />;
};

export default cv;
