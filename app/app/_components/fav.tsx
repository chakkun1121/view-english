'use client';
import Link from 'next/link';

export function Fav() {
  return (
    <div className="fixed bottom-10 right-10 print:hidden select-none">
      <div className="p-2 m-2 rounded-full bg-gray-100 hover:bg-gray-200 w-20 h-20 justify-center flex items-center">
        <Link href="../help" className="text-black hover:text-center visited:text-center">
          ?
        </Link>
      </div>
    </div>
  );
}
