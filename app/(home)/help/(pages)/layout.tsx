import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <Link href="./">ヘルプ記事一覧へ戻る</Link>
      </div>
      <article className="w-full">{children}</article>
    </>
  );
}
