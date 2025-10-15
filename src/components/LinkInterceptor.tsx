"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LinkInterceptor = () => {
  const router = useRouter();

  useEffect(() => {
    const rewriteAllHrefs = () => {
      const currentUrl = new URL(window.location.href);
      const searchParams = currentUrl.searchParams;

      // ✅ Determine Admin Mode from URL only
      const isAdmin = searchParams.get("a") === "_";

      let uniqueID: string | null = null;
      let isU = false;
      let domainParam: string | null = null; // Initialize domain param

      if (isAdmin) {
        // ---------------- ADMIN MODE ----------------
        // uniqueID from path, 'a' if not present
        uniqueID = currentUrl.pathname.split("/")[1] || "a";
        // u from URL
        isU = searchParams.get("u") === "_";
        // Get 'd' from URL to persist
        domainParam = searchParams.get("d");
      } else {
        // ---------------- NON-ADMIN MODE ----------------
        // uniqueID from localStorage
        uniqueID = localStorage.getItem("uniqueID") || "a";
        // u from localStorage
        isU = localStorage.getItem("u") === "_";
      }

      if (!uniqueID) return;

      const anchors = document.querySelectorAll("a[href^='/']");
      anchors.forEach((anchor) => {
        const originalHref =
          anchor.getAttribute("data-original-href") ||
          anchor.getAttribute("href");
        if (!originalHref) return;

        const url = new URL(originalHref, window.location.origin);
        const sp = url.searchParams;

        // add flags if needed
        if (isU && !sp.has("u")) {
          sp.append("u", "_");
        }
        if (isAdmin && !sp.has("a")) {
          sp.append("a", "_");
        }

        // 🛑 FIXED LOGIC: Persist 'd' parameter in Admin Mode
        if (isAdmin && domainParam && !sp.has("d")) {
          sp.append("d", domainParam);
        }
        // 🛑 END FIXED LOGIC

        // ✅ build href with uniqueID
        let newPath = `/${uniqueID}${url.pathname}`;
        const finalHref = `${newPath}${
          sp.toString() ? "?" + sp.toString() : ""
        }`;

        anchor.setAttribute("href", finalHref);
        anchor.setAttribute("data-original-href", originalHref);
      });
    };

    // Initial rewrite
    rewriteAllHrefs();

    // Observe DOM changes for new links
    const observer = new MutationObserver(() => {
      rewriteAllHrefs();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Intercept clicks
    const clickHandler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");

      if (
        !anchor ||
        !(anchor instanceof HTMLAnchorElement) ||
        !anchor.href ||
        anchor.target === "_blank" ||
        anchor.download ||
        anchor.origin !== window.location.origin
      ) {
        return;
      }

      e.preventDefault();
      const url = new URL(anchor.href);
      // Use router.push with pathname and search to preserve flags
      router.push(url.pathname + url.search);
    };

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
      observer.disconnect();
    };
  }, [router]);

  return null;
};

export default LinkInterceptor;
