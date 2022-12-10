const appEvent = document.getElementById('appEvent');
const appVersion = "4.0.4"
window.onload = function () {
  //表示の準備をする
  const setStart = setInterval(function () {
    scriptSetLoopNumber++
    if (scriptSetLoopNumber >= 50) {
      document.getElementById('loadErrorMessage').innerHTML = `
        読み込みに問題がありますか？もし、ネットが遅いようでしたら和訳表示サイト軽量版をご利用ください。`
    }
    if (librariesURL.length == finishedScriptNumber) {
      // 拡張機能の準備のイベント発火
      appEvent.dispatchEvent(new Event('init'))
      if ('launchQueue' in window && 'files' in LaunchParams.prototype) {
        launchQueue.setConsumer((launchParams) => {
          // Nothing to do when the queue is empty.
          if (!launchParams.files.length) {
            return;
          }
          startOpenFilesFromFileAPI(launchParams.files)
        });
      }      //いつでも使用可能になったらローミング画面を消す
      document.getElementById('loading').classList.add('loaded');
      clearInterval(setStart)
      scriptSetLoopNumber = 0
      return;
    }
    if (finishedScriptNumber != resentScriptNumber) {
      console.log(`${librariesURL[finishedScriptNumber - 1]}の読み込み時間:約${scriptSetLoopNumber / 1000}秒`)
      const script = document.createElement('script');
      script.setAttribute('src', librariesURL[finishedScriptNumber]);
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
  "script/updata.js",
  "script/wayakuOperation.js",
  "script/cards.js",
  "script/editWayaku.js",
  "script/settings.js",
  "script/saveWayakuFile.js",
  "script/print.js"
]
let finishedScriptNumber = 0;
let resentScriptNumber = -1
let scriptSetLoopNumber = 0
