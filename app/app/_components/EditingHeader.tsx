'use client';
import { sectionType, wayakuObject } from '../../../@types/wayakuObjectType';
import { BsPlusLg, BsClipboard } from 'react-icons/bs';
import { createSection } from '../lib/createSection';

export function EditingHeader({
  setFileContent,
  fileContent,
}: {
  setFileContent: (wayakuObject: wayakuObject) => void;
  fileContent: wayakuObject;
}) {
  return (
    <div className="flex">
      <button
        className="p-2 border bg-gray-100 hover:bg-slate-200"
        aria-label="追加"
        onClick={() => {
          setFileContent({
            ...fileContent,
            wayaku: {
              ...fileContent.wayaku,
              section: [...fileContent.wayaku.section, createSection()],
            },
          });
        }}
      >
        <BsPlusLg />
      </button>
      <button
        className="p-2 border bg-gray-100 hover:bg-gray-200"
        onClick={async () => {
          // クリップボードから読み込み
          const text: string = await window.navigator.clipboard.readText();
          const wayakuArray: string[] = text.split(/[\n\t]/g).filter((s) => s !== '');
          const sections: sectionType[] = [];
          for (let i = 0; i < wayakuArray.length; i += 2) {
            sections.push(createSection(wayakuArray[i], wayakuArray[i + 1]));
          }
          setFileContent({
            ...fileContent,
            wayaku: {
              ...fileContent.wayaku,
              section: [...sections, ...fileContent.wayaku.section],
            },
          });
        }}
      >
        <BsClipboard />
        クリップボードからインポート
      </button>
    </div>
  );
}
