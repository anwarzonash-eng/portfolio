export function formatDate(dateString, formatOptions) {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', formatOptions);
}
