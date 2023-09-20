const withPWA = require('next-pwa')({
  dest: 'public',
});
/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  /* config options here */
  basePath: process.env.NODE_ENV === 'development' ? '' : '/view-english',
  output: 'export',
});

module.exports = nextConfig;
