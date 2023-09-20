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
export default function app() {
  const [fileContent, setFileContent] = useState<wayakuObject | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | undefined>(undefined);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isShowFlashCards, setIsShowFlashCards] = useState<boolean>(false);
  useLeavePageConfirmation(!isSaved);
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
  async function save() {
    try {
      const newFileHandle = await saveWayakuFile(fileContent, fileHandle);
      setFileHandle(newFileHandle);
      setIsSaved(true);
    } catch (e) {
      console.error(e);
    }
  }
  interface WindowWithLaunchQueue extends Window {
    launchQueue?: {
      setConsumer: (callback: ({ files }: { files: FileSystemFileHandle[] }) => void) => void;
    };
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
  useHotkeys(
    'ctrl+e',
    () => {
      setIsEditing(!isEditing);
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    }
  );
  useHotkeys('ctrl+o', openFile, {
    enableOnFormTags: true,
    preventDefault: true,
  });
  useHotkeys(
    'alt+f',
    () => {
      setIsShowFlashCards(true);
    },
    {
      preventDefault: true,
    }
  );
  useHotkeys('f1,ctrl+/', () => open('./help', '_blank'), {
    enableOnFormTags: true,
    preventDefault: true,
  });
  function closeFlashCards() {
    setIsShowFlashCards(false);
  }
  return (
    <div className="flex md:flex-col flex-col-reverse h-full flex-1">
      <AppHeader
        isSaved={isSaved}
        openFile={openFile}
        IsEditing={isEditing}
        setIsEditing={setIsEditing}
        save={save}
        setIsShowFlashCards={setIsShowFlashCards}
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
          close={closeFlashCards}
          fileContent={fileContent}
          setFileContent={setFileContent}
        />
      )}
      <Fav />
    </div>
  );
}
