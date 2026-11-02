"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element gets near the viewport, and then disconnects.
 *
 * Used to gate below-the-fold components that are expensive to download. The
 * default 400px margin means the chunk starts loading well before the element
 * is actually visible, so in normal scrolling the real component has already
 * replaced its placeholder by the time the user reaches it — which is what
 * keeps the swap from being perceived as a layout jump.
 *
 * Two fallbacks guarantee nothing can end up permanently stuck on a placeholder:
 *  - where IntersectionObserver is unavailable (older browsers, and the
 *    jsdom-style environments used for print capture) it loads immediately;
 *  - on `beforeprint` (Ctrl+P on a screen page) every gated section loads at
 *    once, so a printed page never contains a placeholder.
 */
export const useInView = <T extends HTMLElement = HTMLDivElement>(
  rootMargin = "400px",
) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const reveal = () => setInView(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    window.addEventListener("beforeprint", reveal);
    return () => {
      observer.disconnect();
      window.removeEventListener("beforeprint", reveal);
    };
  }, [inView, rootMargin]);

  return { ref, inView };
};

export default useInView;
