import { getTargetURLFromTinyURL } from "@/apiHandlers/tinyURLApi";


async function tinyURLNavigation(routesInfo: RoutesInfo) {
  try {
    const payload = {
      uniqueId: decodeURIComponent(routesInfo.uniqueID),
    };
    console.log("TinyURL Navigation Payload:", payload);

    const results = await getTargetURLFromTinyURL(payload);
    console.log("TinyURL Navigation Results:", results);

    if (results?.data?.status === "Error") {
      window.location.href = "https://www.cypexsoft.com";
    } else {
      const responseData = results?.data?.data;
      const resolvedData = Array.isArray(responseData)
        ? responseData[0]
        : responseData;

      const targetLink = resolvedData?.target_link;

      if (targetLink) {
        window.location.href = targetLink;
      }
    }
  } catch (error) {
    window.location.href = "https://www.cypexsoft.com";
  }
}



// Type definitions
interface RoutesInfo {
  uniqueID: string;
  u: string | false; // "_" ya false
  a: string | false; // "_" ya false
  domain: string;
}


export const getRoutesDetails = async (
  dynamicRoutes: { unique_id?: string } | null,
  routeParams: URLSearchParams | null
): Promise<RoutesInfo> => {

  const resolvedDynamicRoutes = dynamicRoutes ? await dynamicRoutes : null;
  const isAdmin = routeParams?.get("a") === "_";

  const routesInfo: RoutesInfo = {
    uniqueID: "",
    u: false,
    a: isAdmin ? "_" : false,
    domain: "",
  };



  if (isAdmin) {

    const routeIsU = routeParams?.get("u");
    if (routeIsU === "_") {
      routesInfo.u = "_";
    }

    if (resolvedDynamicRoutes?.unique_id) {
      routesInfo.uniqueID = resolvedDynamicRoutes.unique_id;
    } else {
      routesInfo.uniqueID = "a";
    }

    if (routeParams?.get("d")) {

      routesInfo.domain = routeParams.get("d") as string;
    } else {
      routesInfo.domain = getCleanDomain();

    }
    if (routesInfo.domain === "gourls.link") {

      await tinyURLNavigation(routesInfo);

    }
    return routesInfo;
  }

  let isShortURL = false;
  let isPrintURL = checkPrintURL();

  if (routeParams?.get("d")) {
    routesInfo.domain = routeParams.get("d") as string;
    if (routesInfo.domain === "gourls.link") {
      isShortURL = true;
    }

  }
  else {
    routesInfo.domain = getCleanDomain();
    if (routesInfo.domain === "gourls.link") {
      isShortURL = true;
    }
  }

  const routeIsU = routeParams?.get("u");
  if (routeIsU && routeIsU === "_") {
    routesInfo.u = "_";
    localStorage.setItem("u", "_");
  } else if (localStorage.getItem("u") === "_") {
    routesInfo.u = "_";
  }

  console.log({ isPrint: { isPrintURL, uniqueid: resolvedDynamicRoutes.unique_id } })

  if (isShortURL) {
    routesInfo.uniqueID = resolvedDynamicRoutes.unique_id;
  }
  else if (isPrintURL && resolvedDynamicRoutes?.unique_id) {
    routesInfo.uniqueID = resolvedDynamicRoutes.unique_id;

  }

  else {
    const storedUniqueID = localStorage.getItem("uniqueID");

    if (!storedUniqueID) {

      if (resolvedDynamicRoutes?.unique_id) {

        routesInfo.uniqueID = resolvedDynamicRoutes.unique_id;
        localStorage.setItem("uniqueID", routesInfo.uniqueID);
      } else {

        routesInfo.uniqueID = "a";
        localStorage.setItem("uniqueID", "a");
      }
    } else {

      routesInfo.uniqueID = storedUniqueID;
    }
  }


  if (isShortURL) {
    await tinyURLNavigation(routesInfo);
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
const checkPrintURL = (): boolean => {
  const url = new URL(window.location.href);
  let isPrintExist = false
  if (url.pathname.includes('print'))
    isPrintExist = true

  console.log({ print: { url: url.pathname, isPrintExist } })


  return isPrintExist;
}

