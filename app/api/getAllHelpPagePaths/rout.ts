import { NextResponse } from 'next/server';
import { getAllHelpPagePaths } from '../../(home)/help/page';

export async function GET(request: Request) {
  const allHelpPagePath = await getAllHelpPagePaths();
  return NextResponse.json(allHelpPagePath);
}
