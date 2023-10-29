'use client';
import { AiOutlineClose } from 'react-icons/ai';
import { VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';

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
        className=" hover:bg-gray-300 border rounded p-2 flex-none"
      >
        {!isMinimize ? <VscChromeMinimize /> : <VscChromeMaximize />}
      </button>
      <button onClick={close} className=" hover:bg-red-300 border rounded p-2 flex-none">
        <AiOutlineClose />
      </button>
    </nav>
  );
}
