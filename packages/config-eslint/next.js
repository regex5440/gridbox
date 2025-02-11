const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    // "eslint-config-turbo", // Uncomment this line to enable Turbo, that is currently resulting in an error
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
      node: {
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
  // add rules configurations here
  overrides: [
    {
      files: [
        "*.ts",
        "page.tsx",
        "layout.tsx",
        "index.tsx",
        "template.tsx",
        "loading.tsx",
        "error.tsx",
        "global-error.tsx",
        "default.tsx",
        "not-found.tsx",
      ],
      rules: {
        "unicorn/filename-case": "off",
      },
    },
  ],
  rules: {
    "import/no-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "unicorn/filename-case": ["error", { case: "pascalCase" }],
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/require-await": "off",
    "tsdoc/syntax": "off",
    "import/named": "off",
    "no-nested-ternary": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/label-has-associated-control": "off",
  },
};
