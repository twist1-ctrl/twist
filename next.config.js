const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
