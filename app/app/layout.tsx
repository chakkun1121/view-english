import { Metadata } from 'next';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
export const metadata: Metadata = {
  title: 'アプリ',
  description:
    'chakkun1121作成の和訳表示サイトのアプリ本体です。このアプリを使用することでweb上で和訳ファイルを作成し、フラッシュカード(単語帳)を使用し、効率的に英語学習ができます。',
  openGraph: {
    url: 'https://chakkun1121.github.io/view-english/app',
    title: '和訳表示サイト',
  },
  alternates: { canonical: 'app' },
};
