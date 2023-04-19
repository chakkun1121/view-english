import { Head } from 'next/document';
import AppHeader from './appHeader';

export default function AppComportation({ Children, pageProps }) {
  return (
    <>
      <Head>
        <title>和訳表示サイト | chakkun1121</title>
        {/* <!-- アプリ本体はあまり内容がないためクロール禁止 --> */}
        <meta name="robots" content="noindex" />
      </Head>
      <header>
        <AppHeader />
        {/* <Tabs/> */}
      </header>
      <main>
        <Children {...pageProps} />
      </main>
    </>
  );
}
