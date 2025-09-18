"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LinkInterceptor = () => {
  const router = useRouter();

  useEffect(() => {
    const rewriteAllHrefs = () => {
      const currentUrl = new URL(window.location.href);
      const searchParams = currentUrl.searchParams;

      // ✅ detect admin from URL only
      const isAdmin = searchParams.get("a") === "_";

      let uniqueID: string | null = null;
      let isU = false;

      if (isAdmin) {
        // ---------------- ADMIN MODE ----------------
        uniqueID = currentUrl.pathname.split("/")[1] || "a";
        isU = searchParams.get("u") === "_";
      } else {
        // ---------------- NON-ADMIN MODE ----------------
        uniqueID = localStorage.getItem("uniqueID") || "a";
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
