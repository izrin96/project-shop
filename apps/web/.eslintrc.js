/** @type {import("eslint").Linter.Config} */
const config = {
  extends: "next/core-web-vitals",
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
module.exports = config;
