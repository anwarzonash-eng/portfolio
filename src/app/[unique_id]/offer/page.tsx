import Offer from '@/components/pages/offer';
import React from 'react';

const offer = ({ params }: { params: { slug: string } }) => {
  return <Offer params={params} />;
};

export default offer;
