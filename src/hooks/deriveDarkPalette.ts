/**
 * Derives a dark-mode palette from the light palette the API returns per domain.
 *
 * The derivation is a pure, deterministic function so every domain gets its own
 * dark flavour (keyed to the tenant's primary hue) without any backend work.
 * If the API ever starts returning `dark_*` fields they win over derived values.
 *
 * No external dependencies: small hex/HSL helpers plus a WCAG contrast check.
 */

export interface LightPalette {
  primary?: string;
  page_bg_color?: string;
  banner_bg_color?: string;
  section_bg_color?: string;
  heading_color?: string;
  paragrapgh1_color?: string;
  paragrapgh2_color?: string;
  border_color?: string;
}

export interface ThemePalette {
  primary: string;
  page_bg_color: string;
  banner_bg_color: string;
  section_bg_color: string;
  heading_color: string;
  paragrapgh1_color: string;
  paragrapgh2_color: string;
  border_color: string;
  // Semantic tokens that the light palette never had. They exist so the
  // hard-coded whites/greys in components can be migrated to tokens.
  surface: string; // cards, modals, dropdowns (light: white)
  surface_muted: string; // soft panels (light: #EFF5FD)
  on_primary: string; // text placed on a primary-coloured background
  text_muted: string; // secondary text (light: #757575)
}

/** Fixed light values for the new semantic tokens: matches today's look. */
export const LIGHT_SEMANTIC_TOKENS = {
  surface: "#ffffff",
  surface_muted: "#eff5fd",
  on_primary: "#ffffff",
  text_muted: "#757575",
};

/** The fallback light scheme that lives in globals.css `:root`. */
export const DEFAULT_LIGHT_PALETTE: Required<LightPalette> = {
  primary: "#00473c",
  page_bg_color: "#f8f9fa",
  banner_bg_color: "#a3ddd3",
  section_bg_color: "#00362e",
  heading_color: "#262626",
  paragrapgh1_color: "#3e3e3e",
  paragrapgh2_color: "#f8f9fa",
  border_color: "#dddddd",
};

// ---------------------------------------------------------------------------
// Colour maths
// ---------------------------------------------------------------------------

type RGB = [number, number, number];
type HSL = [number, number, number]; // h 0-360, s 0-100, l 0-100

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export const isHexColor = (value: unknown): value is string =>
  typeof value === "string" && HEX_RE.test(value.trim());

const normalizeHex = (hex: string): string => {
  let h = hex.trim().replace("#", "").toLowerCase();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return `#${h}`;
};

const hexToRgb = (hex: string): RGB => {
  const h = normalizeHex(hex).slice(1);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
};

const rgbToHex = ([r, g, b]: RGB): string =>
  "#" +
  [r, g, b]
    .map((v) =>
      Math.round(Math.max(0, Math.min(255, v)))
        .toString(16)
        .padStart(2, "0")
    )
    .join("");

const rgbToHsl = ([r, g, b]: RGB): HSL => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
};

const hslToRgb = ([h, s, l]: HSL): RGB => {
  h /= 360;
  s /= 100;
  l /= 100;
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t: number) => {
    t = (t + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [channel(h + 1 / 3) * 255, channel(h) * 255, channel(h - 1 / 3) * 255];
};

const hsl = (h: number, s: number, l: number): string =>
  rgbToHex(hslToRgb([h, clamp(s), clamp(l)]));

const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));

const toHsl = (hex: string): HSL => rgbToHsl(hexToRgb(hex));

