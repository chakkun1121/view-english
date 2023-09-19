'use client';
import Link from 'next/link';
import { Metadata } from 'next';
import { useEffect } from 'react';
import HomeLayout from './_components/homeLayout';
export const metadata: Metadata = {
  title: '404 Not Found',
  robots: 'noindex',
};
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <>
      <HomeLayout>
        <section className="text-center">
          <h2>エラーが発生しました。</h2>
          <Link href={'/view-english/'}>トップへ戻る</Link>
        </section>
      </HomeLayout>
    </>
  );
}
