module.exports = {
  "extends": [
    "airbnb",
    "plugin:testcafe/recommended",
  ],
  "globals": {
    "google": true,
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "testcafe",
  ],
  "env": {
    "browser": true,
  },
  "rules": {
    "camelcase": 0,
    "no-unused-expressions": [
      "error",
      {
        "allowTaggedTemplates": true,
      }
    ],
    "import/no-extraneous-dependencies": 0,
    "no-underscore-dangle": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-filename-extension": 2,
    "react/prefer-stateless-function": 0,
  },
  "settings": {
    "import/resolver": "webpack",
  },
};