/** WCAG 2.x relative luminance. */
const luminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** WCAG contrast ratio between two hex colours (1 to 21). */
export const contrastRatio = (a: string, b: string): number => {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/**
 * Raise lightness (in small steps) until `hex` reaches `target` contrast
 * against `bg`. Used to make a tenant's dark brand primary legible on dark
 * surfaces without changing its hue.
 */
const lightenUntilContrast = (hex: string, bg: string, target: number): string => {
  let [h, s, l] = toHsl(hex);
  let out = normalizeHex(hex);
  let guard = 0;
  while (contrastRatio(out, bg) < target && l < 96 && guard++ < 80) {
    l += 1.5;
    out = hsl(h, s, l);
  }
  return out;
};

/**
 * Relative rule for section backgrounds: keep the tenant's section hue and
 * saturation but pick a lightness that sits a fixed perceptual step above the
 * dark page, so every tenant gets the same separation regardless of how bright
 * their original section colour was.
 */
const sectionAbovePage = (sectionHex: string, pageHex: string, target: number): string => {
  const [h, s] = toHsl(sectionHex);
  const [, , pageL] = toHsl(pageHex);
  const sat = Math.min(s, 45);
  let l = pageL + 2;
  let out = hsl(h, sat, l);
  let guard = 0;
  while (contrastRatio(out, pageHex) < target && l < 40 && guard++ < 80) {
    l += 0.5;
    out = hsl(h, sat, l);
  }
  return out;
};

// ---------------------------------------------------------------------------
// Derivation
// ---------------------------------------------------------------------------

const pick = (value: unknown, fallback: string): string =>
  isHexColor(value) ? normalizeHex(value) : fallback;

/** Fill in any missing/invalid fields from the default light scheme. */
export const completeLightPalette = (light: LightPalette | null | undefined) => ({
  primary: pick(light?.primary, DEFAULT_LIGHT_PALETTE.primary),
  page_bg_color: pick(light?.page_bg_color, DEFAULT_LIGHT_PALETTE.page_bg_color),
  banner_bg_color: pick(light?.banner_bg_color, DEFAULT_LIGHT_PALETTE.banner_bg_color),
  section_bg_color: pick(light?.section_bg_color, DEFAULT_LIGHT_PALETTE.section_bg_color),
  heading_color: pick(light?.heading_color, DEFAULT_LIGHT_PALETTE.heading_color),
  paragrapgh1_color: pick(light?.paragrapgh1_color, DEFAULT_LIGHT_PALETTE.paragrapgh1_color),
  paragrapgh2_color: pick(light?.paragrapgh2_color, DEFAULT_LIGHT_PALETTE.paragrapgh2_color),
  border_color: pick(light?.border_color, DEFAULT_LIGHT_PALETTE.border_color),
});

const cache = new Map<string, ThemePalette>();

/**
 * Derive the dark palette for a tenant.
 *
 * @param light   The light palette from the API (missing fields fall back to defaults).
 * @param overrides Optional explicit dark values (e.g. future `dark_*` API fields).
 */
export function deriveDarkPalette(
  light: LightPalette | null | undefined,
  overrides: Partial<ThemePalette> = {}
): ThemePalette {
  const base = completeLightPalette(light);
  const key = JSON.stringify([base, overrides]);
  const cached = cache.get(key);
  if (cached) return cached;

  const [ph, ps] = toHsl(base.primary);
  // Brand hue with muted saturation for large dark surfaces.
  const tint = Math.min(ps, 30);

  const page_bg_color = hsl(ph, tint * 0.6, 7);
  const surface = hsl(ph, tint * 0.7, 11);
  const surface_muted = hsl(ph, tint * 0.7, 15);
  const banner_bg_color = hsl(ph, tint, 14);
  const border_color = hsl(ph, tint * 0.6, 24);
  const section_bg_color = sectionAbovePage(base.section_bg_color, page_bg_color, 1.7);

  // Primary: keep hue, lift until legible on card surfaces.
  const primary = lightenUntilContrast(hsl(ph, Math.max(ps * 0.9, 35), 55), surface, 4.5);
  // Text on primary buttons: white loses once the primary is lightened, so pick the better of the two.
  const on_primary = contrastRatio("#ffffff", primary) >= contrastRatio("#111111", primary) ? "#ffffff" : "#111111";

  const heading_color = hsl(ph, 15, 94);
  const paragrapgh1_color = hsl(ph, 10, 78);
  const paragrapgh2_color = hsl(ph, 10, 88);
  const text_muted = hsl(ph, 8, 62);

  const derived: ThemePalette = {
    primary,
    page_bg_color,
    banner_bg_color,
    section_bg_color,
    heading_color,
    paragrapgh1_color,
    paragrapgh2_color,
    border_color,
    surface,
    surface_muted,
    on_primary,
    text_muted,
  };

  // Explicit overrides (only valid hex values are accepted).
  const result = { ...derived };
  (Object.keys(overrides) as (keyof ThemePalette)[]).forEach((k) => {
    const v = overrides[k];
    if (isHexColor(v)) result[k] = normalizeHex(v);
  });

  cache.set(key, result);
  return result;
}

/**
 * Pull any `dark_*` fields the API may return in future, e.g. `dark_primary_color`.
 * Returns an empty object today, which keeps the derivation fully client-side.
 */
export const getDarkOverridesFromApi = (listOfdata: any): Partial<ThemePalette> => {
  if (!listOfdata) return {};
  const map: Record<string, keyof ThemePalette> = {
    dark_primary_color: "primary",
    dark_page_bg_color: "page_bg_color",
    dark_banner_bg_color: "banner_bg_color",
    dark_section_bg_color: "section_bg_color",
    dark_heading_color: "heading_color",
    dark_paragrapgh1_color: "paragrapgh1_color",
    dark_paragrapgh2_color: "paragrapgh2_color",
    dark_border_color: "border_color",
  };
  const out: Partial<ThemePalette> = {};
  Object.entries(map).forEach(([apiKey, token]) => {
    if (isHexColor(listOfdata[apiKey])) out[token] = listOfdata[apiKey];
  });
  return out;
};
