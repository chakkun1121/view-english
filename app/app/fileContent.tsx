'use client';
import { wayakuObject } from '../../@types/wayakuObjectType';
import { FileHeader } from './_components/FileHeader';

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
          {fileContent.wayaku.section.map((section) => (
            <section key={section['@_sectionID']} className="py-2">
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
            </section>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
