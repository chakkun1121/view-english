import path from 'path';
import { getHelpPageTitles } from '../lib/getHelpPageTitles';
import { getHelpFileData } from '../lib/getHelpFileData';
import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
export default async function IndividualHelpPage({ params }: { params: { title: string } }) {
  const { title } = params;
  const filePath = path.join(process.cwd(), 'public', 'help', `${title}.md`);
  const data = await getHelpFileData(filePath);
  // mdのheader部分を除去したファイルを準備する
  const renderFile: string = data.file.replace(/^---[\s\S]*?---/, '');
  return (
    <>
      <Link href="./">ヘルプ記事一覧へ戻る</Link>
      <article>
        <h1>{data.title}</h1>
        <ReactMarkdown>{renderFile}</ReactMarkdown>
      </article>
    </>
  );
}
export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const { title } = params;
  const filePath = path.join(process.cwd(), 'public', 'help', `${title}.md`);
  const data = await getHelpFileData(filePath);
  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `/help/${title}`,
    },
  };
}
export async function generateStaticParams(): Promise<{ title: string }[]> {
  const paths = await getHelpPageTitles();
  return paths.map((title) => ({
    title,
  }));
}
