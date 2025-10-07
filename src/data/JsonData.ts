import { formatPhoneNumber } from "@/hooks/formatPhoneNumber";
import { getUsername } from "@/hooks/getUserName";

export const dateFormatsOptions = {
  longMonth: {
    month: "long",
  },
  onlyYear: {
    year: "numeric",
  },
  shortMonthYear: {
    month: "short",
    year: "numeric",
  },
  longMonthYear: {
    month: "long",
    year: "numeric",
  },
  numericMonthYear: {
    month: "2-digit",
    year: "numeric",
  },
  dayMonthYear: {
    day: "2-digit",
    month: "short",
    year: "numeric",
  },
  fullDate: {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  },
};

export const contactDetails = (listOfdata) => [
  {
    type: "Email",
    iconSrc: "/images/mail-icon.svg",
    alt: "Mail",
    value: listOfdata?.email,
    href: `mailto:${listOfdata?.email}`,
  },
  {
    type: "Website",
    iconSrc: "/images/link-icon.svg",
    alt: "Link",
    value: listOfdata?.domain,
    href: listOfdata?.domain,
  },
  {
    type: "Phone",
    iconSrc: "/images/phone-icon.svg",
    alt: "Phone",
    value: formatPhoneNumber(listOfdata?.phone_no),
    href: `tel:${listOfdata?.phone_no}`,
  },
  {
    type: "Location",
    iconSrc: "/images/location-icon.svg",
    alt: "Location",
    value: listOfdata?.location,
    href: `https://www.google.com/maps/place/${listOfdata?.location}
    )}`,
  },
  {
    type: "WhatsApp",
    iconSrc: "/images/whatsapp-cv.svg",
    alt: "WhatsApp",
    value: formatPhoneNumber(listOfdata?.phone_no),
    href: `https://wa.me/${listOfdata?.phone_no}`,
  },
];
export const socialLinks = (listOfdata) => [
  {
    platform: "Upwork",
    iconSrc: "/images/upwork.svg",
    alt: "Upwork",
    // username: listOfdata?.upwork,
    username: listOfdata?.upwork
      ? "@" + listOfdata?.upwork.split("/").pop()
      : null,
    href: listOfdata?.upwork,
  },
  {
    platform: "Github",
    iconSrc: "/images/github.svg",
    alt: "Github",
    username: getUsername(listOfdata?.github),
    href: listOfdata?.github,
  },
  {
    platform: "Linkedin",
    iconSrc: "/images/linkedin.svg",
    alt: "Linkedin",
    username: getUsername(listOfdata?.linkedIn),
    href: listOfdata?.linkedIn,
  },
  {
    platform: "Behance",
    iconSrc: "/images/behance.svg",
    alt: "Behance",
    username: getUsername(listOfdata?.behance_link),
    href: listOfdata?.behance_link,
  },
];

