import { getTargetURLFromTinyURL } from "@/apiHandlers/tinyURLApi";
import { NextRouter } from "next/router";

export const getRoutesDetails = (dynamicRoutes, routeParams) => {
  const routesInfo = {
    uniqueID: "",
    u: false, // u means is_u
    a: false, // a means admin
    domain: getDomainName(routeParams),
  };

  if (dynamicRoutes && dynamicRoutes.unique_id)
    routesInfo.uniqueID = dynamicRoutes.unique_id;
  else routesInfo.uniqueID = "a";

  const routeIsU = routeParams && routeParams.get("u");
  if (routeIsU) {
    routesInfo.u = true;
  } else {
    const storedIsU = localStorage.getItem("u");
    if (storedIsU === "true") {
      routesInfo.u = true;
    }
  }

  const routeIsA = routeParams && routeParams.get("a");
  if (routeIsA) {
    routesInfo.a = true;
    // routesInfo.u = false;
  } else {
    const storedIsA = localStorage.getItem("a");
    if (storedIsA === "true") {
      routesInfo.a = true;
      // routesInfo.u = false;
    }
  }

  if (routesInfo.domain == "gourls.link") {
    tinyURLNivation(routesInfo);
    // console.log('results', results);

    // window.location.href = 'https://www.google.com';
  } else adjustWithLocalStorage(routesInfo, routeParams);

  return routesInfo;
};

async function tinyURLNivation(routesInfo) {
  try {
    const payload = {
      uniqueId: decodeURIComponent(routesInfo.uniqueID),
    };

    const results = await getTargetURLFromTinyURL(payload);
    if (results?.data?.status == "Error")
      window.location.href = "https://www.cypexsoft.com";
    else
      results?.data?.data.target_link &&
        (window.location.href = "https://" + results?.data?.data.target_link);
  } catch (error) {
    window.location.href = "https://www.cypexsoft.com";
  }
}

// This was the Old Version of adjustWithLocalStorage
// it was just adding the uniqueID to localStorage without checking its validity.
// function adjustWithLocalStorage(routesInfo, routeParams) {
//   if (!routeParams.get('a')) {
//     if (localStorage.getItem('uniqueID'))
//       routesInfo.uniqueID = localStorage.getItem('uniqueID');
//   }

//   localStorage.setItem('uniqueID', routesInfo.uniqueID);
//   localStorage.setItem('u', routesInfo.u);
//   localStorage.setItem('a', routesInfo.a);
//   localStorage.setItem('domain', routesInfo.domain);
// }

// This is the new version that will epxire the uniqueID after 15 days
function adjustWithLocalStorage(routesInfo, routeParams) {
  // Check for existing uniqueID and its timestamp
  const storedUniqueID = localStorage.getItem("uniqueID");
  const uniqueIDTimestamp = localStorage.getItem("uniqueID_timestamp");

  if (storedUniqueID && uniqueIDTimestamp) {
    const now = Date.now();
    const fifteenDaysInMs = 15 * 24 * 60 * 60 * 1000;

    if (now - parseInt(uniqueIDTimestamp) > fifteenDaysInMs) {
      // Expired, remove it
      localStorage.removeItem("uniqueID");
      localStorage.removeItem("uniqueID_timestamp");
    } else {
      // Still valid, use it
      if (!routeParams.get("a")) {
        routesInfo.uniqueID = storedUniqueID;
      }
    }
  }

  // Save the new uniqueID and timestamp
  localStorage.setItem("uniqueID", routesInfo.uniqueID);
  localStorage.setItem("uniqueID_timestamp", Date.now().toString());

  localStorage.setItem("u", routesInfo.u);
  localStorage.setItem("a", routesInfo.a);
  localStorage.setItem("domain", routesInfo.domain);
}

const getDomainName = (routeParams) => {
  let domain = "";

  if (
    routeParams &&
    routeParams.get("d") &&
    localStorage.getItem("a") == "true"
  ) {
    domain = routeParams.get("d");
  } else if (
    localStorage.getItem("a") == "true" &&
    localStorage.getItem("domain")
  ) {
    domain = localStorage.getItem("domain");
  } else {
    const url = new URL(window.location.href);
    domain = url.host;
  }

  // Remove 'www.' or 'dev.' if present
  if (domain.startsWith("www.")) {
    domain = domain.substring(4);
  }
  if (domain.startsWith("dev.")) {
    domain = domain.substring(4);
  }

  return domain;
};
