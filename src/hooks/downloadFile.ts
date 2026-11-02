export const downloadFile = (url: string, filename?: string) => {
  const anchor = document.createElement("a");
  anchor.href = url;

  // Extract filename from URL if none provided
  let finalName = filename || url.split("/").pop() || "download";
  if (!finalName.toLowerCase().endsWith(".pdf")) {
    finalName += ".pdf";
  }
  anchor.setAttribute("download", finalName);

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
