"use client";
import { useEffect, useState } from "react";

interface UseTruncatedFeaturesArgs {
  /** The gate value: when falsy, all derived HTML state is reset. */
  enabled: unknown;
  /** The full HTML to truncate (already run through modifiedContent). */
  rawHtml: string;
  /** Max <li> items shown while collapsed. */
  limit?: number;
}

/**
 * The portfolio-detail "features" truncation state machine: counts the <li>
 * items in an HTML fragment, keeps both the full and a truncated version, and
 * exposes an expand/collapse toggle. Extracted verbatim from
 * components/pages/portfolio-detail.
 */
export const useTruncatedFeatures = ({
  enabled,
  rawHtml,
  limit = 15,
}: UseTruncatedFeaturesArgs) => {
  const [featuresItemCount, setFeaturesItemCount] = useState(0);
  const [fullFeaturesHtml, setFullFeaturesHtml] = useState<string | null>(null);
  const [defaultTruncatedHtml, setDefaultTruncatedHtml] = useState<
    string | null
  >(null);
  const [isExpanded, setIsExpanded] = useState(false); // screen expansion toggle

  useEffect(() => {
    if (!enabled) {
      setFeaturesItemCount(0);
      setFullFeaturesHtml("");
      setDefaultTruncatedHtml("");
      return;
    }

    try {
      const parserForCount = new DOMParser();
      const docForCount = parserForCount.parseFromString(rawHtml, "text/html");
      const allLis = Array.from(docForCount.querySelectorAll("li"));
      setFeaturesItemCount(allLis.length);
      setFullFeaturesHtml(rawHtml);

      // Helper builds truncated HTML
      const buildTruncated = (count: number) => {
        if (!rawHtml) return "";
        const parser = new DOMParser();
        const tempDoc = parser.parseFromString(rawHtml, "text/html");
        const lis = Array.from(tempDoc.querySelectorAll("li"));
        if (lis.length === 0) return rawHtml;

        const firstList = tempDoc.querySelector("ul, ol");
        const listTag = firstList ? firstList.tagName.toLowerCase() : "ul";

        const newDoc = document.implementation.createHTMLDocument("");
        const container = newDoc.createElement("div");
        const newList = newDoc.createElement(listTag);

        const take = Math.min(count, lis.length);
        lis.slice(0, take).forEach((li) => {
          newList.appendChild(li.cloneNode(true));
        });

        container.appendChild(newList);
        return container.innerHTML;
      };

      // Truncate to `limit` items for screen
      setDefaultTruncatedHtml(
        allLis.length > limit ? buildTruncated(limit) : rawHtml,
      );
    } catch (e) {
      console.error("[features] parse error:", e);
      setFeaturesItemCount(0);
      setFullFeaturesHtml("");
      setDefaultTruncatedHtml("");
    }
  }, [enabled, rawHtml, limit]);

  return {
    featuresItemCount,
    fullFeaturesHtml,
    defaultTruncatedHtml,
    isExpanded,
    setIsExpanded,
  };
};

export default useTruncatedFeatures;
