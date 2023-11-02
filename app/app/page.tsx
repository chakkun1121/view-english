'use client';
import { useState, useEffect } from 'react';
import { wayakuObject } from '../../@types/wayakuObjectType';
import { AppHeader } from './_components/appHeader';
import { Fav } from './_components/fav';
import { HomeMenu } from './_components/homeMenu';
import { openWayakuFile } from './lib/openWayakuFile';
import { saveWayakuFile } from './lib/saveWayakuFile';
import { FileContent } from './_components/fileContent';
import { useLeavePageConfirmation } from './lib/useLeavePageConfirmation';
import { stringToObject } from './lib/stringToObject';
import { fixWayakuFile } from './lib/fixWayakuFile';
import { useHotkeys } from 'react-hotkeys-hook';
import { FlashCards } from './_components/flashCard/flashCards';
import SettingsPage from './_components/settingsPage';
import { useRecoilValue } from 'recoil';
import { settingsAtom } from './lib/settings';
export default function app() {
  const [fileContent, setFileContent] = useState<wayakuObject | undefined>();
  const [lastSavedFileContent, setLastSavedFileContent] = useState<wayakuObject | undefined>();
  const shouldSave = fileContent !== lastSavedFileContent;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | undefined>(undefined);
  const [isShowFlashCards, setIsShowFlashCards] = useState<boolean>(false);
  const [isShowSettings, setIsShowSettings] = useState<boolean>(false);
  const settings = useRecoilValue(settingsAtom);
  console.log(isShowSettings);
  useLeavePageConfirmation(shouldSave);
  useEffect(() => {
    if (settings.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.isDarkMode]);
  useEffect(() => {
    console.debug(fileContent);
    if (fileHandle) {
      saveWayakuFile(fileContent, fileHandle);
      setLastSavedFileContent(fileContent);
    }
  }, [fileContent]);
  async function openFile() {
    const { wayakuObject, fileHandle } = await openWayakuFile();
    setFileContent(wayakuObject);
    setFileHandle(fileHandle);
  }
  async function save() {
    try {
      const newFileHandle = await saveWayakuFile(fileContent, fileHandle);
      setFileHandle(newFileHandle);
      setLastSavedFileContent(fileContent);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    const windowWithLaunchQueue = window as WindowWithLaunchQueue;
    windowWithLaunchQueue?.launchQueue?.setConsumer(
      async ({ files }: { files: FileSystemFileHandle[] }) => {
        if (files.length === 1 && files[0].kind === 'file') {
          const fileHandle = files[0];
          let file = await fileHandle.getFile();
          let reader = new FileReader();
          reader.readAsText(file);
          reader.onload = () => {
            setFileContent(stringToObject(fixWayakuFile(reader.result as string)));
            setFileHandle(fileHandle);
          };
        }
      }
    );
  }, []);
  useHotkeys('ctrl+s', save, {
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys('ctrl+e', () => setIsEditing(!isEditing), {
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys('ctrl+o', openFile, {
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys('alt+f', () => setIsShowFlashCards(true), {
    preventDefault: true,
  });
  useHotkeys('f1,ctrl+/', () => open('./help', '_blank'), {
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys('ctrl+,', () => setIsShowSettings(true), {
    enableOnFormTags: true,
    preventDefault: true,
  });
  return (
    <div className="flex md:flex-col flex-col-reverse h-full flex-1 dark:text-white bg-primary">
      <AppHeader
        isSaved={!shouldSave}
        openFile={openFile}
        IsEditing={isEditing}
        setIsEditing={setIsEditing}
        save={save}
        setIsShowFlashCards={setIsShowFlashCards}
        setIsShowSettings={setIsShowSettings}
      />
      <main className="flex-1 overflow-scroll">
        {fileContent || isEditing ? (
          <FileContent
            isEditing={isEditing}
            fileContent={fileContent}
            setFileContent={setFileContent}
          />
        ) : (
          <HomeMenu openFile={openFile} setIsEditing={setIsEditing} />
        )}
      </main>
      {isShowFlashCards && (
        <FlashCards
          wayakuObject={fileContent}
          close={() => setIsShowFlashCards(false)}
          fileContent={fileContent}
          setFileContent={setFileContent}
        />
      )}
      {isShowSettings && (
        <div className="absolute top-2 md:top-16 md:bottom-0 left-2 right-2 bottom-16 bg-primary border z-50 rounded">
          <SettingsPage
            close={() => {
              setIsShowSettings(false);
            }}
          />
        </div>
      )}
      <Fav />
    </div>
  );
}
