'use client';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineCheck } from 'react-icons/ai';

export function EditButton({ isEditing, setIsEditing }: { isEditing: boolean; setIsEditing: any }) {
  function Button() {
    return (
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="block select-auto p-2 m-2 border rounded"
        aria-label="編集"
      >
        {isEditing ? <AiOutlineCheck /> : <FiEdit2 />}
      </button>
    );
  }
  return (
    <>
      <div className="flex-none hidden md:block dark:text-white">
        {/* パソコン用 */}
        <Button />
      </div>
      {isEditing && (
        // スマホ用
        <div className="flex-none md:hidden dark:text-white">
          <Button />
        </div>
      )}
    </>
  );
}
