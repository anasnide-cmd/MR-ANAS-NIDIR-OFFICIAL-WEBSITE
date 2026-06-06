import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next (recursively matching):
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/next-env.d.ts",
    "**/dist/**",
    "**/tmp/**",
    "**/temp_app/**",
  ]),
]);

export default eslintConfig;