export const FaqsData = [
  {
    question: "How does hiring a freelance developer work?",
    answer:
      "Hiring me is straightforward! After you contact me with your project requirements, we’ll have an initial discussion to understand your goals, scope, and timeline. I’ll then provide a detailed estimate and plan. Once we agree on terms, I’ll begin working on your project. Regular updates will keep you informed throughout.",
    altName: "Hiring",
  },
  {
    question: "Do you offer a free trial to evaluate your skills?",
    answer:
      "Yes! To ensure the quality of my services and to help you assess my skills, I offer a 2-week free trial. This allows you to evaluate my development abilities, work style, and how well I meet your project needs without any upfront commitment.",
    altName: "Trial",
  },
  {
    question: "How do I track the progress of my project?",
    answer:
      "I use project management tools like Trello, Asana, or Monday.com to provide full visibility into your project’s progress. You’ll receive weekly updates, milestone reports, and can track the work in real-time. I also provide live communication through email or WhatsApp to answer any immediate questions.",
    altName: "Tracking",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "I accept a variety of payment methods, including PayPal, Stripe, Payoneer, and direct bank transfers. We can discuss and choose the most convenient payment option for you during the project’s initial discussion.",
    altName: "Payment",
  },
  {
    question: "What if I need changes after the project is completed?",
    answer:
      "I understand that revisions or tweaks might be needed after completion. I offer flexible post-project support, including updates and maintenance services. We can set up a maintenance plan or handle changes on an ad-hoc basis, depending on your needs.",
    altName: "Revisions",
  },
  {
    question: "How do I ensure the work will be delivered on time?",
    answer:
      "I follow a structured timeline with clear milestones. From the start, we’ll agree on deadlines for each phase of the project, and I’ll provide regular progress updates to ensure we’re on track. If you’re unsure about my efficiency, you can take advantage of my 2-week free trial to see how I work firsthand.",
    altName: "Timeliness",
  },
  {
    question: "How do I start with your services?",
    answer:
      "Getting started is simple! You can schedule a call using my Calendly link, click on the quick chat button in the bottom right corner, or contact me via email, WhatsApp, or the contact form on my website. I’ll respond promptly during my working hours to discuss your project.",
    altName: "Starting",
  },
  {
    question: "Can I hire you on Upwork?",
    answer:
      "Yes, I have a verified profile on Upwork, where you can review my job history, ratings, and client feedback. If you’d prefer to hire me through Upwork, just search for my profile, invite me to your project, and we can start the conversation there.",
    altName: "Upwork",
  },
  {
    question: "What is your development process?",
    answer:
      "My development process begins with an in-depth consultation to understand your needs and goals. From there, I move into project planning, wireframing, and design. Once approved, I start development, followed by thorough testing, and then deployment. Throughout the process, I maintain open communication and offer you opportunities to provide feedback at key stages.",
    altName: "Development_process",
  },
  {
    question: "What is your bookkeeping process?",
    answer:
      "  My bookkeeping process begins with an in-depth consultation to understand your financial needs and goals. From there, I move into organizing your financial data, setting up accounting systems, and managing records. Once set, I focus on maintaining accurate bookkeeping, followed by thorough reviews and reporting. Throughout the process, I ensure open communication and offer you opportunities to review and provide feedback at key stages.",
    altName: "bookkeeping_process",
  },
  {
    question: "Do you have a LinkedIn profile?",
    answer:
      "Yes! You can explore my professional journey, skills, and recommendations on LinkedIn. It’s a great way to see my credibility and connect with me directly.",
    altName: "LinkedIn",
  },
  {
    question: "Do you have a GitHub profile?",
    answer:
      "Absolutely! My GitHub showcases real-world projects, code samples, and contributions that reflect my hands-on expertise. It’s the perfect place to evaluate my coding style and technical depth.",
    altName: "GitHub",
  },
];
export const FaqsDataUpdated = [
  {
    "id": "8bc33b51-204f-4a85-9242-4a38c73e35aa",
    "name": "Usman",
    "faqs": [
      {
        "index": 0,
        "type": "u",
        "question": "How do you handle hiring a freelance developer?",
        "answer": "Hiring me is straightforward! After you contact me with your project requirements, we’ll have a discussion to understand your goals, scope, and timeline. I’ll then provide a detailed estimate and a plan. Once we agree, I’ll begin working and keep you informed with regular updates.",
        "altName": "Hiring"
      },
      {
        "index": 1,
        "type": "u",
        "question": "Can I get a free trial to evaluate your skills?",
        "answer": "Yes! To ensure you're confident in my abilities, I offer a 2-week free trial. This allows you to evaluate my development skills, work style, and how well I meet your project needs without any commitment.",
        "altName": "Trial"
      },
      {
        "index": 2,
        "type": "u",
        "question": "How do you track project progress?",
        "answer": "I use project management tools like Trello, Asana, or Monday.com to give you full visibility. You’ll receive weekly updates and milestone reports, and you can track my work in real-time. I also provide live communication via email or WhatsApp for any quick questions.",
        "altName": "Tracking"
      },
      {
        "index": 3,
        "type": "u",
        "question": "What payment methods do you accept?",
        "answer": "I accept a variety of payment methods, including PayPal, Stripe, Payoneer, and direct bank transfers. We can choose the most convenient option for you during our initial project discussion.",
        "altName": "Payment"
      },
      {
        "index": 4,
        "type": "u",
        "question": "What if I need changes after the project is finished?",
        "answer": "I understand that revisions may be needed. I offer flexible post-project support and maintenance services. We can set up a maintenance plan or handle changes on an as-needed basis, depending on your requirements.",
        "altName": "Revisions"
      },
      {
        "index": 5,
        "type": "u",
        "question": "How do you ensure the work is delivered on time?",
        "answer": "I follow a structured timeline with clear milestones. We'll agree on deadlines from the start, and I’ll provide regular progress updates to ensure we stay on track. My 2-week free trial is also a great way to see my efficiency firsthand.",
        "altName": "Timeliness"
      },
      {
        "index": 6,
        "type": "u",
        "question": "How do I start using your services?",
        "answer": "Getting started is simple! You can book a call using my Calendly link, click the quick chat button on my site, or contact me via email, WhatsApp, or the contact form. I’ll respond promptly to discuss your project.",
        "altName": "Starting"
      },
      {
        "index": 7,
        "type": "u",
        "question": "Can I hire you through Upwork?",
        "answer": "Yes, I have a verified Upwork profile where you can review my job history, ratings, and client feedback. If you prefer, just search for my profile and invite me to your project to start the conversation.",
        "altName": "Upwork"
      },
      {
        "index": 8,
        "type": "u",
        "question": "What is your development process?",
        "answer": "My process begins with a deep consultation to understand your needs. I then move into project planning, wireframing, and design. After your approval, I start development, followed by thorough testing and deployment. I keep communication open and offer you opportunities for feedback at key stages.",
        "altName": "Development_process"
      },
      {
        "index": 9,
        "type": "u",
        "question": "What is your bookkeeping process?",
        "answer": "My bookkeeping process starts with a consultation to understand your financial goals. I then organize your data, set up accounting systems, and manage your records. My focus is on maintaining accuracy, followed by regular reviews and reporting. I ensure you can review and provide feedback at key stages.",
        "altName": "bookkeeping_process"
      },
      {
        "index": 10,
        "type": "u",
        "question": "Do you have a LinkedIn profile?",
        "answer": "Yes! You can explore my professional journey, skills, and recommendations on my LinkedIn profile. It's an excellent way to see my credibility and connect with me directly.",
        "altName": "LinkedIn"
      },
      {
        "index": 11,
        "type": "u",
        "question": "Can I see your work on GitHub?",
        "answer": "Absolutely! My GitHub profile showcases real-world projects, code samples, and contributions. It’s the perfect place to evaluate my coding style and technical depth.",
        "altName": "GitHub"
      }
    ]
  },
  {
    "id": "df980eb7-8f8a-4e5c-adf2-37b23e5153ff",
    "name": "Ahmed",
    "faqs": [
      {
        "index": 0,
        "type": "all",
        "question": "How does hiring a freelance developer work?",
        "answer": "The process is straightforward. We'll start with a chat to understand your project, scope, and goals. I'll then provide a detailed plan and a cost estimate. Once we agree on terms, I'll begin work and keep you updated on progress.",
        "altName": "Hiring"
      },
      {
        "index": 1,
        "type": "all",
        "question": "Do you offer a free trial to evaluate your skills?",
        "answer": "Yes. To give you peace of mind, I offer a 2-week free trial. This allows you to assess my development abilities, work style, and see how well I can meet your project requirements before making any financial commitment.",
        "altName": "Trial"
      },
      {
        "index": 2,
        "type": "all",
        "question": "How will I track my project's progress?",
        "answer": "I use dedicated project management tools like Trello, Asana, or Monday.com to give you complete visibility. You'll receive weekly updates and milestone reports, and you can monitor the work in real-time. I also provide communication via email or WhatsApp for quick questions.",
        "altName": "Tracking"
      },
      {
        "index": 3,
        "type": "all",
        "question": "What payment methods do you accept?",
        "answer": "I accept multiple payment options, including PayPal, Stripe, Payoneer, and direct bank transfers. We can discuss and choose the most convenient method for you at the beginning of the project.",
        "altName": "Payment"
      },
      {
        "index": 4,
        "type": "all",
        "question": "What if I need revisions after the project is completed?",
        "answer": "Revisions or tweaks are sometimes necessary. I provide flexible post-project support, including updates and maintenance services. We can set up a formal maintenance plan or simply handle changes on an ad-hoc basis, depending on your needs.",
        "altName": "Revisions"
      },
      {
        "index": 5,
        "type": "all",
        "question": "How do you ensure timely delivery?",
        "answer": "I work with a structured timeline with clear milestones and deadlines for each phase. I'll provide regular progress updates to ensure we stay on schedule. My 2-week free trial is also a great way to verify my efficiency.",
        "altName": "Timeliness"
      },
      {
        "index": 6,
        "type": "all",
        "question": "How do I start with your services?",
        "answer": "Getting started is easy! You can schedule a call through my Calendly link, click the quick chat button on my website, or contact me via email or WhatsApp. I will respond quickly to discuss your project.",
        "altName": "Starting"
      },
      {
        "index": 7,
        "type": "all",
        "question": "Can I hire you on Upwork?",
        "answer": "Yes, I have a verified profile on Upwork. You can view my job history, ratings, and client feedback there. If you prefer to hire me through Upwork, just find my profile and we can start the project conversation there.",
        "altName": "Upwork"
      },
      {
        "index": 8,
        "type": "all",
        "question": "What is your development process?",
        "answer": "My process starts with a consultation to understand your needs. Then, I create a project plan, wireframes, and design concepts. Once approved, I begin development, followed by thorough testing and deployment. I keep communication open and give you opportunities to provide feedback at key stages.",
        "altName": "Development_process"
      },
      {
        "index": 9,
        "type": "all",
        "question": "What is your bookkeeping process?",
        "answer": "My bookkeeping process starts with an in-depth consultation to understand your financial needs. I'll then organize your financial data, set up accounting systems, and manage your records. I focus on accurate bookkeeping and provide thorough reviews and reports, ensuring you can review and provide feedback at key stages.",
        "altName": "bookkeeping_process"
      },
      {
        "index": 10,
        "type": "all",
        "question": "Do you have a LinkedIn profile?",
        "answer": "Yes! You can explore my professional experience, skills, and recommendations on my LinkedIn profile. It's an excellent way to see my credibility and connect directly.",
        "altName": "LinkedIn"
      },
      {
        "index": 11,
        "type": "all",
        "question": "Do you have a GitHub profile?",
        "answer": "Absolutely! My GitHub profile showcases my real-world projects, code samples, and contributions. It’s the perfect place to assess my coding style and technical proficiency.",
        "altName": "GitHub"
      }
    ]
  },
  {
    "id": "700bcf43-9158-4874-9747-74093d2ed9d1",
    "name": "Usama",
    "faqs": [
      {
        "index": 0,
        "type": "not_u",
        "question": "How does hiring a freelance developer work?",
        "answer": "The process is straightforward. First, you'll contact me with your project requirements. We'll have a discussion to understand your goals, scope, and timeline. I'll then provide a detailed proposal and plan. Once we agree, I'll begin the work, keeping you updated with regular progress reports.",
        "altName": "Hiring"
      },
      {
        "index": 1,
        "type": "not_u",
        "question": "Do you offer a free trial to evaluate your skills?",
        "answer": "Yes, to ensure the quality of my services and to help you assess my skills, I offer a 2-week free trial. This allows you to evaluate my development abilities, work style, and how well I meet your project needs without any upfront commitment.",
        "altName": "Trial"
      },
      {
        "index": 2,
        "type": "not_u",
        "question": "How do I track the progress of my project?",
        "answer": "I use project management tools like Trello, Asana, or Monday.com to provide full visibility. You’ll receive weekly updates and milestone reports, and can track the work in real-time. I also maintain open communication via email or WhatsApp to answer any immediate questions.",
        "altName": "Tracking"
      },
      {
        "index": 3,
        "type": "not_u",
        "question": "What payment methods do you accept?",
        "answer": "I accept a variety of payment methods, including PayPal, Stripe, Payoneer, and direct bank transfers. During our initial discussion, we can choose the most convenient payment option for you.",
        "altName": "Payment"
      },
      {
        "index": 4,
        "type": "not_u",
        "question": "What if I need changes after the project is completed?",
        "answer": "I understand that revisions or tweaks may be needed. I offer flexible post-project support, including updates and maintenance services. We can set up a maintenance plan or handle changes on an ad-hoc basis, depending on your needs.",
        "altName": "Revisions"
      },
      {
        "index": 5,
        "type": "not_u",
        "question": "How do you ensure the work will be delivered on time?",
        "answer": "I follow a structured timeline with clear milestones. We'll agree on deadlines for each phase of the project from the start. I’ll also provide regular progress updates to ensure we are on track. If you're unsure about my efficiency, you can use my 2-week free trial to see how I work firsthand.",
        "altName": "Timeliness"
      },
      {
        "index": 6,
        "type": "not_u",
        "question": "How do I start with your services?",
        "answer": "Getting started is simple! You can schedule a call using my Calendly link, click on the quick chat button in the bottom right corner, or contact me via email, WhatsApp, or the contact form on my website. I’ll respond promptly during my working hours to discuss your project.",
        "altName": "Starting"
      },
      {
        "index": 7,
        "type": "not_u",
        "question": "Can I hire you on Upwork?",
        "answer": "Yes, I have a verified profile on Upwork, where you can review my job history, ratings, and client feedback. If you'd prefer to hire me through Upwork, just search for my profile, invite me to your project, and we can start the conversation there.",
        "altName": "Upwork"
      },
      {
        "index": 8,
        "type": "not_u",
        "question": "What is your development process?",
        "answer": "My development process begins with an in-depth consultation to understand your needs and goals. From there, I move into project planning, wireframing, and design. Once approved, I start development, followed by thorough testing, and then deployment. Throughout the process, I maintain open communication and offer you opportunities to provide feedback at key stages.",
        "altName": "Development_process"
      },
      {
        "index": 9,
        "type": "not_u",
        "question": "What is your bookkeeping process?",
        "answer": "My bookkeeping process begins with an in-depth consultation to understand your financial needs and goals. From there, I move into organizing your financial data, setting up accounting systems, and managing records. Once set, I focus on maintaining accurate bookkeeping, followed by thorough reviews and reporting. Throughout the process, I ensure open communication and offer you opportunities to review and provide feedback at key stages.",
        "altName": "bookkeeping_process"
      },
      {
        "index": 10,
        "type": "not_u",
        "question": "Do you have a LinkedIn profile?",
        "answer": "Yes! You can explore my professional journey, skills, and recommendations on LinkedIn. It’s a great way to see my credibility and connect with me directly.",
        "altName": "LinkedIn"
      },
      {
        "index": 11,
        "type": "not_u",
        "question": "Do you have a GitHub profile?",
        "answer": "Absolutely! My GitHub showcases real-world projects, code samples, and contributions that reflect my hands-on expertise. It’s the perfect place to evaluate my coding style and technical depth.",
        "altName": "GitHub"
      }
    ]
  },
  {
    "id": "4e567ac2-48d9-447f-a48e-635269db7802",
    "name": "Farhan",
    "faqs": [
      {
        "index": 0,
        "type": "u",
        "question": "How does hiring a freelance developer work?",
        "answer": "Hiring me is straightforward! After you contact me with your project requirements, we’ll have an initial discussion to understand your goals, scope, and timeline. I’ll then provide a detailed estimate and plan. Once we agree on terms, I’ll begin working on your project. Regular updates will keep you informed throughout.",
        "altName": "Hiring"
      },
      {
        "index": 1,
        "type": "u",
        "question": "Do you offer a free trial to evaluate your skills?",
        "answer": "Yes! To ensure the quality of my services and to help you assess my skills, I offer a 2-week free trial. This allows you to evaluate my development abilities, work style, and how well I meet your project needs without any upfront commitment.",
        "altName": "Trial"
      },
      {
        "index": 2,
        "type": "u",
        "question": "How do I track the progress of my project?",
        "answer": "I use project management tools like Trello, Asana, or Monday.com to provide full visibility into your project’s progress. You’ll receive weekly updates, milestone reports, and can track the work in real-time. I also provide live communication through email or WhatsApp to answer any immediate questions.",
        "altName": "Tracking"
      },
      {
        "index": 3,
        "type": "u",
        "question": "What payment methods do you accept?",
        "answer": "I accept a variety of payment methods, including PayPal, Stripe, Payoneer, and direct bank transfers. We can discuss and choose the most convenient payment option for you during the project’s initial discussion.",
        "altName": "Payment"
      },
      {
        "index": 4,
        "type": "u",
        "question": "What if I need changes after the project is completed?",
        "answer": "I understand that revisions or tweaks might be needed after completion. I offer flexible post-project support, including updates and maintenance services. We can set up a maintenance plan or handle changes on an ad-hoc basis, depending on your needs.",
        "altName": "Revisions"
      },
      {
        "index": 5,
        "type": "u",
        "question": "How do I ensure the work will be delivered on time?",
        "answer": "I follow a structured timeline with clear milestones. From the start, we’ll agree on deadlines for each phase of the project, and I’ll provide regular progress updates to ensure we’re on track. If you’re unsure about my efficiency, you can take advantage of my 2-week free trial to see how I work firsthand.",
        "altName": "Timeliness"
      },
      {
        "index": 6,
        "type": "u",
        "question": "How do I start with your services?",
        "answer": "Getting started is simple! You can schedule a call using my Calendly link, click on the quick chat button in the bottom right corner, or contact me via email, WhatsApp, or the contact form on my website. I’ll respond promptly during my working hours to discuss your project.",
        "altName": "Starting"
      },
      {
        "index": 7,
        "type": "u",
        "question": "Can I hire you on Upwork?",
        "answer": "Yes, I have a verified profile on Upwork, where you can review my job history, ratings, and client feedback. If you’d prefer to hire me through Upwork, just search for my profile, invite me to your project, and we can start the conversation there.",
        "altName": "Upwork"
      },
      {
        "index": 8,
        "type": "u",
        "question": "What is your development process?",
        "answer": "My development process begins with an in-depth consultation to understand your needs and goals. From there, I move into project planning, wireframing, and design. Once approved, I start development, followed by thorough testing, and then deployment. Throughout the process, I maintain open communication and offer you opportunities to provide feedback at key stages.",
        "altName": "Development_process"
      },
      {
        "index": 9,
        "type": "u",
        "question": "What is your bookkeeping process?",
        "answer": "My bookkeeping process begins with an in-depth consultation to understand your financial needs and goals. From there, I move into organizing your financial data, setting up accounting systems, and managing records. Once set, I focus on maintaining accurate bookkeeping, followed by thorough reviews and reporting. Throughout the process, I ensure open communication and offer you opportunities to review and provide feedback at key stages.",
        "altName": "bookkeeping_process"
      },
      {
        "index": 10,
        "type": "u",
        "question": "Do you have a LinkedIn profile?",
        "answer": "Yes! You can explore my professional journey, skills, and recommendations on LinkedIn. It’s a great way to see my credibility and connect with me directly.",
        "altName": "LinkedIn"
      },
      {
        "index": 11,
        "type": "u",
        "question": "Do you have a GitHub profile?",
        "answer": "Absolutely! My GitHub showcases real-world projects, code samples, and contributions that reflect my hands-on expertise. It’s the perfect place to evaluate my coding style and technical depth.",
        "altName": "GitHub"
      }
    ]
  }
];

