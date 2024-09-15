export const getRoutesDetails = (dynamicRoutes, routeParams) => {
  const routesInfo = {
    uniqueID: '',
    u: false, // u means is_u
    a: false, // a means admin
    domain: getDomainName(routeParams),
  };

  if (dynamicRoutes && dynamicRoutes.unique_id)
    routesInfo.uniqueID = dynamicRoutes.unique_id;
  else routesInfo.uniqueID = 'a';

  const routeIsU = routeParams && routeParams.get('u');
  if (routeIsU) {
    routesInfo.u = true;
  } else {
    const storedIsU = localStorage.getItem('u');
    if (storedIsU === 'true') {
      routesInfo.u = true;
    }
  }

  const routeIsA = routeParams && routeParams.get('a');
  if (routeIsA) {
    routesInfo.a = true;
    // routesInfo.u = false;
  } else {
    const storedIsA = localStorage.getItem('a');
    if (storedIsA === 'true') {
      routesInfo.a = true;
      // routesInfo.u = false;
    }
  }

  adjustWithLocalStorage(routesInfo, routeParams);

  return routesInfo;
};

function adjustWithLocalStorage(routesInfo, routeParams) {
  if (!routeParams.get('a')) {
    if (localStorage.getItem('uniqueID'))
      routesInfo.uniqueID = localStorage.getItem('uniqueID');
  }

  localStorage.setItem('uniqueID', routesInfo.uniqueID);
  localStorage.setItem('u', routesInfo.u);
  localStorage.setItem('a', routesInfo.a);
  localStorage.setItem('domain', routesInfo.domain);
}

const getDomainName = (routeParams) => {
  let domain = '';

  if (
    routeParams &&
    routeParams.get('d') &&
    localStorage.getItem('a') == 'true'
  ) {
    domain = routeParams.get('d');
  } else if (
    localStorage.getItem('a') == 'true' &&
    localStorage.getItem('domain')
  ) {
    domain = localStorage.getItem('domain');
  } else {
    const url = new URL(window.location.href);
    domain = url.host;
  }

  // Remove 'www.' or 'dev.' if present
  if (domain.startsWith('www.')) {
    domain = domain.substring(4);
  }
  if (domain.startsWith('dev.')) {
    domain = domain.substring(4);
  }

  return domain;
};
