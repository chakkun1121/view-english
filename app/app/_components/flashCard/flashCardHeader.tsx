'use client';
import { AiOutlineClose } from 'react-icons/ai';

export function FlashCardHeader({
  close,
}: {
  close: () => void;
}) {
  return (
    <nav className="flex">
      <h2 className="flex-1">フラッシュカード</h2>
      <button onClick={close} className=" hover:bg-red-300 border rounded p-2 flex-none">
        <AiOutlineClose />
      </button>
    </nav>
  );
}