export const cardData = [
  {
    id: 1,
    title: "Front-end Web Development",
    icon: "📢", // You can also use icon paths
    description: `Equipped with a wealth of frontend development expertise, I specialize in crafting seamless user experiences using technologies such as TypeScript, JavaScript, React, Next.js, Redux, Appolo, Vanilla S, TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment to delivering performant, secure, and accessible web applications is evident.`,
    listItems: [
      {
        text: "Full Stack Developer with deep expertise in designing, building, and deploying end-to-end web solutions.",
        highlight: "designing, building, and deploying",
      },
      {
        text: "Dynamic and results-driven eCommerce specialist with extensive experience in managing online retail operations.",
        highlight: "extensive experience",
      },
      {
        text: "Proficient in front-end technologies such as React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI.",
        highlight:
          "React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI",
      },
      {
        text: "Mastery in JavaScript and TypeScript, reinforced with tools like GraphQL for efficient data fetching.",
        highlight: "MongoDB, MySQL, and PostgreSQL",
      },
      {
        text: "Adept at creating and integrating REST APIs ensuring seamless front-to-back functionality and API Integrations.",
      },
      {
        text: "Renowned for effective team collaboration and communication, ensuring aligned progress and shared vision.",
      },
    ],
    linkText: "Check now",
    linkUrl: "/",
  },
  {
    id: 2,
    title: "Front-end Web Development",
    icon: "📢", // You can also use icon paths
    description: `Equipped with a wealth of frontend development expertise, I specialize in crafting seamless user experiences using technologies such as TypeScript, JavaScript, React, Next.js, Redux, Appolo, Vanilla S, TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment to delivering performant, secure, and accessible web applications is evident.`,
    listItems: [
      {
        text: "Full Stack Developer with deep expertise in designing, building, and deploying end-to-end web solutions.",
        highlight: "designing, building, and deploying",
      },
      {
        text: "Dynamic and results-driven eCommerce specialist with extensive experience in managing online retail operations.",
        highlight: "extensive experience",
      },
      {
        text: "Proficient in front-end technologies such as React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI.",
        highlight:
          "React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI",
      },
      {
        text: "Mastery in JavaScript and TypeScript, reinforced with tools like GraphQL for efficient data fetching.",
        highlight: "MongoDB, MySQL, and PostgreSQL",
      },
      {
        text: "Adept at creating and integrating REST APIs ensuring seamless front-to-back functionality and API Integrations.",
      },
      {
        text: "Renowned for effective team collaboration and communication, ensuring aligned progress and shared vision.",
      },
    ],
    linkText: "Check now",
    linkUrl: "/",
  },
  {
    id: 3,
    title: "Front-end Web Development",
    icon: "📢", // You can also use icon paths
    description: `Equipped with a wealth of frontend development expertise, I specialize in crafting seamless user experiences using technologies such as TypeScript, JavaScript, React, Next.js, Redux, Appolo, Vanilla S, TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment to delivering performant, secure, and accessible web applications is evident.`,
    listItems: [
      {
        text: "Full Stack Developer with deep expertise in designing, building, and deploying end-to-end web solutions.",
        highlight: "designing, building, and deploying",
      },
      {
        text: "Dynamic and results-driven eCommerce specialist with extensive experience in managing online retail operations.",
        highlight: "extensive experience",
      },
      {
        text: "Proficient in front-end technologies such as React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI.",
        highlight:
          "React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI",
      },
      {
        text: "Mastery in JavaScript and TypeScript, reinforced with tools like GraphQL for efficient data fetching.",
        highlight: "MongoDB, MySQL, and PostgreSQL",
      },
      {
        text: "Adept at creating and integrating REST APIs ensuring seamless front-to-back functionality and API Integrations.",
      },
      {
        text: "Renowned for effective team collaboration and communication, ensuring aligned progress and shared vision.",
      },
    ],
    linkText: "Check now",
    linkUrl: "/",
  },
  {
    id: 4,
    title: "Front-end Web Development",
    icon: "📢", // You can also use icon paths
    description: `Equipped with a wealth of frontend development expertise, I specialize in crafting seamless user experiences using technologies such as TypeScript, JavaScript, React, Next.js, Redux, Appolo, Vanilla S, TailwindCSS, MaterialUI, CSS/SASS/SCSS, and more. My commitment to delivering performant, secure, and accessible web applications is evident.`,
    listItems: [
      {
        text: "Full Stack Developer with deep expertise in designing, building, and deploying end-to-end web solutions.",
        highlight: "designing, building, and deploying",
      },
      {
        text: "Dynamic and results-driven eCommerce specialist with extensive experience in managing online retail operations.",
        highlight: "extensive experience",
      },
      {
        text: "Proficient in front-end technologies such as React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI.",
        highlight:
          "React, Next.js, Redux, HTML, CSS, Bootstrap, TailwindCSS, and MaterialUI",
      },
      {
        text: "Mastery in JavaScript and TypeScript, reinforced with tools like GraphQL for efficient data fetching.",
        highlight: "MongoDB, MySQL, and PostgreSQL",
      },
      {
        text: "Adept at creating and integrating REST APIs ensuring seamless front-to-back functionality and API Integrations.",
      },
      {
        text: "Renowned for effective team collaboration and communication, ensuring aligned progress and shared vision.",
      },
    ],
    linkText: "Check now",
    linkUrl: "/",
  },
];

