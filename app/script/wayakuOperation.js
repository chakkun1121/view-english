async function openViewWayaku(tabID) {
  //ファイルを開く
  const fhList = await window.showOpenFilePicker({
    types: [{
      description: 'wayakuファイル',
      accept: {
        "application/dxf": [".wayaku"],
      }
    }, {
      description: '和訳HTMLファイル(配布終了ずみだが互換性を保つためにあります。)',
      accept: {
        "text/html": [".html"],
      }
    }],
    excludeAcceptAllOption: true,
    multiple: true
  })
  for (let i = 0; i < fhList.length; i++) {
    let file = await fhList[i].getFile();
    let fileName = file.name
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let fileType = fileName.split('.').pop(); //拡張子取得
      if (fileType == 'html') {
        fileData = htmlToWayaku(reader.result)
        var pos = fileName.lastIndexOf(".");
        fileName = fileName.substr(0, pos < 0 ? file.length : pos) + ".wayaku";
      } else if (fileType == 'wayaku') {
        fileData = reader.result;
      } else {
        console.error('拡張子が違います。')
        return;
      }
      fileData = arrayToViewHTML(wayakuToArray(fileData))
      if (i != 0) {
        // 新しいタブを開き、そこに投げ込む
        tab.new(fileName, fileData)
        return;
      }
      tab.viewHTMLcontent(tabID, fileData, fileName)
      tab.view(tabID)
    }
  }
}
finishedScriptNumber++