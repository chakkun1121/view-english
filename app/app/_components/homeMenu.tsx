'use client';
export function HomeMenu({ openFile }: { openFile: () => void }) {
  return (
    <>
      <section>
        <button onClick={openFile}>ファイルを開く</button>
      </section>
    </>
  );
}
