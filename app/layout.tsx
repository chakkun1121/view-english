import { Metadata, Viewport } from 'next';
import React, { StrictMode } from 'react';
import 'winbox/dist/css/winbox.min.css'; // required
import './globals.css';
import { description, siteURL, themeColor } from './meta';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <StrictMode>
        <body className="flex h-full flex-col">{children}</body>
      </StrictMode>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://chakkun1121.github.io/view-english'),
  title: {
    template: '%s | 和訳表示サイト | chakkun1121',
    default:
      '和訳表示サイト | web上で和訳ファイル作成からフラッシュカード機能まで！英語学習に最適 | chakkun1121',
  },
  description,
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
  manifest: './manifest.json',
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
export const viewport: Viewport = {
  themeColor,
};
