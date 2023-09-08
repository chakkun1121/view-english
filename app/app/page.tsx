'use client';
import { useState, useEffect } from 'react';
import { wayakuObject } from '../../@types/wayakuObjectType';
import { AppHeader } from './_components/appHeader';
import { FileHeader } from './_components/FileHeader';
import { Fav } from './_components/fav';
import { HomeMenu } from './_components/homeMenu';
import { openWayakuFile, saveWayakuFile } from './lib/openWayakuFile';

export default function app() {
  const [fileContent, setFileContent] = useState<wayakuObject>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | undefined>(undefined);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  useEffect(() => {
    console.debug(fileContent);
    if (fileHandle) {
      saveWayakuFile(fileContent, fileHandle);
    } else {
      setIsSaved(false);
    }
  }, [fileContent]);
  async function openFile() {
    const { wayakuObject, fileHandle } = await openWayakuFile();
    setFileContent(wayakuObject);
    setFileHandle(fileHandle);
  }
  return (
    <>
      <AppHeader openFile={openFile} IsEditing={isEditing} setIsEditing={setIsEditing} />
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
          </div>
        ) : (
          <HomeMenu openFile={openFile} />
        )}
      </main>
      <Fav />
    </>
  );
}
