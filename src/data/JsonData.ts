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
  {
    type: 'WhatsApp',
    iconSrc: '/images/whatsapp-cv.svg',
    alt: 'WhatsApp',
    value: 'https://www.whatsapp.com/',
    href: `https://wa.me/${listOfdata?.phone_no}`,
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
    platform: 'Behance',
    iconSrc: '/images/behance.svg',
    alt: 'Behance',
    username: listOfdata?.behance_link,
    href: listOfdata?.behance_link,
  },
];

export const FaqsData = [
  {
    question: 'How does hiring a freelance developer work?',
    answer:
      'Hiring me is straightforward! After you contact me with your project requirements, we’ll have an initial discussion to understand your goals, scope, and timeline. I’ll then provide a detailed estimate and plan. Once we agree on terms, I’ll begin working on your project. Regular updates will keep you informed throughout.',
    altName: 'Hiring',
  },
  {
    question: 'Do you offer a free trial to evaluate your skills?',
    answer:
      'Yes! To ensure the quality of my services and to help you assess my skills, I offer a 2-week free trial. This allows you to evaluate my development abilities, work style, and how well I meet your project needs without any upfront commitment.',
    altName: 'Trial',
  },
  {
    question: 'How do I track the progress of my project?',
    answer:
      'I use project management tools like Trello, Asana, or Monday.com to provide full visibility into your project’s progress. You’ll receive weekly updates, milestone reports, and can track the work in real-time. I also provide live communication through email or WhatsApp to answer any immediate questions.',
    altName: 'Tracking',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'I accept a variety of payment methods, including PayPal, Stripe, Payoneer, and direct bank transfers. We can discuss and choose the most convenient payment option for you during the project’s initial discussion.',
    altName: 'Payment',
  },
  {
    question: 'What if I need changes after the project is completed?',
    answer:
      'I understand that revisions or tweaks might be needed after completion. I offer flexible post-project support, including updates and maintenance services. We can set up a maintenance plan or handle changes on an ad-hoc basis, depending on your needs.',
    altName: 'Revisions',
  },
  {
    question: 'How do I ensure the work will be delivered on time?',
    answer:
      'I follow a structured timeline with clear milestones. From the start, we’ll agree on deadlines for each phase of the project, and I’ll provide regular progress updates to ensure we’re on track. If you’re unsure about my efficiency, you can take advantage of my 2-week free trial to see how I work firsthand.',
    altName: 'Timeliness',
  },
  {
    question: 'How do I start with your services?',
    answer:
      'Getting started is simple! You can schedule a call using my Calendly link, click on the quick chat button in the bottom right corner, or contact me via email, WhatsApp, or the contact form on my website. I’ll respond promptly during my working hours to discuss your project.',
    altName: 'Starting',
  },
  {
    question: 'Can I hire you on Upwork?',
    answer:
      'Yes, I have a verified profile on Upwork, where you can review my job history, ratings, and client feedback. If you’d prefer to hire me through Upwork, just search for my profile, invite me to your project, and we can start the conversation there.',
    altName: 'Upwork',
  },
  {
    question: 'What is your development process?',
    answer:
      'My development process begins with an in-depth consultation to understand your needs and goals. From there, I move into project planning, wireframing, and design. Once approved, I start development, followed by thorough testing, and then deployment. Throughout the process, I maintain open communication and offer you opportunities to provide feedback at key stages.',
    altName: 'Development_process',
  },
  {
    question: 'What is your bookkeeping process?',
    answer:
      '  My bookkeeping process begins with an in-depth consultation to understand your financial needs and goals. From there, I move into organizing your financial data, setting up accounting systems, and managing records. Once set, I focus on maintaining accurate bookkeeping, followed by thorough reviews and reporting. Throughout the process, I ensure open communication and offer you opportunities to review and provide feedback at key stages.',
    altName: 'bookkeeping_process',
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

export const authorBlogIds = [
  {
    authorName: 'findusman.me',
    id: 2,
  },
  {
    authorName: 'saddamdev.me',
    id: 6,
  },
  {
    authorName: 'findahmad.me',
    id: 3,
  },
  {
    authorName: 'noyandev.me',
    id: 12,
  },
  {
    authorName: 'usamaashraf.dev',
    id: 5,
  },
  {
    authorName: 'abdullahdev.me',
    id: 11,
  },
  {
    authorName: 'farhanali.dev',
    id: 4,
  },
  {
    authorName: 'atifaccountant.com',
    id: 13,
  },
  {
    authorName: 'basit-cpa.me',
    id: 14,
  },
  {
    authorName: 'harisdev.me',
    id: 8,
  },
  {
    authorName: 'muzamildev.me',
    id: 10,
  },
];
