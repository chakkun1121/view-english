import { NextResponse } from 'next/server';
import { getAllHelpPagePaths } from '../../(home)/help/page';

export async function GET(_request: Request) {
  const allHelpPagePath = await getAllHelpPagePaths();
  return NextResponse.json(allHelpPagePath);
}
