'use client';
import { AiOutlineCheck, AiOutlineDownload, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai';
import { PiCards } from 'react-icons/pi';
import { BiQuestionMark } from 'react-icons/bi';
import { HeaderUserMenu } from '../../(home)/_components/headerUserMenu';
import { CiSettings } from 'react-icons/ci';

export function AppHeader({
  openFile,
  IsEditing,
  setIsEditing,
  save,
  setIsShowFlashCards,
  isSaved,
  setIsShowSettings,
}: {
  openFile: () => void;
  IsEditing: boolean;
  setIsEditing: (IsEditing: boolean) => void;
  save: () => Promise<void>;
  setIsShowFlashCards: (isShowFlashCards: boolean) => void;
  isSaved: boolean;
  setIsShowSettings: (isShowSettings: boolean) => void;
}) {
  return (
    <header className="print-hidden w-full z-30 select-none flex-none ">
      <nav className="flex bg-main flex-auto">
        <div className="flex  justify-between md:justify-start flex-auto  md:flex-1">
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
              title: 'フラッシュカードをスタート',
              onClick: () => {
                setIsShowFlashCards(true);
              },
              text: 'フラッシュカード',
              icon: <PiCards />,
            },
            {
              title: '設定',
              onclick: () => setIsShowSettings(true),
              text: '設定',
              icon: <CiSettings />,
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
        </div>
        <HeaderUserMenu />
      </nav>
    </header>
  );
}
