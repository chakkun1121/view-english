'use client';
import { BsQuestion } from 'react-icons/bs';

export function Fav({
  setIsShowHelpPage,
}: {
  setIsShowHelpPage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed bottom-10 right-10 print:hidden select-none w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 z-50 hidden md:block">
      <button
        className="!text-black text-center hover:text-black visited:text-black text-M  w-full h-full"
        onClick={() => setIsShowHelpPage(true)}
      >
        <BsQuestion className="w-full h-full" aria-label="ヘルプ" />
      </button>
    </div>
  );
}
