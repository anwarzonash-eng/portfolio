export function processReviewText(
  reviewText: string,
  designation: string,
  textColorClass: string = "text-white"
): string {
  if (!reviewText) return "";

  let processed = reviewText;

  // Step 1: Replace {designation} with a temporary marker first
  const DESIGNATION_MARKER = "__DESIGNATION_PLACEHOLDER__";
  processed = processed.replace(/{designation}/gi, DESIGNATION_MARKER);

  // Step 2: Process all <u>...</u> tags (same as before)
  processed = processed.replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, (match, innerContent) => {
    const text = innerContent.trim();

    if (!text) return match;

    const isUrlLike = (() => {
      if (/^https?:\/\//i.test(text)) return true;
      if (/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(text)) {
        return true;
      }
      if (/\.[a-zA-Z]{2,}$/.test(text) && !text.includes(" ")) {
        return true;
      }
      return false;
    })();

      if (isUrlLike) {
      let url = text;
      if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
      }

      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${textColorClass} font-semibold hover:underline">
        ${text}
      </a>`;
    }

    return `<span class="${textColorClass} font-semibold">${text}</span>`;
  });

  // Step 3: Now replace the marker with styled designation
  // Apply the SAME logic: check if designation looks like a URL
  const isDesignationUrlLike = (() => {
    if (/^https?:\/\//i.test(designation)) return true;
    if (/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(designation)) {
      return true;
    }
    if (/\.[a-zA-Z]{2,}$/.test(designation) && !designation.includes(" ")) {
      return true;
    }
    return false;
  })();

  let styledDesignation: string;

  if (isDesignationUrlLike) {
    let url = designation;
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    styledDesignation = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${textColorClass} font-semibold hover:underline">
      ${designation}
    </a>`;
  } else {
    styledDesignation = `<span class="${textColorClass} font-semibold">${designation}</span>`;
  }

  // Final replacement
  processed = processed.replace(new RegExp(DESIGNATION_MARKER, 'g'), styledDesignation);

  return processed;
}