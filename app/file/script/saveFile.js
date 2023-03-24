async function saveFile(
  fileData = new DOMParser().parseFromString(
    fixWayakuFile(document.getElementById('file').innerHTML),
    'text/xml'
  )
) {
  const title = fileData.getElementsByClassName('title')[0].innerHTML;
  await downloadWayaku(title, new XMLSerializer().serializeToString(fileData));
}

async function downloadWayaku(fileName, data) {
  const value = (await localforage.getItem('filesData')) || {};
  const fileID = getWayakuFileID(data);
  if (value[fileID]) {
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
}
async function saveWayakuFile(fileHandle, contents) {
  console.info(`${viewHTMLtoArray(contents)[0] + '.wayaku'}というファイルを保存します。`);
  console.trace(fileHandle, contents);
  if (!fileHandle) {
    fileHandle = await createFileHandle(viewHTMLtoArray(contents)[0] + '.wayaku');
  } else {
    console.info('既存ファイルを上書き保存します。');
  }
  // writable作成
  const writable = await fileHandle.createWritable();
  // コンテンツを書き込む
  await writable.write(contents);
  // ファイル閉じる
  await writable.close();
}
async function createFileHandle(fileName = '') {
  return await window.showSaveFilePicker({
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
}
/**
 * ファイル情報を保存します。
 * @param {String} fileName
 * @param {String} fileID
 * @param {String} fileData
 * @param {Object<FileSystemFileHandle>} fileHandle
 * @param {VoidFunction} callback
 */
async function saveFileInfo(fileName, fileID, fileData, fileHandle = null, callback = () => {}) {
  console.debug(fileName, fileID, fileData, fileHandle);
  const value = (await localforage.getItem('filesData')) || {};
  value[fileID] = {
    fileName: fileName,
    fileData: fileData,
    fileHandle: fileHandle,
  };
  await localforage.setItem('filesData', value);
  callback();
}
