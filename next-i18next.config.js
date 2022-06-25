// const path = require('path');
const { DEFAULT_LANGUAGE } = require("./config/constant");

module.exports = {
  i18n: {
    defaultLocale: DEFAULT_LANGUAGE,
    locales: ["en", "vi"],
    localeDetection: true,
  },
  trailingSlash: true,
};
