import matter from 'gray-matter';
import fsPromises from 'fs/promises';
import path from 'path';
import { helpType } from '../../../../@types/helpType';

export async function getHelpData(helpPath: string): Promise<getArticleDataProps> {
  console.debug('helpPath', helpPath);
  helpPath = helpPath.replace(/\.mdx$/, '');
  const file = await fsPromises.readFile(
    path.join(process.cwd(), 'public', 'help', helpPath, 'page.mdx'),
    'utf-8'
  );
  const { data } = matter(file) as unknown as { data: helpType };
  return { ...data, file };
}
interface getArticleDataProps extends helpType {
  file: string; // 記事のファイルの中身
}
