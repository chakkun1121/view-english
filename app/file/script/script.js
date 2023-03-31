const appVersion = '4.1.0';
document.getElementById('loading').classList.add('hidden');
window.onload = function () {
  document.getElementById('loading').classList.add('hidden');
  //ifreamから開かれていなかったらエラーを吐き終了(デバック用で一時解除)
  if (window.self === window.top) {
    document.getElementById('error').classList.remove('hidden');
    alert('このページはiframeで開かれていないか、不正なページから開かれています。');
    throw new Error('このページはiframeで開かれていません。');
  }
  window.dispatchEvent(new Event('shortcutInit'));

  document.getElementById('error').classList.add('hidden');
  //ここまで
  // クリエパロメーターからファイルID取得
  const url = new URL(location.href);
  const fileId = url.searchParams.get('fileId');
  // ファイルIDがなかったら新しいタブ用のhtml表示
  if (!fileId) {
    document.getElementById('newTab').classList.remove('hidden');
    return;
  }
  // ファイルIDがあったらファイルを取得
  localforage.getItem('filesData').then(async function (value) {
    value = value || {};
    if (value[fileId]) {
      // ファイルを表示
      const fileData = value[fileId].fileData;
      changeTitle(value[fileId].fileName);
      document.getElementById('file').innerHTML = fileData;
      document.getElementById('file').classList.remove('hidden');
    } else {
      // ファイルがなかったら新しいタブを開きごまかす
      document.getElementById('newTab').classList.remove('hidden');
      console.error('ファイルが見つかりません。');
    }
  });
};

//メッセージを受け取る関数
function receiveMsg(event) {
  //安全のためオリジンをチェックする
  if (event.origin != 'http://localhost' || 'https://chakkun1121.github.io') {
    throw new Error('オリジンが違います。');
  }
  if (event.data.get('colorJson')) {
    changeColor(event.data.get('colorJson'));
  }
  if (event.data.get('fileData')) {
  }
}

window.addEventListener('message', receiveMsg, false);
