import { wayakuObject } from '../../../@types/wayakuObjectType';
import { objectToString } from './objectToString';

export async function saveWayakuFile(
  wayakuObject: wayakuObject,
  fileHandle?: FileSystemFileHandle
): Promise<FileSystemFileHandle> {
  return new Promise<FileSystemFileHandle>(async (resolve, reject) => {
    try {
      fileHandle =
        fileHandle ||
        (await window.showSaveFilePicker({
          types: [
            {
              description: 'wayakuファイル',
              accept: {
                'application/dxf': ['.wayaku'],
              },
            },
          ],
          suggestedName: (wayakuObject.wayaku.h1['#text'] || '') + '.wayaku',
          excludeAcceptAllOption: true,
        }));
      const writable = await fileHandle.createWritable();
      await writable.write(objectToString(wayakuObject));
      await writable.close();
      resolve(fileHandle);
    } catch (e) {
      reject(e);
    }
  });
}
