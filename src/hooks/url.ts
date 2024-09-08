export const getRoutesDetails = (dynamicRoutes, routeParams) => {
  const routesInfo = {
    uniqueID: '',
    is_u: false,
    admin: false,
    domain: getDomainName(),
  };

  if (dynamicRoutes && dynamicRoutes.unique_id)
    routesInfo.uniqueID = dynamicRoutes.unique_id;
  else routesInfo.uniqueID = 'a';

  if (
    routeParams &&
    routeParams.get('is_u') &&
    routeParams.get('is_u') === 'true'
  ) {
    routesInfo.is_u = true;
  }
  if (routeParams && routeParams.get('admin')) {
    routesInfo.admin = true;
    routesInfo.is_u = false;
  }

  adjustWithLocalStorage(routesInfo, routeParams);

  return routesInfo;
};

function adjustWithLocalStorage(routesInfo, routeParams) {
  if (!routeParams.get('admin')) {
    if (localStorage.getItem('uniqueID'))
      routesInfo.uniqueID = localStorage.getItem('uniqueID');
  }

  localStorage.setItem('uniqueID', routesInfo.uniqueID);
  localStorage.setItem('is_u', routesInfo.is_u);
  localStorage.setItem('admin', routesInfo.admin);
}

const getDomainName = () => {
  const url = new URL(window.location.href);
  let domain = url.host;

  // Remove 'www.' if present
  if (domain.startsWith('www.')) {
    domain = domain.substring(4);
  }

  return domain;
};
