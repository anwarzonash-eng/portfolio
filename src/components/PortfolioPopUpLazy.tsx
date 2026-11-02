"use client";
import dynamic from "next/dynamic";

/**
 * Lazy entry point for the portfolio image modal, for SCREEN call sites only.
 *
 * Every screen call site already mounts the modal conditionally on
 * `isModalOpen`, so with this wrapper the chunk is fetched the first time a
 * user actually clicks a portfolio image. The modal is a fixed full-screen
 * overlay, so it is outside normal document flow and cannot shift the page.
 *
 * While the chunk loads we show the same dimmed, blurred backdrop the real
 * modal uses, so the click gets immediate visual feedback.
 *
 * Print components (PortfolioCvPortrait, PortfolioPortrait, HomeSliderPrint)
 * keep importing ./PortfolioPopUp directly on purpose — a loading boundary
 * inside the Puppeteer capture path is not acceptable there.
 */
const PortfolioPopUpLazy = dynamic(() => import("./PortfolioPopUp"), {
  ssr: false,
  loading: () => (
    <div
      className="fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-blur-2xl z-[550]"
      aria-hidden="true"
    />
  ),
});

export default PortfolioPopUpLazy;
