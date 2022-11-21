//アナウンス関連
window.alert = view_announce
const announce_main = document.getElementById('announce_main');
let announce_number = 0;
let already_view_message = [];
function check_version() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://tools.chakkun1121haru.repl.co/tools/view english/version.json');
  xhr.onload = () => {
    let responseJson = JSON.parse(xhr.response);
    let server_version = responseJson.now_version;
    server_version = server_version.replace(".", "").replace(".", "");
    if (server_version == now_version.replace(".", "").replace(".", "")) {
      //最新バージョン使用中
    } else if (server_version > now_version.replace(".", "").replace(".", "")) {
      //旧バージョン使用中
      view_announce("旧バージョンを実行しています。<spen onclick='updata()'>こちらから更新してください</spen>")
    } else {
      view_announce("開発バージョンを実行中です。")
    }
  }
  xhr.send();
}
function send_history() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://08170c35-5fc9-4dc9-9807-efce87288564.id.repl.co/wayaku_save_history');
  xhr.onload = () => { }
  xhr.send();
}
function view_announce(message) {
  if (already_view_message.indexOf(message) == -1) {
    already_view_message.push(message)
    let announces_code = document.getElementById('announces').innerHTML;
    announce_number++
    document.getElementById('announces').innerHTML = `${announces_code}
    <div id='announce${announce_number}' class="announce-message">
      <div id='announce_main'>${message}</div>
      <button type="submit" onclick="close_announce(${announce_number})" aria-label="アナウンスを閉じる">×</button>
    </div>`
  } else {
    return ('error 1度表示したメッセージは送信できません。')
  }
}
let closed_announce = [];
function close_announce(close_announce_number) {
  closed_announce.push(document.getElementById('announce_main').innerHTML)//配列にメッセージを追加
  document.getElementById('announce' + close_announce_number).innerHTML = ""
  document.getElementById('announce' + close_announce_number).style.display = "none";
}
function check_announce() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://tools.chakkun1121haru.repl.co/tools/view english/announce.json');
  xhr.onload = () => {
    let responseJson = JSON.parse(xhr.response);
    let announce = responseJson.announce;
    if (announce) {
      if (closed_announce.indexOf(announce) == -1) {
        view_announce(announce);
      }
    }
  }
  xhr.send();
}

