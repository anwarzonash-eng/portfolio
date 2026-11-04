/**
 * SVGO configuration for assets under public/.
 *
 * cleanupIds is off: every hero backdrop and several icons here reference
 * internal ids via url(#...) for gradients, filters and clipPaths, and
 * rewriting or pruning those ids silently breaks the artwork.
 *
 * removeViewBox is off: without a viewBox an SVG stops scaling to its
 * container, which matters because these are rendered into fluid boxes.
 *
 * Numeric precision is left at the default. Lowering it is where most of the
 * remaining bytes are, but it shows up as faceting on the large soft curves in
 * the hero backdrops.
 */
export default {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: { overrides: { cleanupIds: false, removeViewBox: false } },
    },
  ],
};
