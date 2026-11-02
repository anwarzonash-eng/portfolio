'use client';

import ContactMePage from '@/components/pages/contact-me';
import type { PageProps } from "@/types/page";

const contact = ({ params }: PageProps) => {
  return <ContactMePage params={params} />;
};

export default contact;
