'use client';
import { ClassAttributes, ButtonHTMLAttributes } from 'react';

export function AppHeader({
  openFile,
  IsEditing,
  setIsEditing,
  save,
  setIsShowFlashCards,
}: {
  openFile: () => void;
  IsEditing: boolean;
  setIsEditing: (IsEditing: boolean) => void;
  save: () => Promise<void>;
  setIsShowFlashCards: (isShowFlashCards: boolean) => void;
}) {
  return (
    <header className="print-hidden sticky w-full top-0 left-0 z-30 select-none">
      <nav className="flex bg-main">
        <NabButton title="ファイルを開く" onClick={openFile}>
          開く
        </NabButton>
        <NabButton onClick={() => setIsEditing(!IsEditing)}>
          {IsEditing ? '完了' : '編集'}
        </NabButton>
        <NabButton title="英文、日本語訳の色を変更します">表示変更</NabButton>
        <NabButton onClick={save}>保存</NabButton>
        <NabButton
          title="フラッシュカードをスタート"
          onClick={() => {
            setIsShowFlashCards(true);
          }}
        >
          フラッシュカード
        </NabButton>
        <NabButton>設定</NabButton>
      </nav>
    </header>
  );
}
function NabButton(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button {...props} className="p-4 rounded hover:bg-main-hover" />;
}
