export const getUsername = (url) => {
  if (!url) return '';
  const parts = url.split('/');
  return `@${parts[parts.length - 1]}`;
};
