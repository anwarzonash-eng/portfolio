/**
 * Decorative hero backdrop shared by the portfolio-detail and blog-detail heroes.
 *
 * The artwork used to live inline as JSX (~250 KB across three components, the
 * same two drawings duplicated), which put ~98 KB gzipped of static path data
 * into the JS bundle of every route that rendered it. The blob layer is now two
 * static files under /public/bg so it is cached separately and never parsed as JS.
 *
 * Only the full-canvas backdrop was ever theme-aware (`fill-sectionBG`), so it
 * stays here as a CSS-variable-driven layer and remains reactive to the
 * per-domain palette and dark mode. The exported SVGs are transparent and
 * composite on top of it.
 *
 * `breakpoint` is the viewport width at which the desktop drawing takes over.
 * The two call sites historically differed, so it is explicit rather than
 * defaulted to avoid silently changing either one.
 */
const HeroBackdrop = ({ breakpoint }: { breakpoint: "sm" | "md" }) => {
  // Tailwind needs literal class strings, so both variants are spelled out.
  const desktopClass =
    breakpoint === "sm" ? "hidden sm:block" : "hidden md:block";
  const mobileClass = breakpoint === "sm" ? "sm:hidden" : "md:hidden";

  return (
    <div className="absolute top-0 left-0 w-full h-auto">
      <div className="relative w-full">
        {/* Themed backdrop: paints on the first frame at the tenant's colour. */}
        <div className="absolute inset-0 bg-sectionBG" aria-hidden="true" />
        {/* width/height reserve the aspect ratio before the file arrives, so the
            box never reflows. Eager: this sits above the fold.
            Plain <img>: next/image does not optimise SVG, so it would add a
            wrapper and a loader round-trip for no benefit. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bg/hero-desktop.svg"
          alt=""
          aria-hidden="true"
          width={1550}
          height={896}
          loading="eager"
          decoding="async"
          className={`${desktopClass} relative w-full h-auto`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bg/hero-mobile.svg"
          alt=""
          aria-hidden="true"
          width={393}
          height={896}
          loading="eager"
          decoding="async"
          className={`${mobileClass} relative w-full h-auto`}
        />
      </div>
    </div>
  );
};

export default HeroBackdrop;
