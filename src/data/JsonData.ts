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


export const FaqsDataUpdated = [
  {
    id: "8bc33b51-204f-4a85-9242-4a38c73e35aa",
    name: "Usman",
    faqs: [
      {
        index: 0,
        type: "u",
        question: "How do you handle hiring a freelance developer?",
        answer:
          "Hiring me is straightforward! After you contact me with your project requirements, we’ll have a discussion to understand your goals, scope, and timeline. I’ll then provide a detailed estimate and a plan. Once we agree, I’ll begin working and keep you informed with regular updates.",
        altName: "Hiring",
      },
      {
        index: 1,
        type: "not_u",
        question: "Can I get a free trial to evaluate your skills?",
        answer:
          "Yes! To ensure you're confident in my abilities, I offer a 2-week free trial. This allows you to evaluate my development skills, work style, and how well I meet your project needs without any commitment.",
        altName: "Trial",
      },
      {
        index: 2,
        type: "not_u",
        question: "How do you track project progress?",
        answer:
          "I use project management tools like Trello, Asana, or Monday.com to give you full visibility. You’ll receive weekly updates and milestone reports, and you can track my work in real-time. I also provide live communication via {email_link}email{end} or {whatsapp_link}WhatsApp{end} for any quick questions.",
        altName: "Tracking",
      },
      {
        index: 3,
        type: "not_u",
        question: "What payment methods do you accept?",
        answer:
          "I accept a variety of payment methods, including PayPal, Stripe, Payoneer, and direct bank transfers. We can choose the most convenient option for you during our initial project discussion.",
        altName: "Payment",
      },
      {
        index: 4,
        type: "u",
        question: "What if I need changes after the project is finished?",
        answer:
          "I understand that revisions may be needed. I offer flexible post-project support and maintenance services. We can set up a maintenance plan or handle changes on an as-needed basis, depending on your requirements.",
        altName: "Revisions",
      },
      {
        index: 5,
        type: "u",
        question: "How do you ensure the work is delivered on time?",
        answer:
          "I follow a structured timeline with clear milestones. We'll agree on deadlines from the start, and I’ll provide regular progress updates to ensure we stay on track. My 2-week free trial is also a great way to see my efficiency firsthand.",
        altName: "Timeliness",
      },
      {
        index: 6,
        type: "not_u",
        question: "How do I start using your services?",
        answer:
          "Getting started is simple! You can book a call using my {calendly_link}Calendly link{end}, click the quick chat button on my {website_link}site{end}, or contact me via {email_link}email{end}, {whatsapp_link}WhatsApp{end}, or the contact form. I’ll respond promptly to discuss your project.",
        altName: "Starting",
      },
      {
        index: 7,
        type: "u",
        question: "Can I hire you through Upwork?",
        answer:
          "Yes, I have a verified {upwork_profile_link}Upwork profile{end} where you can review my job history, ratings, and client feedback. If you prefer, just search for my profile and invite me to your project to start the conversation.",
        altName: "Upwork",
      },
      {
        index: 8,
        type: "u",
        question: "What is your development process?",
        answer:
          "My process begins with a deep consultation to understand your needs. I then move into project planning, wireframing, and design. After your approval, I start development, followed by thorough testing and deployment. I keep communication open and offer you opportunities for feedback at key stages.",
        altName: "Development_process",
      },
      {
        index: 9,
        type: "u",
        question: "What is your bookkeeping process?",
        answer:
          "My bookkeeping process starts with a consultation to understand your financial goals. I then organize your data, set up accounting systems, and manage your records. My focus is on maintaining accuracy, followed by regular reviews and reporting. I ensure you can review and provide feedback at key stages.",
        altName: "bookkeeping_process",
      },
      {
        index: 10,
        type: "u",
        question: "Do you have a LinkedIn profile?",
        answer:
          "Yes! You can explore my professional journey, skills, and recommendations on my {linked_profile_link}LinkedIn profile{end}. It's an excellent way to see my credibility and connect with me directly.",
        altName: "LinkedIn",
      },
      {
        index: 11,
        type: "u",
        question: "Can I see your work on GitHub?",
        answer:
          "Absolutely! My {github_profile_link}GitHub profile{end} showcases real-world projects, code samples, and contributions. It’s the perfect place to evaluate my coding style and technical depth.",
        altName: "GitHub",
      },
    ],
  },
  {
    id: "df980eb7-8f8a-4e5c-adf2-37b23e5153ff",
    name: "Ahmad",
    faqs: [
      {
        index: 0,
        type: "all",
        question:
          "What’s the process for hiring a freelance developer like me?",
        answer:
          "It’s simple. We’ll start with a quick chat to outline your goals, scope, and timeline. I’ll then share a plan with clear deliverables and pricing. Once everything’s approved, I’ll get started and keep you updated as the work progresses.",
        altName: "Hiring",
      },
      {
        index: 1,
        type: "not_u",
        question: "Do you offer a free trial before starting?",
        answer:
          "Yes, I do. You can start with a 2-week free trial to see how I work, evaluate my development skills, and check how well I align with your project needs — no upfront cost involved.",
        altName: "Trial",
      },
      {
        index: 2,
        type: "all",
        question: "How can I monitor the progress of my project?",
        answer:
          "I use project management tools like Trello, Asana, and Monday.com to keep everything transparent. You’ll get regular updates, milestone reports, and access to real-time progress. You can also reach me directly via {email_link}email{end} or {whatsapp_link}WhatsApp{end} whenever needed.",
        altName: "Tracking",
      },
      {
        index: 3,
        type: "all",
        question: "Which payment options do you support?",
        answer:
          "I accept multiple methods — PayPal, Stripe, Payoneer, and direct bank transfers. During our initial call, we’ll decide on whichever option works best for you.",
        altName: "Payment",
      },
      {
        index: 4,
        type: "all",
        question: "What if I want changes after delivery?",
        answer:
          "That’s not a problem. I provide ongoing support even after the project wraps up. You can choose between a fixed maintenance plan or request updates whenever needed — totally flexible.",
        altName: "Revisions",
      },
      {
        index: 5,
        type: "all",
        question: "How do you make sure projects are delivered on time?",
        answer:
          "I set clear milestones and stick to a defined timeline from day one. You’ll get regular progress updates to stay informed. My 2-week trial is also a good way to see how efficiently I work.",
        altName: "Timeliness",
      },
      {
        index: 6,
        type: "not_u",
        question: "How do I get started with your services?",
        answer:
          "Getting started is easy. You can schedule a call through my {calendly_link}Calendly link{end}, use the chat button on my {website_link}website{end}, or reach me via {email_link}email{end} or {whatsapp_link}WhatsApp{end}. I usually reply quickly to discuss your project details.",
        altName: "Starting",
      },
      {
        index: 7,
        type: "all",
        question: "Is it possible to hire you through Upwork?",
        answer:
          "Yes. I have a verified {upwork_profile_link}Upwork profile{end} where you can view my portfolio, reviews, and job history. If you prefer working through Upwork, simply send me an invite and we’ll start there.",
        altName: "Upwork",
      },
      {
        index: 8,
        type: "all",
        question: "Can you describe your development process?",
        answer:
          "My workflow starts with understanding your requirements in detail. Then I prepare a project plan, design mockups, and get your approval. Once confirmed, I handle development, testing, and deployment — keeping communication open at every step.",
        altName: "Development_process",
      },
      {
        index: 9,
        type: "all",
        question: "How do you manage bookkeeping projects?",
        answer:
          "For bookkeeping, I begin with a detailed discussion to understand your financial structure. After that, I organize records, implement accounting tools, and ensure everything stays accurate with regular reviews and reports.",
        altName: "bookkeeping_process",
      },
      {
        index: 10,
        type: "all",
        question: "Can I find you on LinkedIn?",
        answer:
          "Yes, you can. My {linked_profile_link}LinkedIn profile{end} highlights my experience, professional background, and recommendations. It’s a great way to learn more about my work and connect directly.",
        altName: "LinkedIn",
      },
      {
        index: 11,
        type: "all",
        question: "Where can I see your code work?",
        answer:
          "You can check my {github_profile_link}GitHub profile{end} to explore my projects, repositories, and contributions. It’s the best place to see my technical approach and code quality in real-world work.",
        altName: "GitHub",
      },
    ],
  },
  {
    id: "700bcf43-9158-4874-9747-74093d2ed9d1",
    name: "Usama",
    faqs: [
      {
        index: 0,
        type: "not_u",
        question: "What’s the process of hiring you for a project?",
        answer:
          "It starts with a quick chat about your project goals and requirements. Once I understand your scope, I’ll share a detailed proposal and estimated cost. After we agree on terms, I begin development and keep you updated with regular progress reports until completion.",
        altName: "Hiring",
      },
      {
        index: 1,
        type: "not_u",
        question: "Can I test your skills before committing?",
        answer:
          "Yes, I offer a 2-week free trial so you can get a feel for my work quality, communication style, and speed before making any payment. It’s a no-risk way to see if I’m the right fit for your project.",
        altName: "Trial",
      },
      {
        index: 2,
        type: "not_u",
        question: "How will I know what progress is being made?",
        answer:
          "I use tools like Trello, Asana, or Monday.com to give you full transparency on each task. You’ll get weekly updates and milestone reports. You can also message me anytime through {email_link}email{end} or {whatsapp_link}WhatsApp{end} for quick updates.",
        altName: "Tracking",
      },
      {
        index: 3,
        type: "not_u",
        question: "Which payment methods can I use?",
        answer:
          "You can pay through PayPal, Stripe, Payoneer, or direct bank transfer — whatever works best for you. We’ll confirm the preferred option before starting the project.",
        altName: "Payment",
      },
      {
        index: 4,
        type: "all",
        question: "Can I request updates after delivery?",
        answer:
          "Of course. I offer flexible post-project support for revisions, updates, and maintenance. You can either choose a small monthly maintenance plan or handle tweaks as needed — whatever fits your workflow.",
        altName: "Revisions",
      },
      {
        index: 5,
        type: "not_u",
        question: "How do you make sure projects finish on schedule?",
        answer:
          "I plan every project around clear milestones and deliverables. You’ll get timeline updates at each stage. My 2-week free trial also helps you gauge my speed and consistency early on.",
        altName: "Timeliness",
      },
      {
        index: 6,
        type: "not_u",
        question: "What’s the best way to get started with you?",
        answer:
          "You can schedule a meeting through {calendly_link}Calendly link{end}, start a chat on my {website_link}website{end}, or message me directly via {email_link}email{end} or {whatsapp_link}WhatsApp{end}. I’ll get back to you quickly to discuss your idea and next steps.",
        altName: "Starting",
      },
      {
        index: 7,
        type: "all",
        question: "Do you work through Upwork too?",
        answer:
          "Yes, you can hire me via my {upwork_profile_link}Upwork profile{end} if you prefer using that platform. You’ll find my job history, reviews, and portfolio there — it’s a good way to see how I’ve delivered for past clients.",
        altName: "Upwork",
      },
      {
        index: 8,
        type: "not_u",
        question: "How do you approach a development project?",
        answer:
          "I start by understanding your goals, then build a roadmap and wireframes. Once the plan is approved, I move into coding, testing, and deployment. I keep communication open throughout so you can give input at every milestone.",
        altName: "Development_process",
      },
      {
        index: 9,
        type: "not_u",
        question: "What does your bookkeeping process look like?",
        answer:
          "I begin with a consultation to understand your financial structure, then organize data, set up systems, and handle records accurately. You’ll receive regular reports and have full visibility into all bookkeeping stages.",
        altName: "bookkeeping_process",
      },
      {
        index: 10,
        type: "not_u",
        question: "Where can I find you on LinkedIn?",
        answer:
          "You can connect with me and view my experience, skills, and endorsements through my {linked_profile_link}LinkedIn profile{end}. It’s the best place to see my professional background and reach out directly.",
        altName: "LinkedIn",
      },
      {
        index: 11,
        type: "not_u",
        question: "Do you have any public GitHub projects?",
        answer:
          "Yes, my {github_profile_link}GitHub profile{end} features real-world projects, sample code, and active contributions. It’s a great way to explore my technical expertise and coding style.",
        altName: "GitHub",
      },
    ],
  },
  {
    id: "4e567ac2-48d9-447f-a48e-635269db7802",
    name: "Farhan",
    faqs: [
      {
        index: 0,
        type: "u",
        question: "How can I hire you for my project?",
        answer:
          "It’s simple. Once you share your project details, we’ll jump on a quick call to align on your goals, scope, and timeline. I’ll send you a clear proposal with costs and milestones. After approval, I’ll start development and keep you posted with regular updates until completion.",
        altName: "Hiring",
      },
      {
        index: 1,
        type: "u",
        question: "Do you provide a free trial before starting?",
        answer:
          "Yes, I offer a 2-week free trial so you can evaluate my coding skills, speed, and communication style without paying upfront. It’s a risk-free way to see if I’m the right fit for your project.",
        altName: "Trial",
      },
      {
        index: 2,
        type: "u",
        question: "How will I stay updated on progress?",
        answer:
          "I use tools like Trello, Asana, or Monday.com so you can track everything in real time. You’ll also receive weekly summaries and milestone reports. For quick chats, you can reach me anytime through {email_link}email{end} or {whatsapp_link}WhatsApp{end}.",
        altName: "Tracking",
      },
      {
        index: 3,
        type: "u",
        question: "What payment options do you support?",
        answer:
          "You can pay via PayPal, Stripe, Payoneer, or direct bank transfer. During onboarding, we’ll finalize whichever method works best for you.",
        altName: "Payment",
      },
      {
        index: 4,
        type: "u",
        question: "Can I request updates or edits after the project is done?",
        answer:
          "Yes. I provide post-launch support for tweaks, improvements, or ongoing maintenance. You can opt for a dedicated maintenance plan or handle updates as needed.",
        altName: "Revisions",
      },
      {
        index: 5,
        type: "u",
        question: "How do you make sure deadlines are met?",
        answer:
          "I break projects into defined milestones with clear due dates. You’ll always know what’s happening and when. Plus, my 2-week free trial helps you see how efficiently I work before any long-term commitment.",
        altName: "Timeliness",
      },
      {
        index: 6,
        type: "u",
        question: "How do I get started working with you?",
        answer:
          "You can schedule a call through {calendly_link}Calendly link{end}, start a chat on my {website_link}website{end}, or reach out via {email_link}email{end} or {whatsapp_link}WhatsApp{end}. Once you share a bit about your project, I’ll guide you through the next steps.",
        altName: "Starting",
      },
      {
        index: 7,
        type: "u",
        question: "Are you available for hire on Upwork?",
        answer:
          "Yes, you can hire me directly through my {upwork_profile_link}Upwork profile{end}. You’ll find client feedback, ratings, and past work history there. It’s a good option if you prefer using the Upwork platform for contracts and payments.",
        altName: "Upwork",
      },
      {
        index: 8,
        type: "u",
        question: "How do you handle development from start to finish?",
        answer:
          "Every project begins with discovery and planning, followed by wireframes and design mockups. Once approved, I dive into coding, testing, and deployment. You’ll be involved throughout the process with full visibility and checkpoints for feedback.",
        altName: "Development_process",
      },
      {
        index: 9,
        type: "u",
        question: "How do you manage bookkeeping work?",
        answer:
          "I start with an initial consultation to understand your financial goals. From there, I organize data, set up accounting systems, and handle records accurately. You’ll receive consistent reports and full transparency at every step.",
        altName: "bookkeeping_process",
      },
      {
        index: 10,
        type: "u",
        question: "Do you have a LinkedIn profile I can view?",
        answer:
          "Yes, my {linked_profile_link}LinkedIn profile{end} includes my experience, recommendations, and skills. It’s the best place to learn more about my background and connect professionally.",
        altName: "LinkedIn",
      },
      {
        index: 11,
        type: "u",
        question: "Can I check your GitHub projects?",
        answer:
          "Definitely. My {github_profile_link}GitHub profile{end} features code samples, open-source contributions, and live projects — great for reviewing my technical depth and coding practices.",
        altName: "GitHub",
      },
    ],
  },
];

