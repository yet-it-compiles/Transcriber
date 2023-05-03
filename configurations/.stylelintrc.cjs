module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    "stylelint-config-prettier",
    "stylelint-config-airbnb",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "order/order": [
      "dollar-variables",
      "custom-properties",
      "at-rules",
      "declarations",
      {
        type: "at-rule",
        name: "supports",
      },
      {
        type: "at-rule",
        name: "media",
      },
      {
        type: "at-rule",
        name: "include",
      },
      "rules",
    ],
    "order/properties-alphabetical-order": true,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "extend",
          "at-root",
          "debug",
          "warn",
          "error",
          "if",
          "else",
          "for",
          "each",
          "while",
          "mixin",
          "include",
          "content",
          "return",
        ],
      },
    ],
  },
  ignoreFiles: ["node_modules/**", "build/**", "dist/**"],
};
