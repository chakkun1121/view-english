import './globals.scss';
const description =
  '和訳表示サイトは、自分だけの和訳ファイルを作成して、英語学習を効率的にサポートするサイトです。フラッシュカード機能を搭載し、日本語表示からクリックで英文表示！読み上げ対応で英語学習がより楽しくなります。外部に情報を送信せず、安全にご利用いただけます。';
export const metadata = {
  title:
    '和訳表示サイト | 和訳ファイル作成からフラッシュカード機能まで！英語学習に最適 | chakkun1121',
  description,
  keywords: '英語学習,和訳,フラッシュカード,和訳表示サイト,和訳サイト,和訳ファイル',
  themeColor: '#7aa1d6',
  colorScheme: '#7aa1d6',
  viewport: 'width=device-width, initial-scale=1.0',
  url: 'https://chakkun1121.github.io/view-english',
  ogTitle: '和訳表示サイト',
  ogDescription: description,
  charset: 'UTF-8',
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
  ogSiteName: '和訳表示サイト',
  ogLocale: 'ja_JP',
  ogAppName: '和訳表示サイト',
  twitterCard: 'summary',
  twitterSite: '@chakkun1121',
  twitterCreator: '@chakkun1121',
  twitterTitle: '和訳表示サイト',
  twitterDescription: description,
  twitterImage: 'https://chakkun1121.github.io/view-english/img/view-english.png',
  twitterUrl: 'https://chakkun1121.github.io/view-english',
  twitterDomain: 'chakkun1121.github.io',
  twitterAppName: '和訳表示サイト',
  twitterAppId: 'chakkun1121.github.io/view-english',
  twitterAppUrl: 'https://chakkun1121.github.io/view-english',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
