/**
 * .html->.wayaku
 * @param {string} HTMLdata 
 * @returns {string} wayakuData
 */
function htmlToWayaku(HTMLdata) {
  if (!HTMLdata) return;
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
  if (!stringWayakuData) return;
  if (tab.purpose.get() != "wayakuContent") return;
  const XMLwayakuData = new DOMParser().parseFromString('<wayaku>' + stringWayakuData + '</wayaku>', "text/xml")
  //titleを取得
  const title = XMLwayakuData.getElementsByClassName('title')[0].innerHTML
  //本体をfor文で回しながら配列にinする
  let wayakuArrangement = [title]
  for (let i = 0; i < XMLwayakuData.getElementsByClassName('en').length; i++) {
    wayakuArrangement.push(XMLwayakuData.getElementsByClassName('en')[i].innerHTML.trim())
    wayakuArrangement.push(XMLwayakuData.getElementsByClassName('ja')[i].innerHTML.trim())
  }
  wayakuArrangement = wayakuArrangement.filter(function (s) {
    return s !== '';
  });
  return wayakuArrangement;
}
/**
 * 配列から和訳ファイルに変換
 * @param {Array} arrayWayakuData 
 * @returns {string} stringWayakuData
 */
function arrayToWayaku(arrayWayakuData) {
  if (!arrayWayakuData) return;
  arrayWayakuData = arrayWayakuData.filter(function (s) {
    return s !== '';
  })
  let i = 0
  let title = arrayWayakuData[i]
  let wayaku = '<h1 class="title">' + title + '</h1>'
  i++
  for (; i <= arrayWayakuData.length - 2; i++) {
    let en = arrayWayakuData[i]
    wayaku = wayaku + '<p class="en">' + en + '</p>'
    i++
    let ja = arrayWayakuData[i]
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
  if (!arrayWayakuData) return;
  return `<div class="wayaku-content">${arrayToWayaku(arrayWayakuData)}</div>`
}
/**
 * 表示用のHTMLから配列に変換
 * @param {string} viewHTMLwayakuData 
 * @returns {Array} arrayWayakuData
 */
function viewHTMLtoArray(viewHTMLwayakuData) {
  return wayakuToArray(viewHTMLwayakuData)
}
/**
 * タイトルと改行、タブで別れているtextをArrayへ変換します。
 * @param {String} title 
 * @param {String} text 改行、タブ区切りの和訳データ 
 * @returns {Array} arrayWayakuData
 */
function textToArray(title, text) {
  if (!title || !text) return;
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
  if (!arrayWayakuData) return;
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
  if (!fileTitle) return;
  return fileTitle.split('.').pop() == "wayaku";
}
finishedScriptNumber++