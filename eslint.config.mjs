import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ESLint 9 flat config. Reuses the same presets the old .eslintrc.json
// declared ("next/core-web-vitals" + "next/typescript") via FlatCompat.
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Deliberately-unused bindings are marked with a leading underscore.
      // Used for props a component must keep in its signature (callers pass
      // them) but does not read, and for positional callback params.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    // Print/PDF layouts render to paper via the browser's print pipeline and
    // must paint every image synchronously. next/image lazy-loads and defers
    // decoding, which leaves blank frames in the exported PDF, so these files
    // deliberately use plain <img> (several already set loading="eager").
    // Image optimisation is a no-op here anyway: next.config sets
    // images.unoptimized = true.
    files: [
      "src/components/PrintComponents/**/*.tsx",
      "src/components/pages/print/**/*.tsx",
    ],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "public/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
