import './globals.scss';

export const metadata = {
  title:
    '和訳表示サイト | 和訳ファイル作成からフラッシュカード機能まで！英語学習に最適 | chakkun1121',
  description:
    '訳表示サイトは、自分だけの和訳ファイルを作成して、英語学習を効率的にサポートするサイトです。フラッシュカード機能を搭載し、日本語表示からクリックで英文表示！読み上げ対応で英語学習がより楽しくなります。外部に情報を送信せず、安全にご利用いただけます。',
  keywords: '英語学習,和訳,フラッシュカード,和訳表示サイト,和訳サイト,和訳ファイル',
  themeColor: '#7aa1d6',
  colorScheme: '#7aa1d6',
  viewport: 'width=device-width, initial-scale=1.0',
  url: 'https://chakkun1121.github.io/view-english',
  ogTitle: '和訳表示サイト',
  charset: 'UTF-8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