export const blogData = [
  {
    imageSrc: "/images/blogListing/blog1.png",
    category: "Design",
    date: "14 Aug 2024",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    link: "/",
  },
  {
    imageSrc: "/images/blogListing/blog2.png",
    category: "Design",
    date: "14 Aug 2024",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    link: "/",
  },
  {
    imageSrc: "/images/blogListing/blog3.png",
    category: "Design",
    date: "14 Aug 2024",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    link: "/",
  },
  {
    imageSrc: "/images/blogListing/blog4.png",
    category: "Design",
    date: "14 Aug 2024",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    link: "/",
  },
  {
    imageSrc: "/images/blogListing/blog5.png",
    category: "Design",
    date: "14 Aug 2024",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    link: "/",
  },
  {
    imageSrc: "/images/blogListing/blog6.png",
    category: "Design",
    date: "14 Aug 2024",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    link: "/",
  },
  {
    imageSrc: "/images/blogListing/blog7.png",
    category: "Design",
    date: "14 Aug 2024",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    link: "/",
  },
  {
    imageSrc: "/images/blogListing/blog8.png",
    category: "Design",
    date: "14 Aug 2024",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    link: "/",
  },
  {
    imageSrc: "/images/blogListing/blog9.png",
    category: "Design",
    date: "14 Aug 2024",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    link: "/",
  },
  // Add more blog entries here
];

