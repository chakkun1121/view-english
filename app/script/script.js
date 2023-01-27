const appEvent = document.getElementById('appEvent');
const appVersion = "4.1.0"
window.onload = function () {
  const useLibraryURLs = localStorage.getItem('wayakuExtensions') ? librariesURL.concat(JSON.parse(localStorage.getItem('wayakuExtensions'))) : librariesURL
  console.log(useLibraryURLs)
  //表示の準備をする
  const setStart = setInterval(function () {
    scriptSetLoopNumber++
    if (scriptSetLoopNumber >= 50) {
      document.getElementById('loadErrorMessage').innerHTML = `
        読み込みに問題がありますか？もし、ネットが遅いようでしたら<a href="../lightVersion">和訳表示サイト軽量版</a>をご利用ください。もし、ネット状態が良くても起動しない際は<a href="#" onclick="resetApp()">こちら</a>からアプリをリセットしてみてください。`
    }
    if (useLibraryURLs.length == finishedScriptNumber) {
      // 拡張機能の準備のイベント発火
      creatEvent('init')
      if ('launchQueue' in window && 'files' in LaunchParams.prototype) {
        launchQueue.setConsumer((launchParams) => {
          // Nothing to do when the queue is empty.
          if (!launchParams.files.length) {
            return;
          }
          startOpenFilesFromFileAPI(launchParams.files)
        });
      }
      //いつでも使用可能になったらローミング画面を消す
      document.getElementById('loading').classList.add('loaded');
      clearInterval(setStart)
      scriptSetLoopNumber = 0
      return;
    }
    if (finishedScriptNumber != resentScriptNumber) {
      console.log(`${useLibraryURLs[finishedScriptNumber - 1]}の読み込み時間:約${scriptSetLoopNumber / 1000}秒`)
      const script = document.createElement('script');
      script.setAttribute('src', useLibraryURLs[finishedScriptNumber]);
      document.head.appendChild(script);
      resentScriptNumber++
      scriptSetLoopNumber = 0
    }
  }, 1)
}
const librariesURL = [
  // index.htmlからのパスを書く
  "script/keyshortcut.js",
  "script/tab.js",
  "script/header.js",
  "script/wayaku.js",
  "script/wayakuStyle.js",
  "script/wayakuOperation.js",
  "script/cards.js",
  "script/editWayaku.js",
  "script/settings.js",
  "script/saveWayakuFile.js",
  "script/print.js",
  "script/updata.js",
  "script/resetApp.js"
]
let finishedScriptNumber = 0;
let resentScriptNumber = -1
let scriptSetLoopNumber = 0
/**
 * イベントを作成して発火させます。
 * @param {String} type 
 * @returns 成功時にtrue、失敗時にfalseを返します。
 */
function creatEvent(type) {
  if (!type) return false;
  appEvent.dispatchEvent(new Event(type))
  return true;
}
/**
 * イベントリスナーを追加します。(appEventに追加します)
 * @param {String} type 
 * @param {callback} callback 
 * @param {*} isDeleate 
 * @returns 成功時にtrue、失敗時にfalseを返します。
 */
function creatEventListener(type, callback, isDeleate = false) {
  if (!type) return false;
  appEvent.addEventListener(type, callback)
  return true;
}
