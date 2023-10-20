'use client';
import { AiOutlineCheck, AiOutlineDownload, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai';
import { PiCards } from 'react-icons/pi';
import { BiQuestionMark } from 'react-icons/bi';

export function AppHeader({
  openFile,
  IsEditing,
  setIsEditing,
  save,
  isShowFlashCards,
  setIsShowFlashCards,
  isSaved,
}: {
  openFile: () => void;
  IsEditing: boolean;
  setIsEditing: (IsEditing: boolean) => void;
  save: () => Promise<void>;
  isShowFlashCards: boolean;
  setIsShowFlashCards: (isShowFlashCards: boolean) => void;
  isSaved: boolean;
}) {
  return (
    <header className="print-hidden w-full z-30 select-none flex-none ">
      <nav className="flex bg-main justify-between md:justify-start">
        {[
          {
            title: 'ファイルを開く',
            onClick: openFile,
            text: '開く',
            icon: <AiOutlineUpload />,
          },
          {
            title: IsEditing ? '編集を完了する' : '編集する',
            onClick: () => setIsEditing(!IsEditing),
            text: IsEditing ? '完了' : '編集',
            icon: IsEditing ? <AiOutlineCheck /> : <AiOutlineEdit />,
          },
          {
            title: '保存',
            onClick: save,
            text: `保存${isSaved ? '済' : ''}`,
            icon: <AiOutlineDownload />,
          },
          {
            title: `フラッシュカードのを${isShowFlashCards ? '閉じる' : '開く'}`,
            onClick: () => {
              setIsShowFlashCards(!isShowFlashCards);
            },
            text: isShowFlashCards ? '閉じる' : '開く',
            icon: <PiCards />,
          },
          {
            title: 'ヘルプ',
            onClick: () => window.open('./help', '_blank'),
            text: 'ヘルプ',
            icon: <BiQuestionMark />,
          },
        ].map((item, index) => (
          <button
            title={item.title}
            onClick={item?.onClick}
            className="p-4 rounded hover:bg-main-hover flex items-center"
            key={index}
          >
            {item.icon}
            <span className="md:block hidden px-2">{item.text}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
