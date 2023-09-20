const withPWA = require('next-pwa')({
  dest: 'public',
});
/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  /* config options here */
  basePath: process.env.NODE_ENV === 'development' ? '' : '/view-english',
  output: 'export',
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
