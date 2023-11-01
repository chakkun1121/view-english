'use client';
import { sectionType, wayakuObject } from '../../../@types/wayakuObjectType';
import { FileHeader } from './FileHeader';
import { BsPlusLg } from 'react-icons/bs';
import { createSection } from '../lib/createSection';
import { useEffect } from 'react';
import { v4 as createUUID } from 'uuid';
import { DelateButton } from './DelateButton';
import { EditingHeader } from './EditingHeader';
import EditableText from '../../_components/editableText';

export function FileContent({
  isEditing,
  fileContent,
  setFileContent,
}: {
  isEditing: boolean;
  fileContent: wayakuObject;
  setFileContent: (wayakuObject: wayakuObject) => void;
}) {
  useEffect(() => {
    if (!fileContent) {
      setFileContent({
        wayaku: {
          '@_fileID': 'wayakuFile-' + createUUID(),
          h1: {
            class: 'title',
            '#text': '',
          },
          section: [createSection()],
        },
      });
    }
  }, [isEditing]);
  function handleChange(text: string, place: 'en' | 'ja', sectionID: string) {
    setFileContent({
      ...fileContent,
      wayaku: {
        ...fileContent.wayaku,
        section: fileContent.wayaku.section.map((section) => {
          if (section['@_sectionID'] === sectionID) {
            return {
              ...section,
              p: section.p.map((p) => {
                if (p['@_class'] === place) {
                  return {
                    ...p,
                    '#text': text,
                  };
                }
                return p;
              }),
            } as sectionType;
          }
          return section;
        }),
      },
    });
  }
  function addSection() {
    setFileContent({
      ...fileContent,
      wayaku: {
        ...fileContent.wayaku,
        section: [...fileContent.wayaku.section, createSection()],
      },
    });
  }
  return (
    <div className="p-4">
      <FileHeader isEditing={isEditing} fileContent={fileContent} setFileContent={setFileContent} />
      {isEditing && <EditingHeader setFileContent={setFileContent} fileContent={fileContent} />}
      {fileContent?.wayaku.section.map((section) => (
        <section key={section['@_sectionID']} className="py-2 flex w-full">
          <div className="flex-1">
            <EditableText
              text={section.p[0]['#text']}
              canEdit={isEditing}
              onChange={(text: string) => handleChange(text, 'en', section['@_sectionID'])}
              placeHolder="英文を入力"
              lang="en"
            />
            <EditableText
              text={section.p[1]['#text']}
              canEdit={isEditing}
              onChange={(text: string) => handleChange(text, 'ja', section['@_sectionID'])}
              placeHolder="日本語訳を入力"
              lang="ja"
            />
          </div>
          {isEditing && (
            <DelateButton
              setFileContent={setFileContent}
              fileContent={fileContent}
              section={section}
            />
          )}
        </section>
      ))}
      {isEditing && (
        <button aria-label="追加" onClick={addSection}>
          <BsPlusLg />
        </button>
      )}
    </div>
  );
}
