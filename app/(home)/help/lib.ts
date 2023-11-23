import { promises as fsPromises } from 'fs';
import path from 'path';
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
