"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store";

const LinkInterceptor = () => {
  const router = useRouter();
  
  // Add try-catch to handle Redux context not being available yet
  let urlInfo = null;
  try {
    urlInfo = useAppSelector(
      (state) => state.profile.profileUrlInfo
    );
  } catch (error) {
    console.log("Redux store not available yet in LinkInterceptor");
    // Fallback to manual URL parsing when Redux isn't available
    urlInfo = null;
  }

  useEffect(() => {
    const rewriteAllHrefs = () => {
      const currentUrl = new URL(window.location.href);
      const searchParams = currentUrl.searchParams;

      let uniqueID: string | null = null;
      let isU = false;
      let isAdmin = false;
      let domainParam: string | null = null;

      if (urlInfo?.uniqueID) {
        // Use URLInfo from Redux store when available
        uniqueID = urlInfo.uniqueID;
        isU = urlInfo.u === "_";
        isAdmin = urlInfo.a === "_";
        domainParam = urlInfo.d;
        console.log("LinkInterceptor URLInfo from Redux:", { uniqueID, isU, isAdmin, domainParam });
      } else {
        // Fallback to manual URL parsing when Redux isn't available yet
        isAdmin = searchParams.get("a") === "_";
        
        if (isAdmin) {
          uniqueID = currentUrl.pathname.split("/")[1] || "a";
          isU = searchParams.get("u") === "_";
          domainParam = searchParams.get("d");
        } else {
          uniqueID = localStorage.getItem("uniqueID") || "a";
          isU = localStorage.getItem("u") === "_";
        }
        console.log("LinkInterceptor using fallback URL parsing:", { uniqueID, isU, isAdmin, domainParam });
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

        // Persist 'd' parameter in Admin Mode
        if (isAdmin && domainParam && !sp.has("d")) {
          sp.append("d", domainParam);
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
      // Use router.push with pathname and search to preserve flags
      router.push(url.pathname + url.search);
    };

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
      observer.disconnect();
    };
  }, [router, urlInfo]); // Add urlInfo as dependency

  return null;
};

export default LinkInterceptor;
