function saveFile(
  fileData = new DOMParser().parseFromString(
    fixWayakuFile(document.getElementById('file').innerHTML),
    'text/xml'
  )
) {
  const title = fileData.getElementsByClassName('title')[0].innerHTML;
  downloadWayaku(title, new XMLSerializer().serializeToString(fileData));
}

async function downloadWayaku(fileName, data) {
  localforage.getItem('filesData').then(async function (value) {
    const fileID = getWayakuFileID(data);
    value = value || {};
    if (value[fileID]) {
      console.info('既存ファイルを上書き保存します。');
      const handle = value[fileID].fileHandle;
      await saveWayakuFile(handle, data);
      return;
    } else {
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
  });
}
async function saveWayakuFile(fileHandle, contents) {
  console.debug(fileHandle, contents);
  // writable作成
  const writable = await fileHandle.createWritable();
  // コンテンツを書き込む
  await writable.write(contents);
  // ファイル閉じる
  await writable.close();
}
function saveFileInfo(fileName, fileID, fileData, fileHandle = null, callback = () => {}) {
  console.debug(fileName, fileID, fileData, fileHandle);
  localforage.getItem('filesData').then(function (value) {
    value = value || {};
    value[fileID] = {
      fileName: fileName,
      fileData: fileData,
      fileHandle: fileHandle,
    };
    localforage.setItem('filesData', value, callback);
  });
}
