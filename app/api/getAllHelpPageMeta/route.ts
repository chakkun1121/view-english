import { NextResponse } from 'next/server';
import { getAllHelpPagePaths, getHelpPageMeta } from '../../(home)/help/page';

export async function GET(_request: Request) {
  const allHelpPagePath = await getAllHelpPagePaths();
  const allHelpPageMeta: getAllHelpPageMetaApiType[] = await Promise.all(
    allHelpPagePath.map(async (path) => {
      const meta = await getHelpPageMeta(path);
      return {
        path,
        ...meta,
      };
    })
  );

  return NextResponse.json(allHelpPageMeta);
}
export interface getAllHelpPageMetaApiType {
  path: string;
  title?: string;
  description?: string;
}
