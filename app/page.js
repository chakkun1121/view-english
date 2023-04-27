import Head from 'next/head';
import Link from 'next/link';
import styles from './page.module.scss';
export const appVersion = '4.2.0';
export const mainColor = '#7aa1d6';
export const issueURL = 'https://github.com/chakkun1121/view-english/issues/new';
export default function Home() {
  return (
    <>
      <Head>
        <title>
          和訳表示サイト | 和訳ファイル作成からフラッシュカード機能まで！英語学習に最適 |
          chakkun1121
        </title>
        <link rel="canonical" href="https://chakkun1121.github.io/view-english" />
        <meta name="msapplication-TileImage" content="./img/icon-512.png" />
        <meta name="msapplication-TileColor" content="#7aa1d6" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>和訳表示サイト</h1>
      </header>
      <main className={styles.main}>
        <section id="top" className={styles.top}>
          <a href="./view-english.pdf" target="_blank">
            <img
              className={styles['top-image']}
              src="./img/view-english.webp"
              loading="lazy"
              alt="和訳表示サイト"
            />
          </a>
          <h2>アプリへのリンク</h2>
          <div className="top-link">
            <Link className="top-link" href="./app">
              和訳表示サイト(通常版)(対応ブラウザ:chrome100以上)
            </Link>
          </div>
          <div className="top-link">
            <a className="top-link" href="./lightVersion/index.html">
              和訳表示サイト軽量版(対応ブラウザ:IEを含むほとんどのブラウザ(ブラウザによっては機能が制限されます。))
            </a>
          </div>
        </section>
        <section className={styles['what-this-app']}>
          <h2>和訳表示サイトとは</h2>
          <p>
            和訳表示サイトはパソコンやスマートフォンに保存されている和訳ファイル(.wayaku)を開いたり、編集したりするアプリです。詳しくは
            <a href="../help/view-english/about/" target="_blank">
              こちら
            </a>
          </p>
        </section>
        <section>
          <h2>使い方は?</h2>
          <p>
            <Link href="./app">アプリへのリンク</Link>
            をクリックするだけで簡単にご利用いただけます。基本的にインストールは不要ですが、インストールすることでより快適にご利用いただけます。
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles['footer-left']}>和訳表示サイト</div>
        <div className={styles['footer-links']}>
          <Footerlink href="./app" text="和訳表示サイトアプリへ" />
          <Footerlink href="./settings" text="アプリの設定へ" />
          <Footerlink href="./release-notes" text="リリースノート" />
          <Footerlink href="../help/view-english" text="和訳表示サイトヘルプへ" />
        </div>
      </footer>
    </>
  );
}
function Footerlink({ href, text }) {
  return (
    <a href={href} className="footer-link">
      {text}
    </a>
  );
}
