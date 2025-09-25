// import { getTargetURLFromTinyURL } from "@/apiHandlers/tinyURLApi";

// // Type definitions
// interface RoutesInfo {
//   uniqueID: string;
//   u: string | false; // "_" ya false
//   a: string | false; // "_" ya false
//   domain: string;
// }

// export const getRoutesDetails = (
//   dynamicRoutes: { unique_id?: string } | null,
//   routeParams: URLSearchParams | null
// ): RoutesInfo => {
//   const routesInfo: RoutesInfo = {
//     uniqueID: "",
//     u: false,
//     a: false,
//     domain: getDomainName(routeParams),
//   };

//   // Unique ID handling
//   if (dynamicRoutes?.unique_id) {
//     routesInfo.uniqueID = dynamicRoutes.unique_id;
//   } else {
//     routesInfo.uniqueID = "a";
//   }

//   // "u" flag handling
//   const routeIsU = routeParams?.get("u");
//   if (routeIsU) {
//     routesInfo.u = "_";
//   } else {
//     const storedIsU = localStorage.getItem("u");
//     if (storedIsU === "_") {
//       routesInfo.u = "_";
//     }
//   }

//   // "a" flag handling
//   const routeIsA = routeParams?.get("a");
//   if (routeIsA) {
//     routesInfo.a = "_";
//   } else {
//     const storedIsA = localStorage.getItem("a");
//     if (storedIsA === "_") {
//       routesInfo.a = "_";
//     }
//   }

//   // Domain based handling
//   if (routesInfo.domain === "gourls.link") {
//     tinyURLNavigation(routesInfo);
//   } else {
//     adjustWithLocalStorage(routesInfo, routeParams);
//   }

//   return routesInfo;
// };

// // Handle tiny URL redirection
// async function tinyURLNavigation(routesInfo: RoutesInfo) {
//   try {
//     const payload = {
//       uniqueId: decodeURIComponent(routesInfo.uniqueID),
//     };

//     const results = await getTargetURLFromTinyURL(payload);

//     if (results?.data?.status === "Error") {
//       window.location.href = "https://www.cypexsoft.com";
//     } else if (results?.data?.data?.target_link) {
//       window.location.href = "https://" + results.data.data.target_link;
//     }
//   } catch (error) {
//     window.location.href = "https://www.cypexsoft.com";
//   }
// }

// // LocalStorage handler (with expiry)
// function adjustWithLocalStorage(
//   routesInfo: RoutesInfo,
//   routeParams: URLSearchParams | null
// ) {
//   const urlUniqueId = routesInfo.uniqueID;

//   // ✅ Immediately overwrite
//   localStorage.setItem("uniqueID", urlUniqueId);
//   localStorage.setItem("uniqueID_timestamp", Date.now().toString());

//   localStorage.setItem("u", routesInfo.u ? "_" : "");
//   localStorage.setItem("a", routesInfo.a ? "_" : "");
//   localStorage.setItem("domain", routesInfo.domain);

//   // Expiry check
//   const storedUniqueID = localStorage.getItem("uniqueID");
//   const uniqueIDTimestamp = localStorage.getItem("uniqueID_timestamp");

//   if (storedUniqueID && uniqueIDTimestamp) {
//     const now = Date.now();
//     const fifteenDaysInMs = 15 * 24 * 60 * 60 * 1000;

//     if (now - parseInt(uniqueIDTimestamp) > fifteenDaysInMs) {
//       // Expired, remove it
//       localStorage.removeItem("uniqueID");
//       localStorage.removeItem("uniqueID_timestamp");
//     } else {
//       // Still valid, use it
//       if (!routeParams?.get("a")) {
//         routesInfo.uniqueID = storedUniqueID;
//       }
//     }
//   }

//   // ✅ Always re-save after validation
//   localStorage.setItem("uniqueID", routesInfo.uniqueID);
//   localStorage.setItem("uniqueID_timestamp", Date.now().toString());
//   localStorage.setItem("u", routesInfo.u ? "_" : "");
//   localStorage.setItem("a", routesInfo.a ? "_" : "");
//   localStorage.setItem("domain", routesInfo.domain);
// }

// // Get domain name
// const getDomainName = (routeParams: URLSearchParams | null): string => {
//   let domain = "";

