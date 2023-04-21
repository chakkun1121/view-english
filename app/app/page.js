'use client';
import Head from 'next/head';
import MainContent from './mainContent';

export default function App({ fileID = null, type = 'newTab' }) {
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
      <MainContent fileID={fileID} type={type} />
    </>
  );
}
