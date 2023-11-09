import { promises as fsPromises } from 'fs';
import path from 'path';
import { getAllHelpPagePaths } from '../../../(home)/help/page';
export async function GET(request: Request, { params }: { params: { path: string } }) {
  console.log(params.path);
  try {
    const content = await fsPromises.readFile(
      path.join(process.cwd(), 'app/(home)/help/(pages)', params?.path, 'page.mdx'),
      'utf-8'
    );
    console.log(content);
    return new Response(content, {
      headers: {
        'content-type': 'text/plain',
        encoding: 'UTF-8',
      },
    });
  } catch (error) {
    return new Response(error.message, {
      status: 500,
    });
  }
}
export async function generateStaticParams(): Promise<{ path: string }[]> {
  const allHelpPagePath = await getAllHelpPagePaths();
  return allHelpPagePath.map((path) => ({ path }));
}
