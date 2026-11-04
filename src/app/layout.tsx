import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ChildWrapperContainer from "@/components/ChildWrapperContainer";
import LinkInterceptor from "@/components/LinkInterceptor";
import { GoogleAnalytics } from "@next/third-parties/google";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Website, CV, Portfolios, Cover Letter, Contact Details",
  description:
    "Welcome to my personal website! Explore my professional journey through my introductory statement, cover letter, comprehensive CV, and detailed portfolios. Connect with me through my contact details and delve into my educational background. Discover the essence of who I am and what I bring to the table.",
  keywords: [
    "Personal Website",
    "CV",
    "Portfolio",
    "Resume",
    "Cover Letter",
    "Contact",
    "Web Developer",
    "Professional Journey",
  ],
  /**
   * No `openGraph` / `twitter` block here on purpose.
   *
   * The hard-coded `authors` entry was removed for the same reason: it
   * named "Your Name" at yourwebsite.com on every tenant's site, which
   * also contradicted the real Person in the JSON-LD graph.
   *
   * This file previously carried a hard-coded card pointing at
   * yourwebsite.com/og-image.jpg — a placeholder image on a domain nobody
   * owns, sent identically for every tenant. Share cards are now built per
   * page from the tenant's own API content in src/utils/seo/pageSeo.ts, and
   * a profile with no photo gets a card with no image rather than a stand-in.
   */
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

/**
 * Runs before first paint so a returning dark-mode visitor never sees a light
 * flash. Mirrors the rules in src/hooks/useTheme.ts:
 *  - `?theme=light|dark` overrides for this load only (used for testing and PDF rendering)
 *  - otherwise the persisted `theme` preference; first-time visitors get light
 *  - print and CV routes are always light
 */
const themeBootScript = `
(function () {
  try {
    var path = location.pathname;
    var lightOnly = ["/print/", "/cv"].some(function (f) { return path.indexOf(f) !== -1; });
    var param = new URLSearchParams(location.search).get("theme");
    var stored = localStorage.getItem("theme");
    var theme = "light";
    if (!lightOnly) {
      if (param === "dark" || param === "light") theme = param;
      else if (stored === "dark") theme = "dark";
    }
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Inline on purpose: must run synchronously before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className={inter.className}>
        <GlobalErrorBoundary>
          <LinkInterceptor />
          <ChildWrapperContainer>{children}</ChildWrapperContainer>
          <GoogleAnalytics gaId="G-DPWJX7YHZH" />
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
