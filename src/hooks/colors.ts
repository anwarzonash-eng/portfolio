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

export const updateCSSVariables = (colors) => {
  const root = document.documentElement;

  root.style.setProperty('--color1', colors.color1);
  root.style.setProperty('--color2', colors.color2);
  root.style.setProperty('--color3', colors.color3);
  root.style.setProperty('--color4', colors.color4);
  root.style.setProperty('--primary-color', colors.primary);
  root.style.setProperty('--page_bg_color', colors.page_bg_color);
  root.style.setProperty('--banner_bg_color', colors.banner_bg_color);
  root.style.setProperty('--section_bg_color', colors.section_bg_color);
  root.style.setProperty('--heading_color', colors.heading_color);
  root.style.setProperty('--paragrapgh1_color', colors.paragrapgh1_color);
  root.style.setProperty('--paragrapgh2_color', colors.paragrapgh2_color);
  root.style.setProperty('--border_color', colors.border_color);
};