//   if (routeParams?.get("d") && localStorage.getItem("a") === "_") {
//     domain = routeParams.get("d") as string;
//   } else if (
//     localStorage.getItem("a") === "_" &&
//     localStorage.getItem("domain")
//   ) {
//     domain = localStorage.getItem("domain") as string;
//   } else {
//     const url = new URL(window.location.href);
//     domain = url.host;
//   }

//   // Remove 'www.' or 'dev.' if present
//   if (domain.startsWith("www.")) {
//     domain = domain.substring(4);
//   }
//   if (domain.startsWith("dev.")) {
//     domain = domain.substring(4);
//   }

//   return domain;
// };

import { getTargetURLFromTinyURL } from "@/apiHandlers/tinyURLApi";

// Type definitions
interface RoutesInfo {
  uniqueID: string;
  u: string | false; // "_" ya false
  a: string | false; // "_" ya false
  domain: string;
}

export const getRoutesDetails = (
  dynamicRoutes: { unique_id?: string } | null,
  routeParams: URLSearchParams | null
): RoutesInfo => {
  const isAdmin = routeParams?.get("a") === "_";

  const routesInfo: RoutesInfo = {
    uniqueID: "",
    u: false,
    a: isAdmin ? "_" : false,
    domain: "",
  };

  if (isAdmin) {
    // ---------------- ADMIN MODE ----------------
    // u handling
    const routeIsU = routeParams?.get("u");
    if (routeIsU === "_") {
      routesInfo.u = "_"; // ✅ set true, not null
    }

    console.log(dynamicRoutes);

    // uniqueID handling
    if (dynamicRoutes?.unique_id) {
      routesInfo.uniqueID = dynamicRoutes.unique_id;
    } else {
      routesInfo.uniqueID = "a"; // default
    }

    // domain always from URL param "d"
    routesInfo.domain = routeParams?.get("d") || getCleanDomain();

    return routesInfo;
  }

  // ---------------- NON-ADMIN MODE ----------------
  // "u" handling
  const routeIsU = routeParams?.get("u");
  if (routeIsU === "_") {
    routesInfo.u = "_";
    localStorage.setItem("u", "_");
  } else if (localStorage.getItem("u") === "_") {
    routesInfo.u = "_";
  }

  // uniqueID handling
  // if (dynamicRoutes?.unique_id) {
  //   // store permanently
  //   routesInfo.uniqueID = dynamicRoutes.unique_id;
  //   localStorage.setItem("uniqueID", routesInfo.uniqueID);
  // } else {
  //   const storedUniqueID = localStorage.getItem("uniqueID");
  //   if (storedUniqueID) {
  //     routesInfo.uniqueID = storedUniqueID;
  //   } else {
  //     routesInfo.uniqueID = "a"; // default
  //     localStorage.setItem("uniqueID", "a");
  //   }
  // }

  // Correct Version
  // uniqueID handling
  const storedUniqueID = localStorage.getItem("uniqueID");

  if (!storedUniqueID) {
    // Nothing stored yet
    if (dynamicRoutes?.unique_id) {
      // First time uniqueID is provided -> save permanently
      routesInfo.uniqueID = dynamicRoutes.unique_id;
      localStorage.setItem("uniqueID", routesInfo.uniqueID);
    } else {
      // Default fallback
      routesInfo.uniqueID = "a";
      localStorage.setItem("uniqueID", "a");
    }
  } else {
    // Already stored -> ignore URL and always use stored
    routesInfo.uniqueID = storedUniqueID;
  }

  // domain handling
  if (routeParams?.get("d")) {
    routesInfo.domain = routeParams.get("d") as string;
    localStorage.setItem("domain", routesInfo.domain);
  } else if (localStorage.getItem("domain")) {
    routesInfo.domain = localStorage.getItem("domain") as string;
  } else {
    routesInfo.domain = getCleanDomain();
    localStorage.setItem("domain", routesInfo.domain);
  }

  return routesInfo;
};

// ---------------- Helpers ----------------
const getCleanDomain = (): string => {
  const url = new URL(window.location.href);
  let domain = url.host;

  if (domain.startsWith("www.")) {
    domain = domain.substring(4);
  }
  if (domain.startsWith("dev.")) {
    domain = domain.substring(4);
  }
  return domain;
};
