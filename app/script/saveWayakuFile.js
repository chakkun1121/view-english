function saveWayaku(tabID = tab.openedTab()) {
  const wayakuArrary = viewHTMLtoArray(tab.HTMLcontent.get(tabID));
  const title = arrayToText(viewHTMLtoArray(tab.HTMLcontent.get(tabID)))[0] + '.wayaku';
  const wayakuData = arrayToWayaku(wayakuArrary);
  downloadWayaku(title, wayakuData);
}
async function saveWayakuFile(fileHandle, contents) {
  console.log(contents);
  // writable作成
  const writable = await fileHandle.createWritable();
  // コンテンツを書き込む
  await writable.write(contents);

  // ファイル閉じる
  await writable.close();
}
async function downloadWayaku(fileName, data) {
  const handle = await window.showSaveFilePicker({
    types: [
      {
        description: 'wayakuファイル',
        accept: {
          'text/wayaku': ['.wayaku'],
        },
      },
    ],
    suggestedName: fileName,
  });
  await saveWayakuFile(handle, data);
}

document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="saveWayaku()">保存</button>
`;
finishedScriptNumber++;
