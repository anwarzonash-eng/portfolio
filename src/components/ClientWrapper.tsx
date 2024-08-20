"use client"; // This makes the component a Client Component

import { usePathname } from "next/navigation";
import OfferBanner from "@/components/OfferBanner";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route
  const isHomepage = pathname === "/"; // Check if it's the homepage

  return (
    <>
      {isHomepage && <OfferBanner />}
      {children}
    </>
  );
}
