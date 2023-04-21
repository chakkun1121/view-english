'use client';
import AppComportation from './appComportation';
import Head from 'next/head';
import MainContent from './mainContent';
export default function App({ fileID = null, type = 'newTab' }) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/apple.png" async />
        <link rel="icon" href="../favicon.ico" id="favicon" async />
        <link rel="manifest" href="manifest.webmanifest" defer />
      </Head>
      <AppComportation>
        <MainContent fileID={fileID} type={type} />
      </AppComportation>
    </>
  );
}
