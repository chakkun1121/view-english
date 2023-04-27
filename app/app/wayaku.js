'use client';
export default function WayakuContent({ fileID }) {
  //localstrageからファイルの内容を取得
  const fileContent = localStorage.getItem(wayakuFiles[fileID]?.content);
  if (!fileContent) return <FileNotFoundError fileID={fileID} />;
  //ファイルの内容を表示
  return <div id="wayakuContent">{fileContent}</div>;
}
function FileNotFoundError({ fileID }) {
  return (
    <div id="fileNotFoundError">
      <h1 className="error">ファイルが見つかりません</h1>
      <details>
        <summary>詳細</summary>
        <p>指定されたファイルID: {fileID}</p>
      </details>
    </div>
  );
}
