'use client';
import { useEffect, useState } from 'react';
import { CloseButton } from './CloseButton';
import { getAllHelpPageMetaApiType } from '../../api/getAllHelpPageMeta/route';

export function HelpPage({
  setIsShowHelpPage,
}: {
  setIsShowHelpPage: (isShowHelpPage: boolean) => void;
}) {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [allHelpPageData, setAllHelpPageData] = useState<getAllHelpPageMetaApiType[] | undefined>();
  useEffect(() => {
    async function fetchData() {
      const result = await fetch('api/getAllHelpPageMeta');
      setAllHelpPageData(await result.json());
    }
    fetchData();
  }, []);
  return (
    <div className="absolute top-2 md:top-16 md:bottom-0 right-4 left-4 bottom-16 bg-primary border z-50 rounded p-2">
      <div className="flex">
        <h2 className="flex-1">ヘルプ</h2>
        <CloseButton close={() => setIsShowHelpPage(false)} />
      </div>
      <div>
        {currentPath === '/' ? (
          <>
            {allHelpPageData ? (
              <ul>
                {allHelpPageData.map((data) => (
                  <li key={data.path}>
                    <a
                      onClick={() => {
                        setCurrentPath(data.path);
                      }}
                    >
                      {data.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>読み込み中</p>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
