/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  basePath: process.env.NODE_ENV === 'development' ? '' : '/view-english',
  output: 'export',
};

module.exports = nextConfig;
