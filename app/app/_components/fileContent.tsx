'use client';
import { sectionType, wayakuObject } from '../../../@types/wayakuObjectType';
import { FileHeader } from './FileHeader';
import { BsPlusLg, BsTrash } from 'react-icons/bs';
import { createSection } from '../lib/createSection';

export function FileContent({
  isEditing,
  fileContent,
  setFileContent,
  editMode,
}: {
  isEditing: boolean;
  fileContent: wayakuObject;
  setFileContent: (wayakuObject: wayakuObject) => void;
  editMode: 'default' | 'old' | 'table';
}) {
  return (
    <div className="p-4">
      <FileHeader isEditing={isEditing} fileContent={fileContent} setFileContent={setFileContent} />
      {!isEditing || editMode === 'default' ? (
        <>
          {isEditing ? (
            <button
              aria-label="追加"
              onClick={() => {
                setFileContent({
                  ...fileContent,
                  wayaku: {
                    ...fileContent.wayaku,
                    section: [createSection(), ...fileContent.wayaku.section],
                  },
                });
              }}
            >
              <BsPlusLg />
            </button>
          ) : (
            <></>
          )}
          {fileContent.wayaku.section.map((section) => (
            <section key={section['@_sectionID']} className="py-2 flex w-full">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    className="w-full border"
                    defaultValue={section.p[0]['#text']}
                    onChange={(e) => {
                      setFileContent({
                        ...fileContent,
                        wayaku: {
                          ...fileContent.wayaku,
                          section: fileContent.wayaku.section.map((s) => {
                            if (s['@_sectionID'] === section['@_sectionID']) {
                              return {
                                ...s,
                                p: [
                                  {
                                    ...s.p[0],
                                    '#text': e.target.value,
                                  },
                                  s.p[1],
                                ],
                              };
                            }
                            return s;
                          }),
                        },
                      });
                    }}
                  />
                ) : (
                  <p lang="en" className="">
                    {section.p[0]['#text']}
                  </p>
                )}
                {isEditing ? (
                  <input
                    className="w-full border"
                    defaultValue={section.p[1]['#text']}
                    onChange={(e) => {
                      setFileContent({
                        ...fileContent,
                        wayaku: {
                          ...fileContent.wayaku,
                          section: fileContent.wayaku.section.map((s) => {
                            if (s['@_sectionID'] === section['@_sectionID']) {
                              return {
                                ...s,
                                p: [
                                  s.p[0],
                                  {
                                    ...s.p[1],
                                    '#text': e.target.value,
                                  },
                                ],
                              };
                            }
                            return s;
                          }),
                        },
                      });
                    }}
                  />
                ) : (
                  <p lang="ja" className="">
                    {section.p[1]['#text']}
                  </p>
                )}
              </div>
              {isEditing ? (
                <DelateButton
                  setFileContent={setFileContent}
                  fileContent={fileContent}
                  section={section}
                />
              ) : (
                <></>
              )}
            </section>
          ))}
          {isEditing ? (
            <button
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
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
function DelateButton({
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
