import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { v4 as createUUID } from 'uuid';
import { wayakuObject } from '../../../@types/wayakuObjectType';
/**
 * .html->.wayaku
 * @param {string} HTMLdata
 * @returns {string} wayakuData
 */
export function htmlToWayaku(HTMLdata: string): string {
  if (!HTMLdata) return;
  //改行を消す
  HTMLdata = HTMLdata.replace(/\r?\n/g, '');
  let start = HTMLdata.indexOf('<h1 class="title">');
  HTMLdata = HTMLdata.slice(start);
  let back = HTMLdata.indexOf('</div>');
  HTMLdata = HTMLdata.slice(0, -1 * (HTMLdata.length - back));
  return HTMLdata;
}
/**
 *
 * @param wayakuData
 * @returns
 */
export function stringToObject(wayakuData: string): wayakuObject {
  if (!wayakuData) return;
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
  });
  return parser.parse(wayakuData) as wayakuObject;
}
export function objectToString(wayakuObject: wayakuObject): string {
  if (!wayakuObject) return;
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  return builder.build(wayakuObject);
}
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

/**
 * 拡張子が.wayakuかを判断します。
 * @param {String} fileTitle
 * @returns
 */
export function isWayakuTitle(fileTitle: string) {
  if (!fileTitle) return;
  return fileTitle.split('.').pop() == 'wayaku';
}
export function fixWayakuFile(fileData: string): string {
  if (!fileData) return;
  if (!fileData.match(/^\<wayaku/)) {
    //ファイル形式が破壊しているので手動修正
    fileData = `<wayaku>${fileData}</wayaku>`;
  }
  //xml
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
  });
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  const brokenWayakuObject = parser.parse(fileData);
  console.log(brokenWayakuObject);
  // 和訳ファイルの破損原因
  // 1. idが付与されていない→適切に付与する
  // 2. sectionがないままpが連続している->pを2つずつsectionでくくる。この際にIDは付与しなくて良い

  // 2を対処する
  if (!brokenWayakuObject.wayaku.section) {
    brokenWayakuObject.wayaku.section = [];
    for (let i = 0; i < brokenWayakuObject.wayaku.p.length; i += 2) {
      brokenWayakuObject.wayaku.section.push({
        p: [brokenWayakuObject.wayaku.p[i], brokenWayakuObject.wayaku.p[i + 1]],
      });
    }
    delete brokenWayakuObject.wayaku.p;
  }
  console.log(brokenWayakuObject);
  //1を対処する
  const fixedWayakuObject = {
    ...brokenWayakuObject,
    ['@_fileID']: brokenWayakuObject['@_fileID'] || createUUID(),
    wayaku: {
      ...brokenWayakuObject.wayaku,
      section: brokenWayakuObject.wayaku.section.map((section) => ({
        ...section,
        ['@_sectionID']: section['@_sectionID'] || createUUID(),
      })),
    },
  };
  console.log(fixedWayakuObject);
  return builder.build(fixedWayakuObject);
}
