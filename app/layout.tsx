import { Metadata } from 'next';
import React, { StrictMode } from 'react';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <StrictMode>
        <body className="flex min-h-screen flex-col">{children}</body>
      </StrictMode>
    </html>
  );
}
export const siteURL = 'https://chakkun1121.github.io/view-english';
export const description =
  '和訳表示サイトは、自分だけの和訳ファイルを作成して、英語学習を効率的にサポートするサイトです。フラッシュカード機能を搭載し、日本語表示からクリックで英文表示！読み上げ対応で英語学習がより楽しくなります。外部に情報を送信せず、安全にご利用いただけます。';
export const themeColor = '#7aa1d6';
export const metadata: Metadata = {
  metadataBase: new URL('https://chakkun1121.github.io/view-english'),
  title: {
    template: '%s | 和訳表示サイト | chakkun1121',
    default:
      '和訳表示サイト | 和訳ファイル作成からフラッシュカード機能まで！英語学習に最適 | chakkun1121',
  },
  description,
  themeColor,
  keywords: [
    '英語学習',
    '和訳',
    'フラッシュカード',
    '和訳表示サイト',
    '和訳サイト',
    '英語学習サイト',
    '和訳ファイル',
    'wayaku',
  ],
  openGraph: {
    url: siteURL,
    title: '和訳表示サイト',
    description,
    images: [
      {
        url: 'https://chakkun1121.github.io/view-english/img/view-english.png',
      },
    ],
    siteName: '和訳表示サイト',
    locale: 'ja_JP',
    type: 'website',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: '/',
  },
  authors: [
    {
      name: 'chakkun1121',
    },
  ],
  applicationName: '和訳表示サイト',
};
