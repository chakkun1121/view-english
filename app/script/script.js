const appEvent = document.getElementById('appEvent');
window.onload = function () {
  //表示の準備をする
  //タブ表示の拡張機能の準備
  appEvent.dispatchEvent(new Event('setTab'))

  //いつでも使用可能になったらローミング画面を消す
  document.getElementById('loading').classList.add('loaded');
}