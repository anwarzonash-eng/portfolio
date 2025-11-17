export async function preloadImages(imageUrls: string[], onProgress?: (loaded: number, total: number) => void): Promise<void> {
  const urls = [...new Set(imageUrls)]; // remove duplicates
  let loadedCount = 0;

  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;

          if (img.complete) {
            loadedCount++;
            onProgress?.(loadedCount, urls.length);
            resolve();
          } else {
            img.onload = () => {
              loadedCount++;
              onProgress?.(loadedCount, urls.length);
              resolve();
            };
            img.onerror = () => {
              loadedCount++;
              onProgress?.(loadedCount, urls.length);
              resolve(); // don't block print on error
            };
          }
        })
    )
  );
}
