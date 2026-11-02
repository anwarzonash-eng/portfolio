import type { ProfileReport } from "@/types/api";

export interface HeaderLink {
  title: string;
  src: string;
  isDropdown?: boolean;
}

/** Nav links shown in both the desktop bar and the mobile sidebar. */
export const buildHeaderLinks = (
  listOfdata: ProfileReport | null
): HeaderLink[] => [
  { title: "Home", src: "/" },
  ...(process.env.IS_SERVICES_ALLOWED === "true" &&
  listOfdata?.services &&
  listOfdata?.services?.length > 0
    ? [{ title: "Cover Letter", src: "/offer" }]
    : []),

  { title: "what i can do", src: "/services", },
  { title: "Portfolios ", src: "/portfolio" },
  { title: "Blogs", src: "/blog-listing" },
  { title: "CV", src: "/cv" },
];

/** Image + blurb per service title for the services mega-dropdown. */
export const serviceContentMap: Record<
  string,
  { image: string; description: string }
> = {
  "Database Development": {
    image: "/images/my_services/db.jpg",
    description:
      "Design and manage scalable, secure databases to support your applications and business logic.",
  },
  "Shopify Development": {
    image: "/images/my_services/shopify.png",
    description:
      "Build and customize high-performing Shopify stores to grow your eCommerce business effectively.",
  },
  "Product Development": {
    image: "/images/my_services/product.png",
    description:
      "Transform ideas into fully functional digital products with end-to-end design and development support.",
  },
  "Back-End Web Development": {
    image: "/images/my_services/backend.png",
    description:
      "Create robust server-side logic, APIs, and integrations to power modern, scalable web applications.",
  },
  "Full-Stack Developer": {
    image: "/images/my_services/Full Stack Programmer.png",
    description:
      "Deliver complete solutions from front-end interfaces to back-end systems with end-to-end development expertise.",
  },
  "Front-End Web Development": {
    image: "/images/my_services/Front-End Web Development.png",
    description:
      "Craft responsive, user-friendly interfaces with modern technologies that enhance user experience.",
  },
  "Wordpress Development": {
    image: "/images/my_services/wordpress.webp",
    description:
      "Develop dynamic WordPress websites with custom themes, plugins, and SEO optimization for better performance.",
  },
  " Shopify Theme Customaization": {
    image: "/images/my_services/Shopify Theme Development.png",
    description:
      "Tailor your Shopify store’s look and feel with custom themes designed to match your brand and boost engagement.",
  },
  "Shopify Theme Development": {
    image: "/images/my_services/Shopify Theme.png",
    description:
      "Build responsive, high-converting Shopify themes from scratch to deliver a seamless shopping experience.",
  },
  "Shopify App  Development": {
    image: "/images/my_services/Shopify App  Development.png",
    description:
      "Create powerful custom Shopify apps to enhance functionality, automate processes, and improve user experience.",
  },

  "Web Performance Optimization": {
    image: "/images/my_services/Web Performance Optimization.png",
    description:
      "Enhance website speed, loading times, and overall user experience through advanced performance tuning techniques.",
  },

  "Next.js Expert": {
    image: "/images/my_services/nextjs.svg",
    description:
      "Build high-performance, SEO-friendly, and scalable web apps using the powerful Next.js framework.",
  },

  "API Development and Integration": {
    image: "/images/my_services/api.png",
    description:
      "Design robust APIs and seamlessly integrate third-party services to enable smooth data communication across platforms.",
  },

  "AWS Web Services Development": {
    image: "/images/my_services/aws.png",
    description:
      "Leverage AWS cloud solutions for building secure, scalable, and highly available web applications and infrastructures.",
  },

  "DevOps Developer": {
    image: "/images/my_services/devops.png",
    description:
      "Streamline development and deployment pipelines using CI/CD, containerization, and cloud automation practices.",
  },
};

/** Fallback card for services missing from serviceContentMap. */
export const defaultServiceContent = {
  image: "/images/my_services/Full Stack Programmer.png",
  description:
    "Deliver complete solutions from front-end interfaces to back-end systems with end-to-end development expertise.",
};
