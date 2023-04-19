import Head from 'next/head';
import Link from 'next/link';
import styles from './page.module.scss';
export default function Home() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          和訳表示サイト | 和訳ファイル作成からフラッシュカード機能まで！英語学習に最適 |
          chakkun1121
        </title>
        <meta
          name="description"
          content="和訳表示サイトは、自分だけの和訳ファイルを作成して、英語学習を効率的にサポートするサイトです。フラッシュカード機能を搭載し、日本語表示からクリックで英文表示！読み上げ対応で英語学習がより楽しくなります。外部に情報を送信せず、安全にご利用いただけます。"
        />
        <meta name="application-name" content="和訳表示サイト" />
        <meta
          name="keywords"
          content="英語学習,和訳,フラッシュカード,和訳表示サイト,和訳サイト,和訳ファイル"
        />
        <meta name="theme-color" content="#7aa1d6" />
        <meta name="color-scheme" content="#7aa1d6" />
        <meta property="og:url" content="https://chakkun1121.github.io" />
        <meta property="og:title" content="和訳表示サイト" />
        <meta
          property="og:description"
          content="和訳表示サイトは、自分だけの和訳ファイルを作成して、英語学習を効率的にサポートするサイトです。フラッシュカード機能を搭載し、日本語表示からクリックで英文表示！読み上げ対応で英語学習がより楽しくなります。外部に情報を送信せず、安全にご利用いただけます。"
        />
        <meta property=" og:image" content="./img/view-english.png" />
        <meta property="og:site_name" content="和訳表示サイト" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="format-detection" content="email=no,telephone=no,address=no" />
        <meta name="msapplication-TileImage" content="./img/icon-512.png" />
        <meta name="msapplication-TileColor" content="#7aa1d6" />
        <meta name="language" content="Japanese" />
        <meta name="copyright" content="chakkun1121" />
        <meta name="author" content="chakkun1121" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://chakkun1121.github.io/view-english" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>和訳表示サイト</h1>
      </header>
      <main className={styles.main}>
        <section id="top" className={styles.top}>
          <a href="./view-english.pdf" target="_blank">
            <img
              class="top-image"
              src="./img/view-english.webp"
              loading="lazy"
              alt="和訳表示サイト"
            />
          </a>
          <h2>アプリへのリンク</h2>
          <div class="top-link">
            <Link class="top-link" href="./app">
              和訳表示サイト(通常版)(対応ブラウザ:chrome100以上)
            </Link>
          </div>
          <div class="top-link">
            <a class="top-link" href="./lightVersion/index.html">
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
            <a href="./app">アプリへのリンク</a>
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
