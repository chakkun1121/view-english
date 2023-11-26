import { promises as fsPromises } from 'fs';
import path from 'path';
export async function getAllHelpPath(): Promise<Array<string>> {
  return await fsPromises
    .readdir(path.join(process.cwd(), 'public/help/'), { withFileTypes: true })
    .then((paths) => paths.filter((path) => path.isDirectory()))
    .then((paths) => paths.filter((path) => path.name !== 'img'))
    .then((paths) => paths.map((path) => path.name));
}
