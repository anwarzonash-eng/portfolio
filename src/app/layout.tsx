import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ChildWrapperContainer from "@/components/ChildWrapperContainer";
import LinkInterceptor from "@/components/LinkInterceptor";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Personal Website – CV & Portfolio",
    description:
      "Explore my professional journey through CVs, portfolios, and more. Connect with me and discover what I bring to the table.",
    url: "https://yourwebsite.com",
    siteName: "Your Name",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Website – CV & Portfolio",
    description:
      "Explore my professional journey through CVs, portfolios, and more. Connect with me and discover what I bring to the table.",
    images: ["https://yourwebsite.com/og-image.jpg"],
    creator: "@yourtwitterhandle",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <LinkInterceptor />
          <ChildWrapperContainer>{children}</ChildWrapperContainer>
          <GoogleAnalytics gaId="G-DPWJX7YHZH" />
        </div>
      </body>
    </html>
  );
}
