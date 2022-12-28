window.onload = function () {
  if (getParam('file')) {
    var defaltFile = getParam('file')//IE11対策のために今は非推奨となったvarを使用せざる負えません。
    document.querySelector('main').innerHTML = defaltFile
  }
}
function loadFile() {
  var file = document.getElementById("file");
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function (e) {
    console.log(e.target.result);
    document.querySelector('main').innerHTML = e.target.result;
  }
  reader.readAsText(file.files[0]);
}
var style = 0;
function changeStyle() {
  var root = document.querySelector(':root');
  if (style == 0) {
    //英文を隠す
    root.style.setProperty("--en-color", 'white');
    root.style.setProperty("--ja-color", "black")
    style = 1;
  } else if (style == 1) {
    //カスタム表示
    var settings_json = JSON.parse(localStorage.getItem('settings'))
    var en_color, ja_color
    if (settings_json) {
      ja_color = settings_json.ja_color
      en_color = settings_json.en_color
    } else {
      ja_color = 'black'
      en_color = '#ffa500'
    }
    root.style.setProperty("--en-color", en_color);
    root.style.setProperty("--ja-color", ja_color)
    style = 2;
  } else {
    root.style.setProperty("--en-color", 'black');
    root.style.setProperty("--ja-color", "black")
    style = 0;
  }
}
//ライブラリ的なもの
//アップデート用
function updata() {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    // 登録されているworkerを全て削除する
    for (var registration of registrations) {
      registration.unregister();
    }
  });
  caches.keys().then(function (keys) {
    var promises = [];
    // キャッシュストレージを全て削除する
    keys.forEach(function (cacheName) {
      if (cacheName) {
        promises.push(caches.devare(cacheName));
      }
    });
  });
  window.location.reload();
}
/*指定したkeyに対応したvalueを返します。*/
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}