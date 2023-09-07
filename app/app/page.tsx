'use client';
import Link from 'next/link';
import { JSX, ClassAttributes, ButtonHTMLAttributes, useState, useEffect } from 'react';
import { openWayakuFile } from './lib/wayaku';
import { wayakuObject } from '../../@types/wayakuObjectType';

export default function app() {
  const [fileContent, setFileContent] = useState<wayakuObject>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  useEffect(() => {
    console.debug(fileContent);
  }, [fileContent]);
  return (
    <>
      <header className="print-hidden sticky w-full top-0 left-0 z-50 select-none">
        <nav className="flex bg-main">
          <NabButton
            title="ファイルを開く"
            onClick={async () => {
              const file = await openWayakuFile();
              setFileContent(file);
            }}
          >
            開く
          </NabButton>
          <NabButton onClick={() => setIsEditing(true)}>編集</NabButton>
          <NabButton title="英文、日本語訳の色を変更します">表示変更</NabButton>
          <NabButton>保存</NabButton>
          <NabButton title="フラッシュカードをスタート">フラッシュカード</NabButton>
          <NabButton>設定</NabButton>
        </nav>
      </header>
      <main className="">
        {fileContent ? (
          <div className="p-4">
            <h1 className="">
              {isEditing ? (
                <>
                  <input
                    className="w-full border"
                    type="text"
                    defaultValue={fileContent.wayaku.h1['#text']}
                    onChange={(e) => {
                      setFileContent({
                        ...fileContent,
                        wayaku: {
                          ...fileContent.wayaku,
                          h1: {
                            ...fileContent.wayaku.h1,
                            '#text': e.target.value,
                          },
                        },
                      });
                    }}
                  />
                </>
              ) : (
                <>{fileContent.wayaku.h1['#text']}</>
              )}
            </h1>
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
                </p>{' '}
              </section>
            ))}
          </div>
        ) : (
          <> </>
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
function NabButton(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button {...props} className="p-4 rounded hover:bg-main-hover" />;
}
