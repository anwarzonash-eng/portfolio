import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      base: "10px", // 1rem = 10px
    },
    fontFamily: {
      sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"], // Setting Helvetica Neue as default
      Inter: ["Inter", "sans-serif"]
    },
    extend: {
      screens: {
        'ultraSmall': '480px', // Custom breakpoint named "ultraSmall" at 480px
        'ultra2x': '420px', // Custom breakpoint named "ultraSmall" at 480px
      },
      boxShadow: {
        skillShadow: "0 4px 4px 0 rgba(0,0,0,0.08)",
        testimonialeShadow: '0px 16px 48px 0px rgba(18, 19, 20, 0.04)',

      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease forwards",
        bounce: "bounce 1s infinite",
      },
      // Current & Main Color Schemes
      colors: {
        primary: "#00473C",
        pageBG: "#F8F9FA",
        bannerBG: "#A3DDD3",
        sectionBG: "#00362E",
        heading: "#262626",
        paragraph1: "#3E3E3E",
        paragraph2: "#F8F9FA",
        border: "#DDDDDD",
      },
      // Haris Color Schemes
      // colors: {
      //   primary: "#9C3800",
      //   pageBG: "#FFF2EA",
      //   bannerBG: "#F9DFD0",
      //   sectionBG: "#83350A",
      //   heading: "#262626",
      //   paragraph1: "#3E3E3E",
      //   paragraph2: "#FFF2EA",
      //   border: "#DAC2B4",
      // },
      // Noyan Color Schemes
      // colors: {
      //   primary: "#472B6B",
      //   pageBG: "#EFE2FF",
      //   bannerBG: "#DFCCF7",
      //   sectionBG: "#34155B",
      //   heading: "#262626",
      //   paragraph1: "#3E3E3E",
      //   paragraph2: "#EFE2FF",
      //   border: "#C4B1DB",
      // },
      borderColor: {
        custom: "rgba(255, 255, 255, 0.24)",
      },
     


  backgroundImage: {
    // Home Page images
    heroBG: "url(/images/heroBG.svg)",
    heroBottomVector: "url(/images/heroBottomVector.svg)",
    cvSideBg: "url(/images/cvSideBG.svg)",
    aboutBG: "url(/images/NewDevPics/About_1920x1920.jpg)",
    aboutBgMobile: "url(/images/NewDevPics/About_1920x1920.jpg)",
    testmonialBG: "url(/images/testmonialBG.png)",
    faqDesktop: "url(/images/faqSideBG.svg)",
    faqMobile: "url(/images/faqMobile.png)",
    footer1: "url(/images/Footer1.png)",
    thumbnail: "url(/images/thumbnail.png)",
    footerBg: "url(/images/footerBg.svg)",
    footerDesktop: "url(/images/footerDektopBG.png)",
    footerMobile: "url(/images/footerMobileBG.png)",
    heroVectorBg: "URL(/images/hero-vector.svg)",
    Circle: "URL(/images/circle-shape.svg)",
    bottomBG: "URL(/images/heroBannerBottom.svg)",
    // Blog Listing Page Images
    blogHeroBg: "URL(/images/blogHeroBg.svg)",
    Newslatter: "URL(/images/Newslatter.svg)",
    // Blog Detail Page Images
    blogDetailBg: "URL(/images/blogDetailBg.svg)",
    // Cover Letter Page 
    cvBoxDesktop:"URL(/images/cvBoxDesktop.svg)",
    cvBoxMobile:"URL(/images/cvBoxMobile.svg)",
    // Gradients
    "radial-gradient":
      "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%)",
    "button-gradient":
      "radial-gradient(100% 100% at 50% 0%, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.00) 100%), var(--Primary, #00473C)",
    "gradient-conic":
      "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    trialPopUpGradient: "linear-gradient(90deg, #00473C 0%, #0EC2A6 100%)",
  },

    },
  },
  plugins: [],
};
export default config;