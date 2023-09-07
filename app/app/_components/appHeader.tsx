'use client';
import { ClassAttributes, ButtonHTMLAttributes } from 'react';
import { openWayakuFile } from '../lib/wayaku';

export function AppHeader(setFileContent: any, setIsEditing: (arg0: boolean) => void) {
  return (
    <header className="print-hidden sticky w-full top-0 left-0 z-50 select-none">
      <nav className="flex bg-main">
        <NabButton
          title="ファイルを開く"
          onClick={async () => {
            const file = await openWayakuFile();
            setFileContent(file);
          }}
        >
          開く
        </NabButton>
        <NabButton onClick={() => setIsEditing(true)}>編集</NabButton>
        <NabButton title="英文、日本語訳の色を変更します">表示変更</NabButton>
        <NabButton>保存</NabButton>
        <NabButton title="フラッシュカードをスタート">フラッシュカード</NabButton>
        <NabButton>設定</NabButton>
      </nav>
    </header>
  );
}
function NabButton(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button {...props} className="p-4 rounded hover:bg-main-hover" />;
}
