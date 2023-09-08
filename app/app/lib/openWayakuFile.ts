import { wayakuObject } from '../../../@types/wayakuObjectType';
import { stringToObject } from './stringToObject';
import { fixWayakuFile } from './fixWayakuFile';

export async function openWayakuFile(): Promise<wayakuObject> {
  return new Promise<wayakuObject>(async (resolve, reject) => {
    if (!window.showOpenFilePicker) reject('このブラウザではファイルを開けません。');
    const fhList = await window.showOpenFilePicker({
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
      multiple: true,
    });
    let file = await fhList[0].getFile();
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      resolve(stringToObject(fixWayakuFile(reader.result as string)));
    };
    reader.onerror = reject;
  });
}
