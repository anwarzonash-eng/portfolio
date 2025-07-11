// utils/smoothScrollTo.ts
export function SmoothScroll(id: string) {
  if (typeof window === "undefined") return; // SSR safe

  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    console.warn(`No element found with ID: ${id}`);
  }
}
