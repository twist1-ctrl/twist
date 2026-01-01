const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
  },
  localePath: path.resolve('./public/locales'),
  ns: ['common', 'navigation', 'home', 'packages', 'posts'],
  defaultNS: 'common',
};
