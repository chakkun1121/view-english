'use client';
import { AiOutlineClose } from 'react-icons/ai';

export function CloseButton({ close }: { close: () => void }) {
  return (
    <button
      onClick={close}
      className="hover:bg-red-300 border rounded p-2 flex-none dark:text-white"
    >
      <AiOutlineClose />
    </button>
  );
}
