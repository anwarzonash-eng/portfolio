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

export const FaqsData = [
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Yes you can change your plan whenever you want.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Our cancellation policy is very customer friendly.',
  },
  {
    question: 'How does billing work?',
    answer: 'Billing works around the same day you make payment.',
  },
  {
    question: 'How do I change my account email?',
    answer:
      'You can easily change your account via connecting our customer support experts.',
  },
];

export const cardData = [
  {
    id: 1,
    title: 'Front-end Web Development',
    icon: '📢', // You can also use icon paths
    description: `Equipped with a wealth of frontend development expertise, I specialize in crafting seamless user experiences using technologies such as TypeScript, JavaScript, React, Next.js, Redux, Appolo, Vanilla S, TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment to delivering performant, secure, and accessible web applications is evident.`,
    listItems: [
      {
        text: 'Full Stack Developer with deep expertise in designing, building, and deploying end-to-end web solutions.',
        highlight: 'designing, building, and deploying',
      },
      {
        text: 'Dynamic and results-driven eCommerce specialist with extensive experience in managing online retail operations.',
        highlight: 'extensive experience',
      },
      {
        text: 'Proficient in front-end technologies such as React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI.',
        highlight:
          'React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI',
      },
      {
        text: 'Mastery in JavaScript and TypeScript, reinforced with tools like GraphQL for efficient data fetching.',
        highlight: 'MongoDB, MySQL, and PostgreSQL',
      },
      {
        text: 'Adept at creating and integrating REST APIs ensuring seamless front-to-back functionality and API Integrations.',
      },
      {
        text: 'Renowned for effective team collaboration and communication, ensuring aligned progress and shared vision.',
      },
    ],
    linkText: 'Check now',
    linkUrl: '/',
  },
  {
    id: 2,
    title: 'Front-end Web Development',
    icon: '📢', // You can also use icon paths
    description: `Equipped with a wealth of frontend development expertise, I specialize in crafting seamless user experiences using technologies such as TypeScript, JavaScript, React, Next.js, Redux, Appolo, Vanilla S, TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment to delivering performant, secure, and accessible web applications is evident.`,
    listItems: [
      {
        text: 'Full Stack Developer with deep expertise in designing, building, and deploying end-to-end web solutions.',
        highlight: 'designing, building, and deploying',
      },
      {
        text: 'Dynamic and results-driven eCommerce specialist with extensive experience in managing online retail operations.',
        highlight: 'extensive experience',
      },
      {
        text: 'Proficient in front-end technologies such as React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI.',
        highlight:
          'React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI',
      },
      {
        text: 'Mastery in JavaScript and TypeScript, reinforced with tools like GraphQL for efficient data fetching.',
        highlight: 'MongoDB, MySQL, and PostgreSQL',
      },
      {
        text: 'Adept at creating and integrating REST APIs ensuring seamless front-to-back functionality and API Integrations.',
      },
      {
        text: 'Renowned for effective team collaboration and communication, ensuring aligned progress and shared vision.',
      },
    ],
    linkText: 'Check now',
    linkUrl: '/',
  },
  {
    id: 3,
    title: 'Front-end Web Development',
    icon: '📢', // You can also use icon paths
    description: `Equipped with a wealth of frontend development expertise, I specialize in crafting seamless user experiences using technologies such as TypeScript, JavaScript, React, Next.js, Redux, Appolo, Vanilla S, TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment to delivering performant, secure, and accessible web applications is evident.`,
    listItems: [
      {
        text: 'Full Stack Developer with deep expertise in designing, building, and deploying end-to-end web solutions.',
        highlight: 'designing, building, and deploying',
      },
      {
        text: 'Dynamic and results-driven eCommerce specialist with extensive experience in managing online retail operations.',
        highlight: 'extensive experience',
      },
      {
        text: 'Proficient in front-end technologies such as React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI.',
        highlight:
          'React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI',
      },
      {
        text: 'Mastery in JavaScript and TypeScript, reinforced with tools like GraphQL for efficient data fetching.',
        highlight: 'MongoDB, MySQL, and PostgreSQL',
      },
      {
        text: 'Adept at creating and integrating REST APIs ensuring seamless front-to-back functionality and API Integrations.',
      },
      {
        text: 'Renowned for effective team collaboration and communication, ensuring aligned progress and shared vision.',
      },
    ],
    linkText: 'Check now',
    linkUrl: '/',
  },
  {
    id: 4,
    title: 'Front-end Web Development',
    icon: '📢', // You can also use icon paths
    description: `Equipped with a wealth of frontend development expertise, I specialize in crafting seamless user experiences using technologies such as TypeScript, JavaScript, React, Next.js, Redux, Appolo, Vanilla S, TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment to delivering performant, secure, and accessible web applications is evident.`,
    listItems: [
      {
        text: 'Full Stack Developer with deep expertise in designing, building, and deploying end-to-end web solutions.',
        highlight: 'designing, building, and deploying',
      },
      {
        text: 'Dynamic and results-driven eCommerce specialist with extensive experience in managing online retail operations.',
        highlight: 'extensive experience',
      },
      {
        text: 'Proficient in front-end technologies such as React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI.',
        highlight:
          'React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI',
      },
      {
        text: 'Mastery in JavaScript and TypeScript, reinforced with tools like GraphQL for efficient data fetching.',
        highlight: 'MongoDB, MySQL, and PostgreSQL',
      },
      {
        text: 'Adept at creating and integrating REST APIs ensuring seamless front-to-back functionality and API Integrations.',
      },
      {
        text: 'Renowned for effective team collaboration and communication, ensuring aligned progress and shared vision.',
      },
    ],
    linkText: 'Check now',
    linkUrl: '/',
  },
];

export const blogData = [
  {
    imageSrc: '/images/blogListing/blog1.png',
    category: 'Design',
    date: '14 Aug 2024',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    link: '/',
  },
  {
    imageSrc: '/images/blogListing/blog2.png',
    category: 'Design',
    date: '14 Aug 2024',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    link: '/',
  },
  {
    imageSrc: '/images/blogListing/blog3.png',
    category: 'Design',
    date: '14 Aug 2024',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    link: '/',
  },
  {
    imageSrc: '/images/blogListing/blog4.png',
    category: 'Design',
    date: '14 Aug 2024',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    link: '/',
  },
  {
    imageSrc: '/images/blogListing/blog5.png',
    category: 'Design',
    date: '14 Aug 2024',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    link: '/',
  },
  {
    imageSrc: '/images/blogListing/blog6.png',
    category: 'Design',
    date: '14 Aug 2024',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    link: '/',
  },
  {
    imageSrc: '/images/blogListing/blog7.png',
    category: 'Design',
    date: '14 Aug 2024',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    link: '/',
  },
  {
    imageSrc: '/images/blogListing/blog8.png',
    category: 'Design',
    date: '14 Aug 2024',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    link: '/',
  },
  {
    imageSrc: '/images/blogListing/blog9.png',
    category: 'Design',
    date: '14 Aug 2024',
    title: 'UX review presentations',
    description:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    link: '/',
  },
  // Add more blog entries here
];
