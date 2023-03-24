/**
 * ファイルを開く
 * @returns
 */
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
  let i = 0;
  for await (const fileSystemFileHandle of fhList) {
    console.debug(fileSystemFileHandle);
    //todo:一応治ったが、2つ目以降の変更の保存に失敗する
    const file = await fileSystemFileHandle.getFile();
    console.debug(file);
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
    //ファイル情報などを保存
    await saveFileInfo(fileName, fileID, fileData, fileSystemFileHandle);
    if (i == 0) {
      console.debug('ファイルを開きます');
      //クリエパロメーターにファイルIDを追加
      changeParam('fileId', fileID);
      //ファイルの表示
      document.getElementById('newTab').classList.add('hidden');
      document.getElementById('file').classList.remove('hidden');
      document.getElementById('file').innerHTML = fileData;
      //タイトルを変更
      changeTitle(fileName);
    }
    try {
      await saveFile();
    } catch (e) {
      console.error('ファイル保存をキャンセルしました。');
    }
    if (i != 0) {
      console.debug('メッセージを送りつけました');
      //本体にタブを開くよう指示してそこにファイルIDを渡す
      window.parent.postMessage(JSON.stringify({ type: 'fileID', tabID: fileID }), '*');
    }
    i++;
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
/**
 * 本体のタイトルと埋め込み元のタブのタイトルを変更します
 * @param {String} title タイトル
 */
function changeTitle(title) {
  document.title = title + ' | ファイル表示 | 和訳表示サイト | chakkun1121';
  if (window.parent.window === window) return;
  window.parent.tab.title.change(undefined, title);
}
/**
 * クリエパロメーターを変更する
 * @param {String} key クリエパロメーターのキー
 * @param {String} value クリエパロメーターの値
 */
function changeParam(key, value) {
  const url = new URL(location.href);
  url.searchParams.set(key, value);
  history.replaceState(null, null, url);
}
