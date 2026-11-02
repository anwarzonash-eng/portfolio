import {
  deriveDarkPalette,
  getDarkOverridesFromApi,
  LIGHT_SEMANTIC_TOKENS,
  type ThemePalette,
} from "./deriveDarkPalette";

export const getColors = (listOfdata) => ({
  color1: listOfdata?.color1,
  color2: listOfdata?.color2,
  color3: listOfdata?.color3,
  color4: listOfdata?.color4,
  primary: listOfdata?.primary_color,
  page_bg_color: listOfdata?.page_bg_color,
  banner_bg_color: listOfdata?.banner_bg_color,
  section_bg_color: listOfdata?.section_bg_color,
  heading_color: listOfdata?.heading_color,
  paragrapgh1_color: listOfdata?.paragrapgh1_color,
  paragrapgh2_color: listOfdata?.paragrapgh2_color,
  border_color: listOfdata?.border_color,
});

/**
 * Map from palette key to the CSS variable *base* name.
 * Each base gets a `-light` and a `-dark` variant written here; globals.css
 * points the un-suffixed variable at whichever variant the active theme needs.
 */
const VARIABLE_NAMES: Record<keyof ThemePalette, string> = {
  primary: "--primary-color",
  page_bg_color: "--page_bg_color",
  banner_bg_color: "--banner_bg_color",
  section_bg_color: "--section_bg_color",
  heading_color: "--heading_color",
  paragrapgh1_color: "--paragrapgh1_color",
  paragrapgh2_color: "--paragrapgh2_color",
  border_color: "--border_color",
  surface: "--surface_color",
  surface_muted: "--surface_muted_color",
  on_primary: "--on_primary_color",
  text_muted: "--text_muted_color",
};

/**
 * Write the tenant's light palette and the derived dark palette as CSS
 * variables on <html>. Theme switching is then handled purely by CSS via the
 * `data-theme` attribute, so toggling never needs to recompute colours.
 */
export const updateCSSVariables = (colors, listOfdata = null) => {
  const root = document.documentElement;

  // Legacy decorative variables (not themed, unused by Tailwind tokens).
  root.style.setProperty("--color1", colors.color1);
  root.style.setProperty("--color2", colors.color2);
  root.style.setProperty("--color3", colors.color3);
  root.style.setProperty("--color4", colors.color4);

  // Light: exactly what the API returned (undefined values clear the inline
  // property so the globals.css defaults apply, preserving old behaviour).
  const light = {
    primary: colors.primary,
    page_bg_color: colors.page_bg_color,
    banner_bg_color: colors.banner_bg_color,
    section_bg_color: colors.section_bg_color,
    heading_color: colors.heading_color,
    paragrapgh1_color: colors.paragrapgh1_color,
    paragrapgh2_color: colors.paragrapgh2_color,
    border_color: colors.border_color,
    ...LIGHT_SEMANTIC_TOKENS,
  };

  const dark = deriveDarkPalette(colors, getDarkOverridesFromApi(listOfdata));

  (Object.keys(VARIABLE_NAMES) as (keyof ThemePalette)[]).forEach((key) => {
    const name = VARIABLE_NAMES[key];
    const lightValue = light[key];
    if (lightValue) root.style.setProperty(`${name}-light`, lightValue);
    else root.style.removeProperty(`${name}-light`);
    root.style.setProperty(`${name}-dark`, dark[key]);
  });
};
