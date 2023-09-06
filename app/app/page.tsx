'use client';
import Link from 'next/link';
import { JSX, ClassAttributes, ButtonHTMLAttributes, useState } from 'react';

export default function app() {
  const [fileContent, setFileContent] = useState<string>('');
  return (
    <>
      <header className="print-hidden">
        <nav className="flex bg-main">
          <NabButton title="ファイルを開く">開く</NabButton>
          <NabButton title="英文、日本語訳の色を変更します">表示変更</NabButton>
          <NabButton>保存</NabButton>
          <NabButton title="フラッシュカードをスタート">フラッシュカード</NabButton>
          <NabButton>設定</NabButton>
        </nav>
      </header>
      <main></main>
      <div className="absolute bottom-10 right-10 print:hidden">
        <div className="p-2 m-2 rounded-full bg-gray-100 hover:bg-gray-200 w-20 h-20 justify-center flex items-center">
          <Link href="../help" className="text-black hover:text-center visited:text-center">
            ?
          </Link>
        </div>
      </div>
    </>
  );
}
function NabButton(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button {...props} className="p-4 rounded hover:bg-main-hover" />;
}
