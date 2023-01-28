window.onload = init;
let resentObject = 0;
let mode = '';
/**
 * 読み込み時に初期設定をします。
 * @returns
 */
function init() {
  changeColorMode();
  let file = getParam('file');
  if (!file || file == 'undefined') {
    if (!localStorage.getItem('cards')) {
      viewErrorAndClose();
      return;
    }
    file = localStorage.getItem('cards');
    if (!file || file == 'undefined') {
      viewErrorAndClose();
      return;
    }
  }
  cardsArrary = JSON.parse(file).filter(function (s) {
    return s !== '';
  });
  if (cardsArrary.length == 0) {
    viewErrorAndClose();
    return;
  }
  let title = cardsArrary[0];
  document.getElementById('title').innerText = title;
  document.title = title + ' | フラッシュカード | 和訳表示サイト';
  cardsArrary.shift();
  cardsObject = [];
  for (let i = 0; i <= cardsArrary.length - 2; i += 2) {
    cardsObject.push({ en: cardsArrary[i], ja: cardsArrary[i + 1] });
  }
  console.log(cardsObject);
  mode = 'home';
}
/**
 * フラッシュカードをスタートさせる準備をして、viewCardを呼び出します。
 */
function startCards() {
  setSwipe('body');
  mode = 'cards';
  //設定読み込み
  startSettings.style.display = 'none';
  viewCards.style.display = 'block';
  headerRight.innerHTML = `
    <button onclick="nextProblem()" class="next-problem" id="nextProblemButton">次へ</button>
  `;
  headerLeft.innerHTML += `
    <h1><spen id="nowProblemNumber">1</spen>/<spen id="allProblemNumber"></spen></h1>
  `;
  // document.documentElement.requestFullscreen();
  problemSequence = [...Array(cardsObject.length)].map((_, i) => i);
  if (setRondom.checked) {
    problemSequence = arrayShuffle(problemSequence);
  }
  allProblemNumber.innerText = cardsObject.length;
  viewCard(cardsObject[problemSequence[0]]);
}
/**
 * 指定されたobjectのカードを表示します。
 * @param {*} inputObject
 */
function viewCard(inputObject) {
  if (mode != 'cards') return;
  console.log(inputObject);
  answer.innerText = inputObject.en;
  problem.innerText = inputObject.ja;
  document.getElementById('hideAnswer').style.display = 'block';
}
/**
 * 解答を表示します。
 * @returns
 */
function showAnswer() {
  if (mode != 'cards') return;
  document.getElementById('hideAnswer').style.display = 'none';
}
/**
 * 次の問題を出すかを判断し、出す必要があればviewCardを呼び出します。
 * @returns
 */
function nextProblem() {
  if (mode != 'cards') return;
  resentObject++;
  if (cardsObject[problemSequence[resentObject]]) {
    nowProblemNumber.innerText = resentObject + 1;
    viewCard(cardsObject[problemSequence[resentObject]]);
    return;
  } else {
    viewResult();
    return;
  }
}
let beforeCode = '';
/**
 * フラッシュカードを中断する
 */
function stopCard() {
  mode = 'stopCards';
  nextProblemButton.style.display = 'none';
  beforeCode = viewCards.innerHTML;
  viewCards.innerHTML = `
  <p>フラッシュカードは全画面表示でしか表示できません。もしこのまま続ける場合は<a onclick="resumeCards()">こちら</a>を押してください。</p>`;
}
/**
 * フラッシュカードを再開する
 */
function resumeCards() {
  nextProblemButton.style.display = 'block';
  mode = 'cards';
  document.documentElement.requestFullscreen();
  viewCards.innerHTML = beforeCode;
}
/**
 * 結果を表示する
 */
function viewResult() {
  mode = 'result';
  // document.exitFullscreen();
  viewCards.style.display = 'none';
  document.getElementById('viewResult').style.display = 'block';
  headerRight.innerHTML = '';
}
// document.addEventListener("fullscreenchange", () => {
//   if (window.document.fullscreenElement) {
//     console.log("フルスクリーン開始");
//   }
//   else {
//     console.log("フルスクリーン終了");
//     if (mode == "cards") {
//       stopCard()
//     }
//   }
// });
/**
 *スワイプ処理を追加します
 */
function setSwipe(elem) {
  let t = document.querySelector(elem);
  let startX; // タッチ開始 x座標
  let startY; // タッチ開始 y座標
  let moveX; // スワイプ中の x座標
  let moveY; // スワイプ中の y座標
  let dist = 100; // スワイプを感知する最低距離（ピクセル単位）
  t.addEventListener('touchstart', function (e) {
    e.preventDefault();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });
  t.addEventListener('touchmove', function (e) {
    e.preventDefault();
    moveX = e.changedTouches[0].pageX;
    moveY = e.changedTouches[0].pageY;
  });
  t.addEventListener('touchend', function (e) {
    if (startX > moveX && startX > moveX + dist) {
      // 右から左にスワイプ
      nextProblem();
    }
  });
}
/**
 * ダークモード、ライトモードを切り替えます。
 * @returns
 */
function changeColorMode() {
  if (!localStorage.getItem('wayakuSettings')) return;
  const color = JSON.parse(localStorage.getItem('wayakuSettings')).darkmode || false;
  if (color) {
    darkModeCss.href = 'cards/darkmode.css';
  }
}
/**
 * URLパロメーターでの指定されたkeyに対応するvalueを返します。
 * @param {*} name
 * @param {*} url
 * @returns
 */
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
/**
 * 指定された配列をシャッフルします。
 * @param {Array} array
 * @returns {Array}
 */
function arrayShuffle(array) {
  for (var i = array.length - 1; 0 < i; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}
/**
 * タブを閉じれるときは閉じ、できないときはエラーを表示します。
 */
function viewErrorAndClose() {
  window.history.length == 1
    ? window.close()
    : alert('問題が発生しました。もう一度タブを開きなおしてください。');
}
function speech(position = 'answer') {
  //読み上げる文字列を取得
  const speechText = document.getElementById(position).innerText;
  console.log(speechText);
  const uttr = new SpeechSynthesisUtterance();
  uttr.text = speechText;
  uttr.lang = 'en-US';
  // 発言を再生
  window.speechSynthesis.speak(uttr);
}
