import nextPWA from 'next-pwa';
import nextMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import nextTranspileModules from 'next-transpile-modules';
const SUB_DIRECTORY = process.env.SUB_DIRECTORY || '';
const isProd = process.env.NODE_ENV == 'production';
const withPWA = nextPWA({
  dest: 'public',
});
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});
const withTM = nextTranspileModules(['react-winbox']);
/** @type {import('next').NextConfig} */
export default withMDX(
  withPWA(withTM())({
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    /* config options here */
    basePath: isProd ? SUB_DIRECTORY : '',
    output: 'export',
    assetPrefix: isProd ? SUB_DIRECTORY : '',
    publicRuntimeConfig: {
      basePath: isProd ? SUB_DIRECTORY : '',
    },
  })
);
