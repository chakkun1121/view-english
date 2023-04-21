import AppHeader from './appHeader';
import AppTabs from './tabs';
import Head from 'next/head';
export const metadata = {
  charset: 'UTF-8',
  robots: 'noindex',
  title: '和訳表示サイト | chakkun1121',
  formatDetection: {
    telephone: 'no',
    email: 'no',
    address: 'no',
  },
  language: 'Japanese',
  copyright: 'chakkun1121',
  auther: 'chakkun1121',
  ogType: 'webapp',
  ogImage: 'https://chakkun1121.github.io/view-english/img/view-english.png',
  ogUrl: 'https://chakkun1121.github.io/view-english',
  themeColor: '#7aa1d6',
  colorScheme: '#7aa1d6',
  viewport: 'width=device-width, initial-scale=1.0',
};
export default function AppLayout({ children, params }) {
  console.log(params);
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/apple.png" async />
        <link rel="icon" href="../favicon.ico" id="favicon" async />
        <link rel="manifest" href="manifest.webmanifest" defer />]
        {/* <!-- アプリ本体はあまり内容がないためクロール禁止 --> */}
        <meta name="robots" content="noindex" />
        <title>和訳表示サイト | chakkun1121</title>
      </Head>
      <header>
        <AppHeader />
        <AppTabs />
      </header>
      <main>{children}</main>
    </>
  );
}
