import Link from 'next/link';
import { Metadata } from 'next';
import HomeLayout from './_components/homeLayout';
export const metadata: Metadata = {
  title: '404 Not Found',
  robots: 'noindex',
};
export default function NotFound() {
  return (
    <HomeLayout>
      <section className="text-center">
        <h2>404 Not Found</h2>
        <p>お探しのページは見つかりませんでした</p>
        <Link href={'/view-english/'}>トップへ戻る</Link>
      </section>
    </HomeLayout>
  );
}
