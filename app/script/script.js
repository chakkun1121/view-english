const appEvent = document.getElementById('appEvent');
const appVersion = "4.0.0"
window.onload = function () {
  //表示の準備をする
  for (let i = 0; i < librariesURL.length; i++) {
    const script = document.createElement('script');
    script.setAttribute('src', librariesURL[i]);
    document.head.appendChild(script);
  }
  const addLibrariesList = localStorage.getItem('librariesList')
  if (addLibrariesList) {
    for (let i = 0; i < addLibrariesList.length; i++) {
      const script = document.addLibrariesList('script');
      script.setAttribute('src', librariesURL[i]);
      document.head.appendChild(script);
    }
  }
  const setStart = setInterval(function () {
    if (librariesURL.length == finishedScriptNumber) {
      // 拡張機能の準備のイベント発火
      appEvent.dispatchEvent(new Event('init'))

      //いつでも使用可能になったらローミング画面を消す
      document.getElementById('loading').classList.add('loaded');
      clearInterval(setStart)
      return;
    }
  }, 100)

}
const librariesURL = [
  "script/tab.js",
  "script/header.js",
  "script/wayaku.js",
  "script/wayakuStyle.js"
]
let finishedScriptNumber = 0;