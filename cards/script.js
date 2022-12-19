window.onload = init;
let finishedScriptNumber
let mode = ""
//読み込み時
function init() {
  // changeColorMode()
  let file = getParam('file')
  if (!file || file == "undefined") {
    if (!localStorage.getItem('cards')) {
      alert('もう一度フラッシュカードを開いてください。')
      window.close()
      return;
    }
    file = localStorage.getItem('cards')
  }
  cardsArrary = JSON.parse(file)
  cardsArrary = cardsArrary.filter(function (s) { return s !== ''; })
  if (cardsArrary.length == 0) {
    window.close()
    return;
  }
  let title = cardsArrary[0]
  document.getElementById('title').innerHTML = title
  cardsArrary.shift()
  //for文を回して英文と日本語がセットのオブジェクト型に変更
  cardsObject = []
  for (let i = 0; i <= cardsArrary.length - 2; i += 2) {
    cardsObject.push({ 'en': cardsArrary[i], 'ja': cardsArrary[i + 1] })
  }
  console.log(cardsObject)
  mode = "home"
}
function start_cards() {
  setSwipe("#body")
  mode = "cards"
  //設定読み込み
  document.getElementById('start_settings').style.display = "none";
  document.getElementById('view_cards').style.display = "block";
  document.getElementById('header_right').innerHTML = `
    <button onclick="next_problem()" class="next-problem">次へ</button>
  `
  document.getElementById('header_left').innerHTML += `
      <h1><spen  id="now_problem_number">1</spen>/<spen id="all_problem_number"></spen></h1>
`
  document.documentElement.requestFullscreen();
  //実際に出す順番にしたobject配列をセット
  problem_sequence = []
  for (let i = 0; i < cardsObject.length; i++) {
    problem_sequence.push(i)
  }
  if (document.getElementById('set_rondom').checked) {
    problem_sequence = arrayShuffle(problem_sequence)
  }
  resent_object = 0
  document.getElementById('all_problem_number').innerText = cardsObject.length;
  // 1問目をview_cardに投げ飛ばす
  view_card(cardsObject[problem_sequence[0]])
}
function view_card(input_object) {
  console.log(input_object)
  document.getElementById('answer').style.color = 'white';
  document.getElementById('answer').innerText = input_object.en
  document.getElementById('problem').innerText = input_object.ja
}
function next_problem() {
  //次に問題を出すか出さないか判断
  resent_object++
  if (cardsObject[problem_sequence[resent_object]]) {
    //出すならview_cardに投げ飛ばす
    document.getElementById('now_problem_number').innerText = resent_object + 1
    view_card(cardsObject[problem_sequence[resent_object]])
    return;
  } else {
    //出さないなら結果表示
    view_result()
    return;
  }
}
let before_code = ""
function stop_card() {
  before_code = document.getElementById('view_cards').innerHTML
  document.getElementById('view_cards').innerHTML = `
  <p>フラッシュカードは全画面表示でしか表示できません。もしこのまま続ける場合は<a onclick="resume_cards()">こちら</a>を押してください。</p>`
}
function resume_cards() {
  document.documentElement.requestFullscreen();
  document.getElementById('view_cards').innerHTML = before_code
}
function view_result() {
  mode = "result"
  document.exitFullscreen();
  document.getElementById('view_cards').style.display = "none";
  document.getElementById('view_result').style.display = "block"
  document.getElementById('header_right').innerHTML = ""
}
document.addEventListener("fullscreenchange", () => {
  if (window.document.fullscreenElement) {
    console.log("フルスクリーン開始");
  }
  else {
    console.log("フルスクリーン終了");
    if (mode == "cards") {
      stop_card()
    }
  }
});
/**
*スワイプ処理を追加します
*/
function setSwipe(elem) {
  let t = document.querySelector(elem);
  let startX;		// タッチ開始 x座標
  let startY;		// タッチ開始 y座標
  let moveX;	// スワイプ中の x座標
  let moveY;	// スワイプ中の y座標
  let dist = 100;	// スワイプを感知する最低距離（ピクセル単位）

  // タッチ開始時： xy座標を取得
  t.addEventListener("touchstart", function (e) {
    e.preventDefault();
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  });

  // スワイプ中： xy座標を取得
  t.addEventListener("touchmove", function (e) {
    e.preventDefault();
    moveX = e.changedTouches[0].pageX;
    moveY = e.changedTouches[0].pageY;
  });

  // タッチ終了時： スワイプした距離から左右どちらにスワイプしたかを判定する/距離が短い場合何もしない
  t.addEventListener("touchend", function (e) {
    if (startX > moveX && startX > moveX + dist) {		// 右から左にスワイプ
      next_problem();

    }
    else if (startX < moveX && startX + dist < moveX) {	// 左から右にスワイプ
    }
  });
}
function changeColorMode(color) {
  if (!color) {
    color = JSON.parse(localStorage.getItem('settings')).darkmode
  }
  if (color == "black" || color === true) {
    document.getElementById("darkModeCss").href = "cards/darkmode.css"
  } else {
    document.getElementById("darkModeCss").href = "404.css"//←見つからないが、問題なし
  }
}
/*指定したkeyに対応したvalueを返します。*/
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function arrayShuffle(array) {
  for (var i = (array.length - 1); 0 < i; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}