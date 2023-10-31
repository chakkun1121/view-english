'use client';
import { VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';
import { CloseButton } from '../CloseButton';

export function FlashCardHeader({
  setIsMinimize,
  isMinimize,
  close,
}: {
  setIsMinimize: (isMinimize: boolean) => void;
  isMinimize: Boolean;
  close: () => void;
}) {
  return (
    <nav className="flex">
      <h2 className="flex-1">フラッシュカード</h2>
      <button
        onClick={() => setIsMinimize(!isMinimize)}
        className=" hover:bg-gray-300 dark:text-white border rounded p-2 flex-none"
      >
        {!isMinimize ? <VscChromeMinimize /> : <VscChromeMaximize />}
      </button>
      <CloseButton close={close} />
    </nav>
  );
}
