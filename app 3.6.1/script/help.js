//ヘルプ画面用
let open_help_tab=null;
function open_help() {
  openURLasNewtab("https://view-english.chakkun1121haru.repl.co/help/")
  return;
  if(open_help_tab){
    close_tab(open_help_tab)
  }
  if (tabs_information[resent_tab].title == "新しいタブ") {
  } else {
    new_tab()
  }
  open_help_tab=resent_tab
  change_tab_name(resent_tab, 'ヘルプ')
  let contents = `<input id="file${resent_tab}" style="display:none">
    <div class="help-app">
      <div id="help_app">読み込み中</div>
    </div>
    <div class="help-keyboad">
      <li>キーボードショートカット(端末によってはスムーズに打たないと反応しません)</li>
      <table style="margin-left: 20px;">
        <tr>
          <th>
            キーボードショートカット
          </th>
          <th>役割</th>
        </tr>
  `
  for (let i = 0; i < keybord_shourcut.length; i++) {
    contents += `
    <tr>
      <td>${keybord_shourcut[i].keys}</td>
      <td>${keybord_shourcut[i].role}</td>
    </tr>`
  }
  contents += `
        </table>
      <p>その他主要webブラウザのショートカットにも対応しています</p>
    </div>
  </div>`
  document.getElementById('content' + resent_tab).innerHTML = contents
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://view-english.chakkun1121haru.repl.co/help/help/index.html');
  xhr.onload = () => {
    document.getElementById('help_app').innerHTML = xhr.response
  }
  xhr.send();
}
const keybord_shourcut = [
  { keys: "f1,ctrl+/,?", role: "ヘルプページを開く" },
  { keys: "ctrl+e", role: "編集" },
  { keys: "ctrl+f", role: "フラッシュカードを開始" },
  { keys: "ctrl+h", role: "履歴表示" },
  { keys: "ctrl+n", role: "新しいファイルを作成" },
  { keys: "ctrl+o", role: "開く" },
  { keys: "ctrl+p", role: "印刷" },
  { keys: "ctrl+s", role: "保存" },
  { keys: "ctrl+t", role: "新しいタブ" },
  { keys: "ctrl+w", role: "タブを閉じる" },
  { keys: "ctrl+tab", role: "次のタブへ(不調)" },
  { keys: "alt+1〜4", role: "ツールバーの1〜4番目を実行(PC版のみ)" },
  { keys: "ctrl+shift+s", role: "上書き保存" },
  { keys: "ctrl+shift+tab", role: "前のタブへ" },

]