'use client';
export function HomeMenu({
  openFile,
  setIsEditing,
}: {
  openFile: () => void;
  setIsEditing: (isEditing: boolean) => void;
}) {
  return (
    <>
      <section>
        <button onClick={openFile}>ファイルを開く</button>
        <button onClick={() => setIsEditing(true)}>新規作成</button>
      </section>
    </>
  );
}
