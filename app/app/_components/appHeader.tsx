'use client';
import { ClassAttributes, ButtonHTMLAttributes } from 'react';
import { AiOutlineCheck, AiOutlineDownload, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai';
import { PiCardsThin } from 'react-icons/pi';
import { FiSettings } from 'react-icons/fi';

export function AppHeader({
  openFile,
  IsEditing,
  setIsEditing,
  save,
  setIsShowFlashCards,
  isSaved,
}: {
  openFile: () => void;
  IsEditing: boolean;
  setIsEditing: (IsEditing: boolean) => void;
  save: () => Promise<void>;
  setIsShowFlashCards: (isShowFlashCards: boolean) => void;
  isSaved: boolean;
}) {
  return (
    <header className="print-hidden w-full z-30 select-none flex-none ">
      <nav className="flex bg-main justify-between md:justify-start">
        <NabButton
          title="ファイルを開く"
          onClick={openFile}
          text="開く"
          icon={<AiOutlineUpload />}
        />
        <NabButton
          title={IsEditing ? '編集を完了する' : '編集する'}
          onClick={() => setIsEditing(!IsEditing)}
          text={IsEditing ? '完了' : '編集'}
          icon={IsEditing ? <AiOutlineCheck /> : <AiOutlineEdit />}
        />
        <NabButton
          title="保存"
          onClick={save}
          text={`保存${isSaved ? '済' : ''}`}
          icon={<AiOutlineDownload />}
        />
        <NabButton
          title="フラッシュカードをスタート"
          onClick={() => {
            setIsShowFlashCards(true);
          }}
        >
          <span className="md:block hidden">フラッシュカード</span>
          <PiCardsThin className="md:hidden" />
        </NabButton>
        <NabButton>
          <span className="md:block hidden">設定</span>
          <FiSettings className="md:hidden" />
        </NabButton>
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
