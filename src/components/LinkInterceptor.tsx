// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const LinkInterceptor = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const handler = (e) => {
//       const anchor = e.target.closest("a");

//       // If it's not an <a> or doesn't belong to this domain, skip
//       if (
//         !anchor ||
//         !anchor.href ||
//         anchor.target === "_blank" ||
//         anchor.download ||
//         anchor.origin !== window.location.origin
//       ) {
//         return;
//       }

//       const uniqueID = localStorage.getItem("uniqueID");
//       if (!uniqueID) return;

//       // Prevent default navigation
//       e.preventDefault();

//       const originalHref = anchor.getAttribute("href");

//       // Avoid modifying already modified links or absolute URLs
//       if (originalHref.startsWith(`/${uniqueID}`)) {
//         router.push(originalHref);
//       } else {
//         const newHref = `/${uniqueID}${
//           originalHref.startsWith("/") ? "" : "/"
//         }${originalHref}`;
//         router.push(newHref);
//       }
//     };

//     document.addEventListener("click", handler);

//     return () => {
//       document.removeEventListener("click", handler);
//     };
//   }, [router]);

//   return null; // this component only sets up the global listener
// };

// export default LinkInterceptor;

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LinkInterceptor = () => {
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
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

      const url = new URL(anchor.href);
      const path = url.pathname;
      const searchParams = new URLSearchParams(url.search);

      const uniqueID = localStorage.getItem("uniqueID");
      const isU = localStorage.getItem("u") === "true";
      const isA = localStorage.getItem("a") === "true";

      if (!uniqueID) return;

      e.preventDefault();

      // Build new path: /uniqueID + original path
      let newPath = `/${uniqueID}`;

      // If the original path isn’t just "/", add it
      if (path && path !== "/") {
        newPath += path;
      }

      // Add u or a flags if necessary
      if (isU && !searchParams.has("u")) {
        searchParams.append("u", "true");
      }
      if (isA && !searchParams.has("a")) {
        searchParams.append("a", "true");
      }

      const finalURL = `${newPath}${
        searchParams.toString() ? "?" + searchParams.toString() : ""
      }`;

      router.push(finalURL);
    };

    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [router]);

  return null;
};

export default LinkInterceptor;
