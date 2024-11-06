export const openChat = (e) => {
  e.preventDefault();
  if (window.Tawk_API) {
    window.Tawk_API.maximize();
  }
};
