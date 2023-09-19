import { wayakuObject } from '../../../@types/wayakuObjectType';
import { objectToString } from './objectToString';

export async function saveWayakuFile(
  wayakuObject: wayakuObject,
  fileHandle?: FileSystemFileHandle
): Promise<FileSystemFileHandle> {
  return new Promise<FileSystemFileHandle>(async (resolve, reject) => {
    if (window.showSaveFilePicker) {
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
    } else {
      const a = document.createElement('a');
      a.download = (wayakuObject.wayaku.h1['#text'] || '') + '.wayaku';
      a.href = URL.createObjectURL(
        new Blob([objectToString(wayakuObject)], { type: 'application/dxf' })
      );
      a.click();
      a.remove();
      resolve(undefined);
    }
  });
}
