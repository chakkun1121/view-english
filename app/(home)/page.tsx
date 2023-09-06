import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <>
      <section>
        <img src="./img/view-english.webp" alt="和訳表示サイト" />
      </section>
      <section className="p-2">
        <h2>アプリへのリンク</h2>
        <Link href="./app">通常版</Link>
      </section>
    </>
  );
}
