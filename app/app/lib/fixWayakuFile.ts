import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { v4 as createUUID } from 'uuid';

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
  //1を対処する
  const fixedWayakuObject = {
    ...brokenWayakuObject,
    wayaku: {
      ['@_fileID']: brokenWayakuObject['@_fileID'] || 'wayakuFile-' + createUUID(),
      ...brokenWayakuObject.wayaku,
      section: brokenWayakuObject.wayaku.section.map((section) => ({
        ...section,
        ['@_sectionID']: section['@_sectionID'] || 'section-' + createUUID(),
      })),
    },
  };
  return builder.build(fixedWayakuObject);
}
