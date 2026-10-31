
import { useEffect } from 'react';

/**
 * Sets the per-page body background for LIGHT mode.
 *
 * The colour is written to a CSS variable instead of an inline style so that
 * the dark-mode rule in globals.css (`[data-theme="dark"] body`) can take over
 * with the derived page background without fighting inline specificity.
 * Light-mode output is unchanged from the previous inline-style behaviour.
 */
const useBodyBackgroundColor = (color: string) => {
  useEffect(() => {
    document.body.style.setProperty('--body_bg_light', color);

    // Cleanup: Reset to default color when component unmounts
    return () => {
      document.body.style.removeProperty('--body_bg_light');
    };
  }, [color]);
};

export default useBodyBackgroundColor;
