import path from 'path';
import Link from 'next/link';
import { promises as fsPromises } from 'fs';
export default async function Help() {
  const paths: string[] = await getAllHelpPagePaths();
  return (
    <>
      <section>
        <h1>ヘルプ記事一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paths.map(async (path) => {
            const metadata = await getHelpPageMeta(path);
            return (
              <Link
                key={path}
                className="bg-main rounded hover:bg-main-hover p-4 text-black hover:text-black visited:text-black"
                href={`help/${path}`}
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
export async function getHelpPageMeta(
  title: string
): Promise<{ title?: string; description?: string }> {
  const { metadata }: { metadata: { title?: string; description?: string } } = await import(
    `./(pages)/${title}/page.mdx`
  );
  return metadata;
}
export async function getAllHelpPagePaths(): Promise<string[]> {
  return await fsPromises
    .readdir(path.join(process.cwd(), 'app/(home)/help/(pages)'), { withFileTypes: true })
    .then((paths) => paths.filter((path) => path.isDirectory()))
    .then((paths) => paths.map((path) => path.name));
}
