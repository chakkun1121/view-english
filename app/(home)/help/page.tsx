import Link from 'next/link';
import { getAllHelpPath } from './lib/getAllHelpPath';
import { getHelpData } from './lib/getHelpData';
export default async function Help({ pagePath = 'help' }) {
  const paths: string[] = await getAllHelpPath();
  return (
    <>
      <section>
        <h1>ヘルプ記事一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paths.map(async (path) => {
            const metadata = await getHelpData(path);
            return (
              <Link
                key={path}
                className="bg-main rounded hover:bg-main-hover p-4 text-black hover:text-black visited:text-black"
                href={`/${pagePath}/${path}`}
              >
                <h2 className="line-clamp-2" title={metadata?.title}>
                  {metadata?.title}
                </h2>
                <p className="line-clamp-2" title={metadata?.description}>
                  {metadata?.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
