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
  runtimeCaching: [
    // すべてのファイルをキャッシュし、オフライン対応させる
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});

module.exports = nextConfig;
