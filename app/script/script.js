const appEvent = document.getElementById('appEvent');
const appVersion = "4.0.0"
window.onload = function () {
  //表示の準備をする
  const setStart = setInterval(function () {
    scriptSetLoopNumber++
    if (librariesURL.length == finishedScriptNumber) {
      // 拡張機能の準備のイベント発火
      appEvent.dispatchEvent(new Event('init'))

      //いつでも使用可能になったらローミング画面を消す
      document.getElementById('loading').classList.add('loaded');
      clearInterval(setStart)
      scriptSetLoopNumber = 0
      return;
    }
    if (finishedScriptNumber != resentScriptNumber) {
      console.log(`${librariesURL[finishedScriptNumber - 1]}の読み込み時間:約${scriptSetLoopNumber / 10}秒`)
      const script = document.createElement('script');
      script.setAttribute('src', librariesURL[finishedScriptNumber]);
      document.head.appendChild(script);
      resentScriptNumber++
      scriptSetLoopNumber = 0
    }
  }, 100)

}
const librariesURL = [
  // index.htmlからのパスを書く
  "script/tab.js",
  "script/header.js",
  "script/wayaku.js",
  "script/wayakuStyle.js",
  "script/updata.js",
  "script/wayakuOperation.js",
  "script/cards.js",
  "script/editWayaku.js",
  "script/settings.js"
]
let finishedScriptNumber = 0;
let resentScriptNumber = -1
let scriptSetLoopNumber = 0