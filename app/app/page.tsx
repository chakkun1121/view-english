'use client';
import { useState, useEffect } from 'react';
import { wayakuObject } from '../../@types/wayakuObjectType';
import { AppHeader } from './_components/appHeader';
import { Fav } from './_components/fav';
import { HomeMenu } from './_components/homeMenu';
import { openWayakuFile, saveWayakuFile } from './lib/openWayakuFile';
import { FileContent } from './_components/fileContent';

export default function app() {
  const [fileContent, setFileContent] = useState<wayakuObject>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | undefined>(undefined);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<'default' | 'old' | 'table'>('default');
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
      <Fav />
    </>
  );
}
