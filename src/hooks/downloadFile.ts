// export const downloadFile = (url, filename) => {
//   fetch(url)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const blobUrl = window.URL.createObjectURL(blob);
//       const anchor = document.createElement('a');
//       anchor.href = blobUrl;
//       anchor.setAttribute('download', filename);
//       document.body.appendChild(anchor);
//       anchor.click();
//       document.body.removeChild(anchor);
//       window.URL.revokeObjectURL(blobUrl);
//     });
// };

// New Logic to download file directly without fetch
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
