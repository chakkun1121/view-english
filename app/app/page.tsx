'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { openWayakuFile } from './lib/wayaku';
import { wayakuObject } from '../../@types/wayakuObjectType';
import { AppHeader } from './_components/appHeader';
import { FileHeader } from './_components/FileHeader';

export default function app() {
  const [fileContent, setFileContent] = useState<wayakuObject>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  useEffect(() => {
    console.debug(fileContent);
  }, [fileContent]);
  return (
    <>
      <AppHeader setFileContent={setFileContent} IsEditing={isEditing} setIsEditing={setIsEditing} />
      <main className="">
        {fileContent ? (
          <div className="p-4">
            <FileHeader
              isEditing={isEditing}
              fileContent={fileContent}
              setFileContent={setFileContent}
            />
            {fileContent.wayaku.section.map((section) => (
              <section key={section['@_sectionID']} className="py-2">
                <p lang="en">
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
                    <>{section.p[0]['#text']}</>
                  )}
                </p>
                <p lang="en">
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
                    <>{section.p[1]['#text']}</>
                  )}
                </p>
              </section>
            ))}
          </div>
        ) : (
          <>
            <section>
              <button
                onClick={async () => {
                  const file = await openWayakuFile();
                  setFileContent(file);
                }}
              >
                ファイルを開く
              </button>
            </section>
          </>
        )}
      </main>
      <div className="fixed bottom-10 right-10 print:hidden select-none">
        <div className="p-2 m-2 rounded-full bg-gray-100 hover:bg-gray-200 w-20 h-20 justify-center flex items-center">
          <Link href="../help" className="text-black hover:text-center visited:text-center">
            ?
          </Link>
        </div>
      </div>
    </>
  );
}
