'use client';
import { AiOutlineCheck, AiOutlineDownload, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai';
import { PiCardsThin } from 'react-icons/pi';
import { FiSettings } from 'react-icons/fi';
import { BiQuestionMark } from 'react-icons/bi';

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
        <NabButton title="保存" onClick={save} text="保存" icon={<AiOutlineDownload />} />
        <NabButton
          title="フラッシュカードをスタート"
          onClick={() => {
            setIsShowFlashCards(true);
          }}
          text="フラッシュカード"
          icon={<PiCardsThin />}
        />
        <NabButton title="設定" text="設定" icon={<FiSettings />} />
        <NabButton
          title="ヘルプ"
          onClick={() => window.open('./help', '_blank')}
          text="ヘルプ"
          icon={<BiQuestionMark />}
        />
      </nav>
    </header>
  );
}
function NabButton({
  title,
  onClick,
  text,
  icon,
}: {
  title?: string;
  onClick?: () => void;
  text?: string;
  icon?: JSX.Element;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-4 rounded hover:bg-main-hover flex items-center"
    >
      {icon}
      <span className="md:block hidden px-2">{text}</span>
    </button>
  );
}
