// @/hooks/processReviewText.ts or wherever you keep it

export function processReviewText(reviewText: string, clientDesignation: string): string {
  if (!reviewText) return "";

  let processed = reviewText;

  // Step 1: Replace {designation} placeholder
  processed = processed.replace(/{designation}/g, clientDesignation);

  // Step 2: Process all <u>...</u> tags
  processed = processed.replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, (match, innerContent) => {
    const text = innerContent.trim();

    // Skip if empty
    if (!text) return match;

    // Strong URL/domain detection
    const isUrlLike = (() => {
      // Full URL: http://example.com or https://...
      if (/^https?:\/\//i.test(text)) return true;

      // Domain: example.com, subdomain.site.co.uk, etc.
      if (/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(text)) {
        return true;
      }

      // Common cases like BigPhotoHunt.com
      if (/\.[a-zA-Z]{2,}$/.test(text) && !text.includes(" ")) {
        return true;
      }

      return false;
    })();

    if (isUrlLike) {
      // Normalize URL
      let url = text;
      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }

      // Return as clickable link
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-white font-semibold">
        ${text}
      </a>`;
    }

    // Not a URL → keep as styled underline or just return original
    return `<span class="text-white font-semibold">${text}</span>`;
  });

  return processed;
}