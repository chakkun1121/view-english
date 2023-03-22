async function openFile() {
  //ファイルを開く
  if (!window.showOpenFilePicker) {
    console.error('showOpenFilePickerが利用できません。和訳表示サイト軽量版をご利用ください。');
    return;
  }
  const fhList = await window.showOpenFilePicker({
    types: [
      {
        description: 'wayakuファイル',
        accept: {
          'application/dxf': ['.wayaku'],
        },
      },
      {
        description:
          '和訳HTMLファイル(配布終了ずみだが互換性を保つためにあります。そろそろ廃止しますので和訳ファイルに変換してください。)',
        accept: {
          'text/html': ['.html'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: true,
    mode: 'readwrite',
  });
  for (let i = 0; i < fhList.length; i++) {
    let file = await fhList[i].getFile();
    let fileName = file.name;
    const fileContents = await file.text();
    let fileType = fileName.split('.').pop(); //拡張子取得
    let fileData;
    if (fileType == 'html') {
      fileData = htmlToWayaku(fileContents);
      const pos = fileName.lastIndexOf('.');
      fileName = fileName.substr(0, pos < 0 ? file.length : pos) + '.wayaku';
    } else if (fileType == 'wayaku') {
      fileData = fileContents;
    } else {
      console.error('拡張子が違います。');
      return;
    }
    fileData = fixWayakuFile(fileData);
    const fileID = getWayakuFileID(fileData);
    //クリエパロメーターにファイルIDを追加
    const url = new URL(window.location.href);
    url.searchParams.set('fileId', fileID);
    //タイトルを変更
    window.parent.tab.title.change(undefined, fileName); //todo:なぜかファイル名が変更されない
    window.history.replaceState(null, null, url);
    //修理後に上書き保存
    const writable = await fhList[i].createWritable();
    await writable.write(fileData /*⇦書き込む内容*/);
    await writable.close();
    //ファイル情報などを保存
    localforage.getItem('filesData').then(function (value) {
      value = value || {};
      value[fileID] = {
        fileName: fileName,
        fileID: fileID,
        fileData: fileData,
        fileHandle: fhList[i],
      };
      localforage.setItem('filesData', value);
    });
    if (i != 0) {
      //本体にタブを開くよう指示してそこにファイルIDを渡す
      const map = new Map();
      map.set('fileID', fileID);
      window.parent.postMessage(map, '*');
    }
    //ファイルの表示
    document.getElementById('newTab').classList.add('hidden');
    document.getElementById('file').classList.remove('hidden');
    document.getElementById('file').innerHTML = fileData;
  }
}
document.addEventListener('drop', (event) => {
  event.preventDefault();
  var items = event.dataTransfer.items;
  if (items[0].kind == 'file') {
    items[0].getAsFileSystemHandle();
  }
});
async function startOpenFilesFromFileAPI(files) {
  //fileAPIからのファイル取得
  for (const file of files) {
    const blob = await file.getFile();
    blob.handle = file;
    const fileData = await blob.text();
    const fileName = file.name;
    tab.new(fileName, null, null, 'wayakuContent');
    const viewHTMLdata = arrayToViewHTML(wayakuToArray(fileData));
    tab.HTMLcontent.change(tabID, viewHTMLdata);
    tab.view(tab.openedTab());
  }
}
