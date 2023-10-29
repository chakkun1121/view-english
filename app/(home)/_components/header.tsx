import Link from 'next/link';
import React from 'react';
import { HeaderUserMenu } from './headerUserMenu';

export default function Header() {
  return (
    <>
      <header className="bg-main p-2">
        <div className="flex">
          <Link href="/" className="text-black hover:text-black visited:text-black flex-1">
            <h1>和訳表示サイト</h1>
          </Link>
          <HeaderUserMenu />
        </div>
        <p>和訳ファイル作成からフラッシュカード機能まで！英語学習に最適</p>
      </header>
    </>
  );
}
