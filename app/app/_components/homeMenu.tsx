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
      <section className="p-2">
        <h1>和訳表示サイト</h1>
        <button
          onClick={openFile}
          className="m-2 p-2 rounded border bg-gray-100 hover:bg-slate-200 block"
        >
          ファイルを開く
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="m-2 p-2 rounded bg-gray-100 hover:bg-gray-200 border block"
        >
          新規作成
        </button>
      </section>
    </>
  );
}
