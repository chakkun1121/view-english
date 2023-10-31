const withPWA = require('next-pwa')({
  dest: 'public',
});
const SUB_DIRECTORY = process.env.SUB_DIRECTORY || '';
const isProd = process.env.NODE_ENV == 'production';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  /* config options here */
  basePath: isProd ? SUB_DIRECTORY : '',
  output: 'export',
  assetPrefix: isProd ? SUB_DIRECTORY : '',
  publicRuntimeConfig: {
    basePath: isProd ? SUB_DIRECTORY : '',
  },
});

module.exports = nextConfig;
