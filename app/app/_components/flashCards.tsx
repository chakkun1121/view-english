'use client';
import { AiOutlineClose } from 'react-icons/ai';
import style from './flashCards.module.css';
export function FlashCards({
  isShowFlashCards,
  setIsShowFlashCards,
}: {
  isShowFlashCards: boolean;
  setIsShowFlashCards: (isShowFlashCards: boolean) => void;
}) {
  return (
    <div
      className={
        style.flashCards +
        ' fixed bottom-0 right-2 left-2 z-40 bg-white border rounded p-2 ' +
        (isShowFlashCards ? style.show + ' top-10' : 'top-full')
      }
    >
      <header className="flex">
        <h2 className="flex-1">フラッシュカード</h2>
        <button
          onClick={() => setIsShowFlashCards(false)}
          className=" hover:bg-red-300 border rounded p-2 flex-none"
        >
          <AiOutlineClose />
        </button>
      </header>
    </div>
  );
}
