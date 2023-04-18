'use client'; // Error components must be Client components
import { Head } from 'next/document';
import styles from './error.module.scss';
export default function Error({ error }) {
  console.error(error);
  return (
    <>
      <Head>
        <title>エラー|和訳表示サイト</title>
      </Head>
      <h1>エラー</h1>
      <div className={styles['error-message']}>
        <p>エラーが発生しました。エラー内容:{error}</p>
      </div>
    </>
  );
}
