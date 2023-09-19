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
        <h2>和訳表示サイトとは</h2>
        <p>
          和訳表示サイトとは、英文、日本語訳が入った和訳ファイルを作成、編集、それを元にフラッシュカード(単語帳)を使用して例文などを暗記するのを助けるアプリです。このアプリを使用することで例文やフレーズを暗記するのが楽になります。
        </p>
        <h3>こんな人におすすめ</h3>
        <ul>
          <li>英語の教科書や参考書の例文を覚えなければいけない人</li>
          <li>
            教科書や参考書の本文を日本語訳と1対1対応させた状態で音読やリスニングの訓練をしたい人{' '}
          </li>
          <li>
            web上で単語帳(フラッシュカード)を使って勉強したいけれども著作権などの問題からローカル上に保存したい人
          </li>
        </ul>
      </section>
      <section className="p-2">
        <h2>アプリへのリンク</h2>
        <ul>
          <li>
            <Link href="./app">通常版</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
