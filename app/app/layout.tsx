import { Metadata } from 'next';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return children;
}
export const metadata: Metadata = {
  title: 'アプリ',
  description: 'chakkun1121作成の和訳表示サイトのアプリ本体です。',
  openGraph: {
    url: 'https://chakkun1121.github.io/view-english/app',
    title: '和訳表示サイト',
  },
  alternates: { canonical: 'app' },
};
