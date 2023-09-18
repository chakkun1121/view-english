import path from 'path';
import { getHelpFileData } from './lib/getHelpFileData';
import { getHelpPageTitles } from './lib/getHelpPageTitles';
import Link from 'next/link';
import { helpFileDataType } from '../../../@types/helpFileDataType';
export const metadata={
    alternates: {
    canonical: '/help',
  },
}
export default async function Help() {
  const helpPageTitles: string[] = await getHelpPageTitles();
  console.debug(helpPageTitles);
  const helpPagesData: helpFileDataType[] = await Promise.all(
    helpPageTitles.map(async (title) => {
      const filePath = path.join(process.cwd(), 'public', 'help', `${title}.md`);
      const data = await getHelpFileData(filePath);
      return data;
    })
  );
  return (
    <>
      <section>
        <h1>ヘルプ記事一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpPagesData.map((data, i) => (
            <Link
              key={i}
              className="bg-main rounded hover:bg-main-hover p-4 text-black hover:text-black visited:text-black"
              href={`help/${helpPageTitles[i]}`}
            >
              <h2 className="line-clamp-2" title={data.title}>
                {data.title}
              </h2>
              <p className="line-clamp-2" title={data.description}>
                {data.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
