"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const THEME_ATTRIBUTE = "data-theme";
export const THEME_CHANGE_EVENT = "themechange";

/** Routes that must always render in light mode (print layouts and CV documents). */
export const LIGHT_ONLY_PATH_FRAGMENTS = [
  "/print/",
  "/cv",
  "/cv2",
  "/cv3",
  "/cv4",
];

export const isLightOnlyPath = (pathname: string | null | undefined): boolean =>
  LIGHT_ONLY_PATH_FRAGMENTS.some((frag) => (pathname || "").includes(frag));

const isBrowser = () => typeof window !== "undefined";

/** Read the persisted preference. First-time visitors get light mode. */
export const getStoredTheme = (): Theme => {
  if (!isBrowser()) return "light";
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

/** The theme that is currently applied to <html>. */
export const getAppliedTheme = (): Theme => {
  if (!isBrowser()) return "light";
  return document.documentElement.getAttribute(THEME_ATTRIBUTE) === "dark" ? "dark" : "light";
};

/**
 * Apply a theme to the document: sets the attribute Tailwind and globals.css
 * key off, the native `color-scheme`, and the browser-chrome theme colour.
 * Does not persist; see `setTheme` for that.
 */
export const applyTheme = (theme: Theme) => {
  if (!isBrowser()) return;
  const root = document.documentElement;
  root.setAttribute(THEME_ATTRIBUTE, theme);
  root.style.colorScheme = theme;

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) {
    const bg = getComputedStyle(root).getPropertyValue("--page_bg_color").trim();
    meta.content = theme === "dark" && bg ? bg : "#ffffff";
  }

  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
};

/** Persist and apply. */
export const setTheme = (theme: Theme) => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* storage unavailable: still apply for this session */
  }
  applyTheme(theme);
};

/**
 * Two-state theme hook.
 *
 * - `theme` is the applied theme (light on light-only routes regardless of preference).
 * - `toggle()` flips and persists the preference.
 */
export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => getAppliedTheme());

  useEffect(() => {
    const onChange = (e: Event) => setThemeState((e as CustomEvent<Theme>).detail);
    window.addEventListener(THEME_CHANGE_EVENT, onChange);
    // Sync across tabs.
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY) applyTheme(getStoredTheme());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const toggle = useCallback(() => {
    setTheme(getStoredTheme() === "dark" ? "light" : "dark");
  }, []);

  return { theme, isDark: theme === "dark", setTheme, toggle };
};

export default useTheme;
