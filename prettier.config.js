/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  trailingComma: "es5",
  singleQuote: true,
  bracketSameLine: true,
  arrowParens: "avoid",
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "<TYPES>",
    "",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderTypeScriptVersion: "5.0.0",
};
