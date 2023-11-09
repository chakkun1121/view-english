import { promises as fsPromises } from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function Page({ params: { title } }) {
  const markdown = await fsPromises.readFile(
    path.join(process.cwd(), 'app/(home)/help/(pages)', title, 'page.mdx'),
    'utf8'
  );
  return <MDXRemote source={markdown} />;
}
export async function generateStaticParams(): Promise<{ title: string }[]> {
  return await fsPromises
    .readdir(path.join(process.cwd(), 'app/(home)/help/(pages)'), { withFileTypes: true })
    .then((paths) => paths.filter((path) => path.isDirectory()))
    .then((paths) => paths.map((path) => ({ title: path.name })));
}
