import type { Config } from "tailwindcss";

const config: Config = {
  // Dark mode is driven by the `data-theme` attribute set on <html> (see src/hooks/useTheme.ts)
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
    "grid-cols-8",
    "grid-cols-9",
    "grid-cols-10",
  ],
  theme: {
    fontSize: {
      base: "10px", // 1rem = 10px
    },
    fontFamily: {
      sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"], // Setting Helvetica Neue as default
      Inter: ["Inter", "sans-serif"],
      Rubik: ["Rubik", "sans-serif"],
    },
    extend: {
      screens: {
        ultraSmall: "480px", // Custom breakpoint named "ultraSmall" at 480px
        ultra2x: "420px", // Custom breakpoint named "ultraSmall" at 480px
      },
      boxShadow: {
        skillShadow: "0 4px 4px 0 rgba(0,0,0,0.08)",
        testimonialeShadow: "0px 16px 48px 0px rgba(18, 19, 20, 0.04)",
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
        primary: "var(--primary-color)",
        pageBG: "var(--page_bg_color)",
        bannerBG: "var(--banner_bg_color)",
        sectionBG: "var(--section_bg_color)",
        heading: "var(--heading_color)",
        paragraph1: "var(--paragrapgh1_color)",
        paragraph2: "var(--paragrapgh2_color)",
        border: "var(--border_color)",
        // Semantic tokens (light values fixed to today's look, dark values derived per tenant)
        surface: "var(--surface_color)",
        surfaceMuted: "var(--surface_muted_color)",
        onPrimary: "var(--on_primary_color)",
        textMuted: "var(--text_muted_color)",
      },
      borderColor: {
        custom: "rgba(255, 255, 255, 0.24)",
      },

      backgroundImage: {
        // Only keys that are actually applied as a `bg-*` class belong here.
        // Tailwind emits a rule for a key only when the class is used, so an
        // unused key is invisible at runtime and quietly keeps its file alive
        // in /public. Sixteen such keys were removed; four of those pointed at
        // files that never existed (Footer1.png, hero-vector.svg,
        // heroBannerBottom.svg), which would have 404'd if ever used.
        cvSideBg: "url(/images/cvSideBG.svg)",
        footerDesktop: "url(/images/footerDektopBG.png)",
        footerMobile: "url(/images/footerMobileBG.png)",
        // Blog Listing Page Images
        Newslatter: "URL(/images/Newslatter.svg)",
        // Cover Letter Page
        cvBoxDesktop: "URL(/images/cvBoxDesktop.svg)",
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
  variants: {
    extend: {
      display: ["print"],
      margin: ["print"],
      padding: ["print"],
      textColor: ["print"],
      backgroundColor: ["print"],
    },
  },
  plugins: [],
};
export default config;
