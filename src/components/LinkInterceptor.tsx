// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const LinkInterceptor = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const handler = (e) => {
//       const anchor = e.target.closest("a");

//       if (
//         !anchor ||
//         !anchor.href ||
//         anchor.target === "_blank" ||
//         anchor.download ||
//         anchor.origin !== window.location.origin
//       ) {
//         return;
//       }

//       const url = new URL(anchor.href);
//       const path = url.pathname;
//       const searchParams = new URLSearchParams(url.search);

//       const uniqueID = localStorage.getItem("uniqueID");
//       const isU = localStorage.getItem("u") === "true";
//       const isA = localStorage.getItem("a") === "true";

//       console.log(uniqueID);

//       if (!uniqueID) return;

//       e.preventDefault();

//       // Build new path: /uniqueID + original path
//       let newPath = `/${uniqueID}`;

//       // If the original path isn’t just "/", add it
//       if (path && path !== "/") {
//         newPath += path;
//       }

//       // Add u or a flags if necessary
//       if (isU && !searchParams.has("u")) {
//         searchParams.append("u", "true");
//       }
//       if (isA && !searchParams.has("a")) {
//         searchParams.append("a", "true");
//       }

//       const finalURL = `${newPath}${
//         searchParams.toString() ? "?" + searchParams.toString() : ""
//       }`;

//       router.push(finalURL);
//     };

//     document.addEventListener("click", handler);
//     return () => {
//       document.removeEventListener("click", handler);
//     };
//   }, [router]);

//   return null;
// };

// export default LinkInterceptor;

// 2nd
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LinkInterceptor = () => {
  const router = useRouter();

  useEffect(() => {
    const uniqueID = localStorage.getItem("uniqueID");
    const isU = localStorage.getItem("u") === "true";
    const isA = localStorage.getItem("a") === "true";

    if (!uniqueID) return;

    // 1️⃣ Rewrite all anchor hrefs
    const rewriteAllHrefs = () => {
      const anchors = document.querySelectorAll("a[href^='/']");
      anchors.forEach((anchor) => {
        const originalHref =
          anchor.getAttribute("data-original-href") ||
          anchor.getAttribute("href");
        if (!originalHref) return;

        const url = new URL(originalHref, window.location.origin);
        const searchParams = url.searchParams;

        if (isU && !searchParams.has("u")) {
          searchParams.append("u", "true");
        }
        if (isA && !searchParams.has("a")) {
          searchParams.append("a", "true");
        }

        let newPath = `/${uniqueID}${url.pathname}`;
        const finalHref = `${newPath}${
          searchParams.toString() ? "?" + searchParams.toString() : ""
        }`;

        anchor.setAttribute("href", finalHref);
        anchor.setAttribute("data-original-href", originalHref); // for future updates
      });
    };

    // Initial rewrite
    rewriteAllHrefs();

    // Re-run if new links added
    const observer = new MutationObserver(() => {
      rewriteAllHrefs();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 2️⃣ Intercept clicks
    const clickHandler = (e: any) => {
      const anchor = e.target.closest("a");

      if (
        !anchor ||
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
