import { formatPhoneNumber } from '@/hooks/formatPhoneNumber';

export const dateFormatsOptions = {
  longMonth: {
    month: 'long',
  },
  onlyYear: {
    year: 'numeric',
  },
  shortMonthYear: {
    month: 'short',
    year: 'numeric',
  },
  longMonthYear: {
    month: 'long',
    year: 'numeric',
  },
  numericMonthYear: {
    month: '2-digit',
    year: 'numeric',
  },
  dayMonthYear: {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  },
  fullDate: {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  },
};

export const contactDetails = (listOfdata) => [
  {
    type: 'Email',
    iconSrc: '/images/mail-icon.svg',
    alt: 'Mail',
    value: listOfdata?.email,
    href: `mailto:${listOfdata?.email}`,
  },
  {
    type: 'Website',
    iconSrc: '/images/link-icon.svg',
    alt: 'Link',
    value: listOfdata?.domain,
    href: listOfdata?.domain,
  },
  {
    type: 'Phone',
    iconSrc: '/images/phone-icon.svg',
    alt: 'Phone',
    value: formatPhoneNumber(listOfdata?.phone_no),
    href: `tel:${listOfdata?.phone_no}`,
  },
  {
    type: 'Location',
    iconSrc: '/images/location-icon.svg',
    alt: 'Location',
    value: listOfdata?.location,
    href: `https://www.google.com/maps/place/${listOfdata?.location}
    )}`,
  },
];
export const socialLinks = (listOfdata) => [
  {
    platform: 'Upwork',
    iconSrc: '/images/upwork.svg',
    alt: 'Upwork',
    username: listOfdata?.upwork,
    href: listOfdata?.upwork,
  },
  {
    platform: 'Github',
    iconSrc: '/images/github.svg',
    alt: 'Github',
    username: listOfdata?.github,
    href: listOfdata?.github,
  },
  {
    platform: 'Linkedin',
    iconSrc: '/images/linkedin.svg',
    alt: 'Linkedin',
    username: listOfdata?.linkedIn,
    href: listOfdata?.linkedIn,
  },
  {
    platform: 'Dribbble',
    iconSrc: '/images/dribbble.svg',
    alt: 'Dribbble',
    username: '',
    href: '',
  },
  {
    platform: 'Behance',
    iconSrc: '/images/behance.svg',
    alt: 'Behance',
    username: listOfdata?.behance_link,
    href: listOfdata?.behance_link,
  },
];

export const blogs = [
  {
    id: 1,
    category: 'Design',
    date: '17 Jan 2022',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blogPost1.png',
    link: '/',
  },
  {
    id: 2,
    category: 'Design',
    date: '17 Jan 2022',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blogPost2.png',
    link: '/',
  },
  {
    id: 3,
    category: 'Design',
    date: '17 Jan 2022',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: '/images/blogPost3.png',
    link: '/',
  },
];
