import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <>
      <header className="bg-main p-2">
        <Link href="/" className="text-black hover:text-black visited:text-black">
          <h1>和訳表示サイト</h1>
        </Link>
        <p>和訳ファイル作成からフラッシュカード機能まで！英語学習に最適</p>
      </header>
    </>
  );
}
