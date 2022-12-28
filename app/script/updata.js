document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="updata()">アプリの手動更新</button>
`
//アップデート用
function updata() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      // 登録されているworkerを全て削除する
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
  caches.keys().then(function (keys) {
    var promises = [];
    // キャッシュストレージを全て削除する
    keys.forEach(function (cacheName) {
      if (cacheName) {
        promises.push(caches.delete(cacheName));
      }
    });
  });
  window.location.reload();
}
finishedScriptNumber++