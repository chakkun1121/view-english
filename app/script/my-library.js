//ライブラリ的なもの
//アップデート用
function updata() {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    // 登録されているworkerを全て削除する
    for (let registration of registrations) {
      registration.unregister();
    }
  });
  caches.keys().then(function(keys) {
    var promises = [];
    // キャッシュストレージを全て削除する
    keys.forEach(function(cacheName) {
      if (cacheName) {
        promises.push(caches.delete(cacheName));
      }
    });
  });
  window.location.reload();
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
function getJSON(url, key) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = () => {
    let responseJson = JSON.parse(xhr.response);
    return (responseJson);
  }
  xhr.send();
}
/*今日の日付をYYYYMMDDの形で取得します。*/
function getNowYMD() {
  const dt = new Date();
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth() + 1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  const result = y + m + d;
  return result;
}
/*和訳ファイルをダウンロードします。*/
function download_wayaku(file_name, data) {
  const blob = new Blob([data], { type: 'application/dxf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = file_name;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
/*指定時間待ちます(これを実行中は他のすべてのコードが実行されなくなります。)*/
function delay(n) {
  return new Promise(function(resolve) {
    setTimeout(resolve, n * 1000);
  });
}
/**
*
  指定時間後に指定した関数を発火させます。待機中には他の操作を実行します。
  @param {number} time 時間を指定
  @param {function} callback 指定時間後に発火させる関数を設定
  @param {number} id timerIDを指定
  @param {string} argument 関数発火時に渡す引数(任意のはず)
*/
function sleep(time, callback, id, argument) {
  eval(`
  let timer${id} = setTimeout(function() {
    clearTimeout(timer${id})
    callback(argument)
  }, time)
  `)
}
function arrayShuffle(array) {
  for(var i = (array.length - 1); 0 < i; i--){

    // 0〜(i+1)の範囲で値を取得
    var r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}
