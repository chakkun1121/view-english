import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <>
      <section className="grid justify-center">
        <Link href="./view-english.pdf" target="_blank">
          <img src="./img/view-english.webp" alt="和訳表示サイト" />
        </Link>
      </section>
      <section className="p-2">
        <h2>アプリへのリンク</h2>
        <ul>
          <li>
            <Link href="./app">通常版(対応ブラウザ:PC版GoogleChrome最新版)</Link>
          </li>
          <li>
            <a href="./lightVersion/index.html">
              軽量版(通常版が動かない端末ではこちらをご利用ください。)
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
