'use client';
import Link from 'next/link';
import { BsQuestion } from 'react-icons/bs';

export function Fav() {
  return (
    <div className="fixed bottom-10 right-10 print:hidden select-none w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 z-50">
      <Link
        href="../help"
        target="_blank"
        className="text-black text-center hover:text-black visited:text-black  w-full h-full"
      >
        <BsQuestion className="w-full h-full" aria-label="ヘルプ" />
      </Link>
    </div>
  );
}
