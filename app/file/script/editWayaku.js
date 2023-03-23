/**
 * ファイルを編集します。
 */
let originalFileID;
function editFile() {
  document.getElementById('file').classList.add('hidden');
  document.getElementById('edit').classList.remove('hidden');
  originalFileID = getWayakuFileID(document.getElementById('file').innerHTML || undefined);
  let title = '',
    main = '';
  let wayakuArrary = viewHTMLtoArray(document.getElementById('file').innerHTML);
  console.log(wayakuArrary);
  if (wayakuArrary) {
    [title, main] = arrayToText(wayakuArrary);
  }
  document.getElementById('editTitle').value = title;
  document.getElementById('editMain').value = main;
}
function finishEdit() {
  const title = document.getElementById('editTitle').value;
  const data = document.getElementById('editMain').value;
  if (!title || !data) {
    console.error('タイトルと本文は必須です。');
    alert('タイトルと本文は必須です。');
    return;
  }
  const wayakuData = fixWayakuFile(arrayToViewHTML(textToArray(title, data)));
  document.getElementById('file').innerHTML = wayakuData;
  document.getElementById('file').classList.remove('hidden');
  document.getElementById('edit').classList.add('hidden');
  changeTitle(title + '.wayaku');
  //ファイル情報などを保存
  const fileID = getWayakuFileID(wayakuData);
  //クリエパロメーターにファイルIDを追加
  changeParam('fileId', fileID);
  localforage.getItem('filesData').then(function (value) {
    const originalFileHandol = originalFileID ? value[originalFileID].fileHandle : undefined;
    saveFileInfo(title, fileID, wayakuData, originalFileHandol, function () {
      saveFile();
    });
  });
}
function cancelEdit() {
  document.getElementById('edit').classList.add('hidden');
  if (!document.getElementById('file').innerText) {
    document.getElementById('newTab').classList.remove('hidden');
  } else {
    document.getElementById('file').classList.remove('hidden');
  }
}
function createFile() {
  document.getElementById('newTab').classList.add('hidden');
  editFile();
}