export const authorBlogIds = [
  {
    authorName: "findusman.me",
    id: 2,
    fileName: "/blogsJson/cypexsoft/usman.json",
  },
  {
    authorName: "sadam.me",
    id: 6,
    fileName: "/blogsJson/cypexsoft/saddam.json",
  },
  {
    authorName: "findahmad.me",
    id: 3,
    fileName: "/blogsJson/cypexsoft/ahmad.json",
  },
  {
    authorName: "noyandev.me",
    id: 12,
    fileName: "/blogsJson/cypexsoft/noyan.json",
  },
  {
    authorName: "usamaashraf.dev",
    id: 5,
    fileName: "/blogsJson/cypexsoft/usama.json",
  },
  {
    authorName: "abdullahdev.me",
    id: 11,
    fileName: "/blogsJson/cypexsoft/abdullah.json",
  },
  {
    authorName: "farhanali.dev",
    id: 4,
    fileName: "/blogsJson/cypexsoft/farhan.json",
  },
  {
    authorName: "atifaccountant.com",
    id: 13,
    fileName: "/blogsJson/leewop/atif.json",
  },
  {
    authorName: "basit-cpa.me",
    id: 14,
    fileName: "/blogsJson/cypexsoft/basit.json",
  },
  {
    authorName: "harisdev.me",
    id: 8,
    fileName: "/blogsJson/cypexsoft/haris.json",
  },
  {
    authorName: "muzamildev.me",
    id: 10,
    fileName: "/blogsJson/cypexsoft/muzamil.json",
  },
];
