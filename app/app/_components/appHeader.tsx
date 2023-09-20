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
}: {
  openFile: () => void;
  IsEditing: boolean;
  setIsEditing: (IsEditing: boolean) => void;
  save: () => Promise<void>;
  setIsShowFlashCards: (isShowFlashCards: boolean) => void;
}) {
  return (
    <header className="print-hidden w-full z-30 select-none flex-none ">
      <nav className="flex bg-main justify-between md:justify-start">
        <NabButton title="ファイルを開く" onClick={openFile}>
          <span className="md:block hidden">開く</span>
          <AiOutlineUpload className="md:hidden" />
        </NabButton>
        <NabButton onClick={() => setIsEditing(!IsEditing)}>
          <span className="md:block hidden">{IsEditing ? '完了' : '編集'}</span>
          <div className="md:hidden">{IsEditing ? <AiOutlineCheck /> : <AiOutlineEdit />}</div>
        </NabButton>
        {/* <NabButton title="英文、日本語訳の色を変更します">表示変更</NabButton> */}
        <NabButton onClick={save}>
          <span className="md:block hidden">保存</span>
          <AiOutlineDownload className="md:hidden" />
        </NabButton>
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
