const appEvent = document.getElementById('appEvent');
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
  //タブ表示の拡張機能の準備
  appEvent.dispatchEvent(new Event('setTab'))

  //いつでも使用可能になったらローミング画面を消す
  document.getElementById('loading').classList.add('loaded');
}
const librariesURL = [
  "script/tab.js"
]