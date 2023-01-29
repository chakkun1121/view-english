async function openViewWayaku(tabID) {
  //ファイルを開く
  if (!window.showOpenFilePicker) {
    console.error('showOpenFilePickerが利用できません。和訳表示サイト軽量版をご利用ください。');
    tab.HTMLcontent.change(
      tabID,
      `
      <p class="error red">申し訳ございませんがこのブラウザはサポート対象外となっております。<a href="../lightVersion">和訳表示サイト軽量版</a>をご利用ください。</p>
    `,
      'エラー'
    );
    tab.purpose.change(tabID, 'error');
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
        description: '和訳HTMLファイル(配布終了ずみだが互換性を保つためにあります。)',
        accept: {
          'text/html': ['.html'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: true,
  });
  for (let i = 0; i < fhList.length; i++) {
    let file = await fhList[i].getFile();
    let fileName = file.name;
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      tab.purpose.change(tabID, 'wayakuContent');
      let fileType = fileName.split('.').pop(); //拡張子取得
      let fileData;
      if (fileType == 'html') {
        fileData = htmlToWayaku(reader.result);
        const pos = fileName.lastIndexOf('.');
        fileName = fileName.substr(0, pos < 0 ? file.length : pos) + '.wayaku';
      } else if (fileType == 'wayaku') {
        fileData = reader.result;
      } else {
        console.error('拡張子が違います。');
        return;
      }
      fileData = arrayToViewHTML(wayakuToArray(fileData));
      if (i != 0) {
        // 新しいタブを開き、そこに投げ込む
        tab.new(fileName, fileData, undefined, 'wayakuContent');
        return;
      }
      tab.HTMLcontent.change(tabID, fileData, fileName, 'wayakuContent');
      tab.view(tabID);
    };
  }
}
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

finishedScriptNumber++;
