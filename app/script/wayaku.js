/**
 * .html->.wayaku
 * @param {string} HTMLdata 
 * @returns {string} wayakuData
 */
function htmlToWayaku(HTMLdata) {
  //改行を消す
  HTMLdata = HTMLdata.replace(/\r?\n/g, '');
  let start = HTMLdata.indexOf('<h1 class="title">')
  HTMLdata = HTMLdata.slice(start);
  let back = HTMLdata.indexOf('</div>')
  HTMLdata = HTMLdata.slice(0, -1 * (HTMLdata.length - back))
  return HTMLdata
}
/**
 * 和訳ファイルから配列に変換
 * @param {string} stringWayakuData 
 * @returns {Array} arrayWayakuData
 */
function wayakuToArray(stringWayakuData) {
  //改行を消す
  stringWayakuData = stringWayakuData.replace(/\r?\n/g, '');
  //titleを取得
  let titleStart = stringWayakuData.indexOf('<h1 class="title">') + 18
  let title = stringWayakuData.slice(titleStart)
  let titleBack = title.indexOf('</h1>')
  title = title.slice(0, -1 * (title.length - titleBack))
  //本体をfor文で回しながら配列にinする
  let wayakuMainStart = stringWayakuData.indexOf('<p class="en">')
  let wayakuMain = stringWayakuData.slice(wayakuMainStart)
  wayaku_arrangement = []
  for (let i = 0; ; i++) {
    let en_start = wayakuMain.indexOf('<p class="en">') + 14;
    if (en_start == 13) {
      break;
    }
    wayakuMain = wayakuMain.slice(en_start);
    let en_end = wayakuMain.indexOf('</p>')
    en = wayakuMain.slice(0, -1 * (wayakuMain.length - en_end))
    wayaku_arrangement.push(en)
    i++
    //日本語訳
    let jaStart = wayakuMain.indexOf('<p class="ja">') + 14;
    if (jaStart == 13) {
      break;
    }
    wayakuMain = wayakuMain.slice(jaStart);
    let jaEnd = wayakuMain.indexOf('</p>')
    ja = wayakuMain.slice(0, -1 * (wayakuMain.length - jaEnd))
    wayaku_arrangement.push(ja)
  }
  wayaku_arrangement = wayaku_arrangement.filter(function (s) {
    return s !== '';
  });
  wayaku_arrangement.unshift(title);
  return wayaku_arrangement;
}
/**
 * 配列から和訳ファイルに変換
 * @param {Array} arrayWayakuData 
 * @returns {string} stringWayakuData
 */
function arrayToWayaku(arrayWayakuData) {
  arr = arr.filter(function (s) {
    return s !== '';
  })
  let i = 0
  let title = arr[i]
  let wayaku = '<h1 class="title">' + title + '</h1>'
  i++
  for (; i <= arr.length - 2; i++) {
    let en = arr[i]
    wayaku = wayaku + '<p class="en">' + en + '</p>'
    i++
    let ja = arr[i]
    wayaku = wayaku + '<p class="ja">' + ja + '</p>'
  }
  return wayaku;
}
/**
 * 配列から表示用のHTMLに変換
 * @param {Array} arrayWayakuData
 * @returns {Array} viewHTMLwayakuData
 */
function arrayToViewHTML(arrayWayakuData) {
  return arrayToWayaku(arr)
}
/**
 * 表示用のHTMLから配列に変換
 * @param {string} viewHTMLwayakuData 
 * @returns {Array} arrayWayakuData
 */
function viewHTMLtoArray(viewHTMLwayakuData) {
  return wayakuToArray(viewHTMLtoArray)
}
/**
 * タイトルと改行、タブで別れているtextをArrayへ変換します。
 * @param {String} title 
 * @param {String} text 改行、タブ区切りの和訳データ 
 * @returns {Array} arrayWayakuData
 */
function textToArray(title, text) {
  let arr = [title]
  //textを改行をもとに配列へ押し込む
  let push_arr = text.split(/[\n\t]/).filter(function (s) {
    return s !== '';
  })
  arr = arr.concat(push_arr)
  return arr;
}
/**
 * arrayWayakuDataからtitle,本文データ(改行で分割済み)を出力します。
 * @param {Array} arrayWayakuData 
 * @returns {Array} [title,textWayakuData]
 */
function arrayToText(arrayWayakuData) {
  let title = arrayWayakuData[0]
  arrayWayakuData.shift()
  return [title, arrayWayakuData.join('\n')]
}
let fhList = {}
async function openWayakuFile(callback) {
  fhList = await window.showOpenFilePicker({
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
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      callback(reader.result, file.name);
    }
  }
}
/**
 * 拡張子が.wayakuかを判断します。
 * @param {String} fileTitle 
 * @returns 
 */
function isWayakuTitle(fileTitle) {
  return fileTitle.split('.').pop() == "wayaku";
}
finishedScriptNumber++