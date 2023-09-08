import { wayakuObject } from '../../../@types/wayakuObjectType';
import { stringToObject } from './stringToObject';
import { fixWayakuFile } from './fixWayakuFile';
import { objectToString } from './objectToString';

export async function openWayakuFile(): Promise<{
  wayakuObject: wayakuObject;
  fileHandle: FileSystemFileHandle;
}> {
  return new Promise<{ wayakuObject: wayakuObject; fileHandle: FileSystemFileHandle }>(
    async (resolve, reject) => {
      if (!window.showOpenFilePicker) reject('このブラウザではファイルを開けません。');
      const [fileHandle]: [FileSystemFileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'wayakuファイル',
            accept: {
              'application/dxf': ['.wayaku'],
            },
          },
          {
            description: '和訳HTMLファイル(配布終了ずみだが互換性を保つためにあります。)',
            accept: {
              'text/html': ['.html'],
            },
          },
        ],
        excludeAcceptAllOption: true,
      });
      let file = await fileHandle.getFile();
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        resolve({
          wayakuObject: stringToObject(fixWayakuFile(reader.result as string)),
          fileHandle,
        });
      };
      reader.onerror = reject;
    }
  );
}
export async function saveWayakuFile(
  wayakuObject: wayakuObject,
  fileHandle: FileSystemFileHandle
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const writable = await fileHandle.createWritable();
      await writable.write(objectToString(wayakuObject));
      await writable.close();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
