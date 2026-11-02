import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const GoogleAnalytics = ({ scriptNumber }) => {
  useEffect(() => {
    if (scriptNumber && typeof window !== "undefined") {
      // Check if the script is already loaded
      if (
        !document.querySelector(
          `script[src="https://www.googletagmanager.com/gtag/js?id=${scriptNumber}"]`
        )
      ) {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${scriptNumber}`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          // Initialize the dataLayer
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: unknown[]) {
            window.dataLayer.push(...args);
          }

          gtag("js", new Date());
          gtag("config", scriptNumber);

        };

        script.onerror = () => {
          console.error("Failed to load Google Analytics script");
        };
      }
    }
  }, [scriptNumber]);

  return null;
};

export default GoogleAnalytics;
