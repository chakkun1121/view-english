'use client';
import { sectionType, wayakuObject } from '../../../@types/wayakuObjectType';
import { BsTrash } from 'react-icons/bs';

export function DelateButton({
  setFileContent,
  fileContent,
  section,
}: {
  setFileContent: (wayakuObject: wayakuObject) => void;
  fileContent: wayakuObject;
  section: sectionType;
}) {
  return (
    <button
      aria-label="削除"
      className="flex-none p-2 border bg-gray-100 hover:bg-slate-200"
      onClick={() => {
        setFileContent({
          ...fileContent,
          wayaku: {
            ...fileContent.wayaku,
            section: fileContent.wayaku.section.filter(
              (s) => s['@_sectionID'] !== section['@_sectionID']
            ),
          },
        });
      }}
    >
      <BsTrash />
    </button>
  );
}