export const matchPlaceHolderList = [
  "profile_pic_url",
  "designation",
  "website_link",
  "client_name",
  "upwork_profile_link",
  "github_profile_link",
  "linked_profile_link",
  "cv_link",
  "cv_download_link",
  "tag_line_one",
  "skills_names",
  "services_names",
  "skills_link",
  "skill_1_pic",
  "skill_1_title_pic",
  "skill_2_pic",
  "skill_2_title_pic",
  "skill_3_pic",
  "skill_3_title_pic",
  "skill_4_pic",
  "skill_4_title_pic",
  "skill_5_pic",
  "skill_5_title_pic",
  "skill_6_pic",
  "skill_6_title_pic",
  "skill_7_pic",
  "skill_7_title_pic",
  "skill_8_pic",
  "skill_8_title_pic",
  "skill_9_pic",
  "skill_9_title_pic",
  "service_1_title",
  "service_1_link",
  "service_1_description",
  "service_2_title",
  "service_2_link",
  "service_2_description",
  "service_3_title",
  "service_3_link",
  "service_3_description",
  "services_links",
  "client_1_video_link",
  "client_1_review",
  "client_1_name",
  "client_1_designation",
  "client_1_company",
  "client_2_video_link",
  "client_2_review",
  "client_2_name",
  "client_2_designation",
  "client_2_company",
  "client_3_video_link",
  "client_3_review",
  "client_3_name",
  "client_3_designation",
  "client_3_company",
  "all_portfolio",
  "portfolio_1_picture",
  "portfolio_1_title",
  "portfolio_1_description",
  "portfolio_1_link",
  "portfolio_1_more_skills_count",
  "portfolio_1_skill_1_pic",
  "portfolio_1_skill_1_title_pic",
  "portfolio_1_skill_2_pic",
  "portfolio_1_skill_2_title_pic",
  "portfolio_1_skill_3_pic",
  "portfolio_1_skill_3_title_pic",
  "portfolio_1_skill_4_pic",
  "portfolio_1_skill_4_title_pic",
  "portfolio_1_skill_5_pic",
  "portfolio_1_skill_5_title_pic",
  "portfolio_1_skill_6_pic",
  "portfolio_1_skill_6_title_pic",
  "portfolio_1_skill_7_pic",
  "portfolio_1_skill_7_title_pic",
  "portfolio_1_skill_8_pic",
  "portfolio_1_skill_8_title_pic",
  "portfolio_1_skill_9_pic",
  "portfolio_1_skill_9_title_pic",
  "portfolio_2_picture",
  "portfolio_2_title",
  "portfolio_2_description",
  "portfolio_2_link",
  "portfolio_2_more_skills_count",
  "portfolio_2_skill_1_pic",
  "portfolio_2_skill_1_title_pic",
  "portfolio_2_skill_2_pic",
  "portfolio_2_skill_2_title_pic",
  "portfolio_2_skill_3_pic",
  "portfolio_2_skill_3_title_pic",
  "portfolio_2_skill_4_pic",
  "portfolio_2_skill_4_title_pic",
  "portfolio_2_skill_5_pic",
  "portfolio_2_skill_5_title_pic",
  "portfolio_2_skill_6_pic",
  "portfolio_2_skill_6_title_pic",
  "portfolio_2_skill_7_pic",
  "portfolio_2_skill_7_title_pic",
  "portfolio_2_skill_8_pic",
  "portfolio_2_skill_8_title_pic",
  "portfolio_2_skill_9_pic",
  "portfolio_2_skill_9_title_pic",
  "portfolio_3_picture",
  "portfolio_3_title",
  "portfolio_3_description",
  "portfolio_3_link",
  "portfolio_3_more_skills_count",
  "portfolio_3_skill_1_pic",
  "portfolio_3_skill_1_title_pic",
  "portfolio_3_skill_2_pic",
  "portfolio_3_skill_2_title_pic",
  "portfolio_3_skill_3_pic",
  "portfolio_3_skill_3_title_pic",
  "portfolio_3_skill_4_pic",
  "portfolio_3_skill_4_title_pic",
  "portfolio_3_skill_5_pic",
  "portfolio_3_skill_5_title_pic",
  "portfolio_3_skill_6_pic",
  "portfolio_3_skill_6_title_pic",
  "portfolio_3_skill_7_pic",
  "portfolio_3_skill_7_title_pic",
  "portfolio_3_skill_8_pic",
  "portfolio_3_skill_8_title_pic",
  "portfolio_3_skill_9_pic",
  "portfolio_3_skill_9_title_pic",
  "all_blogs",
  "blog_1_picture",
  "blog_1_title",
  "blog_1_link",
  "blog_1_descirption",
  "blog_2_picture",
  "blog_2_title",
  "blog_2_link",
  "blog_2_descirption",
  "blog_3_picture",
  "blog_3_title",
  "blog_3_link",
  "blog_3_descirption",
  "email_link",
  "whatsapp_link",
  "calendly_link",
  "instagram_link",
  "linkedIn_link",
]

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
