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
import { FlashCards } from './_components/flashCards';
export default function app() {
  const [fileContent, setFileContent] = useState<wayakuObject>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | undefined>(undefined);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<'default' | 'old' | 'table'>('default');
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
  return (
    <>
      <AppHeader
        openFile={openFile}
        IsEditing={isEditing}
        setIsEditing={setIsEditing}
        save={save}
        setIsShowFlashCards={setIsShowFlashCards}
      />
      <main className="">
        {fileContent || isEditing ? (
          <FileContent
            isEditing={isEditing}
            fileContent={fileContent}
            setFileContent={setFileContent}
            editMode={editMode}
          />
        ) : (
          <HomeMenu openFile={openFile} setIsEditing={setIsEditing} />
        )}
      </main>
      <FlashCards isShowFlashCards={isShowFlashCards} setIsShowFlashCards={setIsShowFlashCards} />
      <Fav />
    </>
  );
}
