//ファイルを開く
let finished_file_load = false;
let fh_list = {}
async function open_files_from_input() {
  fh_list = await window.showOpenFilePicker({
    types: [{
      description: 'wayakuファイル',
      accept: {
        "application/dxf": [".wayaku"],
      }
    }, {
      description: '和訳HTMLファイル(配布終了ずみだが互換性を保つためにあります。)',
      accept: {
        "text/html": [".html"],
      }
    }],
    excludeAcceptAllOption: true,
    multiple: true
  })
  for (let i = 0; i < fh_list.length; i++) {
    let file = await fh_list[i].getFile();
    let file_name = file.name
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      let file_type = file_name.split('.').pop(); //拡張子取得
      if (file_type == 'html') {
        file_data = html_to_wayaku(reader.result)
        var pos = file_name.lastIndexOf(".");
        file_name = file_name.substr(0, pos < 0 ? file.length : pos) + ".wayaku";
      } else if (file_type == 'wayaku') {
        file_data = reader.result;
      } else {
        console.error('拡張子が違います。')
        view_announce(file_name + 'はhtmlファイルでもwayakuファイルでもありません。')
        return;
      }
      window.localStorage.setItem(file_name, file_data)
      if (tabs_information[resent_tab].title == "新しいタブ") { } else {
        new_tab()
      }
      change_html(file_data, file_name);
    }
    view_front_tab();
  }
}
/**
 *htmlファイルをwayakuファイルに変換します。
 */
function html_to_wayaku(html_file) {
  //改行を消す
  html_file = html_file.replace(/\r?\n/g, '');
  let start = html_file.indexOf('<h1 class="title">')
  html_file = html_file.slice(start);
  let back = html_file.indexOf('</div>')
  html_file = html_file.slice(0, -1 * (html_file.length - back))
  return html_file
}
/**
 * 和訳ファイルを最初にタイトル、その後英文、日本語の順で並ぶ配列を取得します。
 * 
 */
function wayaku_to_arr(wayaku_file) {
  //改行を消す
  wayaku_file = wayaku_file.replace(/\r?\n/g, '');
  //titleを取得
  let title_start = wayaku_file.indexOf('<h1 class="title">') + 18
  let title = wayaku_file.slice(title_start)
  let title_back = title.indexOf('</h1>')
  title = title.slice(0, -1 * (title.length - title_back))
  //本体をfor文で回しながら配列にinする
  let wayaku_main_start = wayaku_file.indexOf('<p class="en">')
  let wayaku_main = wayaku_file.slice(wayaku_main_start)
  wayaku_arrangement = []
  for (let i = 0; ; i++) {
    let en_start = wayaku_main.indexOf('<p class="en">') + 14;
    if (en_start == 13) {
      break;
    }
    wayaku_main = wayaku_main.slice(en_start);
    let en_end = wayaku_main.indexOf('</p>')
    en = wayaku_main.slice(0, -1 * (wayaku_main.length - en_end))
    wayaku_arrangement.push(en)
    i++
    //日本語訳
    let ja_start = wayaku_main.indexOf('<p class="ja">') + 14;
    if (ja_start == 13) {
      break;
    }
    wayaku_main = wayaku_main.slice(ja_start);
    let ja_end = wayaku_main.indexOf('</p>')
    ja = wayaku_main.slice(0, -1 * (wayaku_main.length - ja_end))
    wayaku_arrangement.push(ja)
  }
  wayaku_arrangement = wayaku_arrangement.filter(function(s) {
    return s !== '';
  });
  wayaku_arrangement.unshift(title);
  return wayaku_arrangement;
}

function arr_to_text(arr) {
  let title = arr[0]
  arr.shift()
  return [title, arr.join('\n')]
}

function text_to_arr(title, text) {
  let arr = [title]
  //textを改行をもとに配列へ押し込む
  let push_arr = text.split(/[\n\t]/).filter(function(s) {
    return s !== '';
  })
  arr = arr.concat(push_arr)
  return arr;
}

function arr_to_wayaku(arr) {
  arr = arr.filter(function(s) {
    return s !== '';
  })
  let i = 0
  let title = arr[i]
  let wayaku = '<h1 class="title">' + title + '</h1>'
  i++
  for (; i <= arr.length - 2; i++) {
    let en = arr[i]
    wayaku = wayaku + '<p class="en">' + en + '</p>'
    i++
    let ja = arr[i]
    wayaku = wayaku + '<p class="ja">' + ja + '</p>'
  }
  return wayaku;
}

function arr_to_viewHTML(arr) {
  return arr_to_wayaku(arr)
}

function viewHTML_to_wayaku(tab_number) {
  if (!tab_number) {
    tab_number = resent_tab;
  }
  if (document.getElementById('file' + tab_number)) {
    let viewHTML = document.getElementById('file' + tab_number).innerHTML
    let wayaku_start = viewHTML.indexOf('<h1 class="title">')
    let wayaku = viewHTML.slice(wayaku_start)
    return wayaku
  }
  //編集用
  /*if (!wayaku) {
    const input_ = document.getElementById("input" + tab_number)
    const output = document.getElementById('file' + tab_number)
    input_.style.display = "none";
    output.style.display = "block"
  }*/
}

function edit_to_text(tab_number) {
  title = document.getElementById('edit_title' + tab_number).value
  main = document.getElementById('edit_main_' + tab_number).value
  arr = text_to_arr(title, main)
  viewHTML = arr_to_viewHTML(arr)
  document.getElementById('content' + tab_number).innerHTML = `
  <div id="file${resent_tab}" class="file">${viewHTML}</div>`
  change_tab_name(tab_number, '*' + title + ".wayaku")
  localStorage.setItem(title + '.wayaku', viewHTML)
  //historiesにファイルタイトルを入れる。
  let histories = JSON.parse(localStorage.getItem('histories'))
  if (histories) {
    histories.unshift({
      "title": title + '.wayaku',
      "date": getNowYMD()
    });
    localStorage.setItem('histories', JSON.stringify(histories))
  } else {
    localStorage.setItem('histories', JSON.stringify([{
      "title": title + 'title',
      "date": getNowYMD()
    }]))
  }
}
//ファイル保存
function save_file_as_newfile() {
  let open_file_name = document.getElementById('TAB' + resent_tab).value;
  if (open_file_name.indexOf('*') == 0) {
    open_file_name = open_file_name.slice(1)
    change_tab_name(resent_tab, open_file_name)
  }
  let downdoad_file = localStorage.getItem(open_file_name)
  if (downdoad_file) {
    download_wayaku(open_file_name, downdoad_file)
  } else {
    console.error("ファイルが見つかりません。")
  }
}

function edit_file() {
  let file = viewHTML_to_wayaku()
  if (file) {
    let arr = wayaku_to_arr(file)
    var [title, main] = arr_to_text(arr)
  } else {
    title = '新しいファイル'
    main = '英文、日本語の順に改行して入力してください。(これは必ず消してください。)'
  }
  document.getElementById('content' + resent_tab).innerHTML =
    `
    <div class="edit-file">
  <div class="edit-header">
    <input value="${title}" class="edit-title" id="edit_title${resent_tab}">
    <button class="edit-filish" onclick="edit_to_text(${resent_tab})">完了</button>
  </div>
  <textarea id="edit_main_${resent_tab}" class="edit-main">${main}</textarea>
  </div>`
  document.getElementById('edit_main_' + resent_tab).style.height = document.getElementById(
    'edit_main_' + resent_tab).scrollHeight
}

function new_file() {
  if (tabs_information[resent_tab].title == "新しいタブ") { } else {
    new_tab()
  }
  edit_file()
}
//ドラッグアンドドロップ用

// ドロップ受け付け判定
function f1(event) {
  // ドロップを受け付ける
  event.preventDefault();
}

// ドロップ処理
function f2(event) {
  // ページの遷移を防止
  //（これがないとドラッグ内容の文字列へブラウザが遷移する）
  event.preventDefault();

  // イベントに格納されたファイルを取り出し
  for (let i = 0; i < event.dataTransfer.files.length; i++) {
    const f = event.dataTransfer.files[i];
    // ファイル内容の読み取り
    const reader = new FileReader(); // ファイルを読み取るオブジェクト
    reader.onloadend = function() {
      if (reader.result) {
        let file_name = f.name;
        let file_type = file_name.split('.').pop(); //拡張子取得
        if (file_type == 'html') {
          file_data = html_to_wayaku(reader.result)
          var pos = file_name.lastIndexOf(".");
          file_name = file_name.substr(0, pos < 0 ? file.length : pos) + ".wayaku";
        } else if (file_type == 'wayaku') {
          file_data = reader.result;
        } else {
          console.error('拡張子が違います。')
          view_announce(file_name + 'はhtmlファイルでもwayakuファイルでもありません。')
          return;
        }
        window.localStorage.setItem(file_name, file_data)
        if (tabs_information[resent_tab].title == "新しいタブ") { } else {
          new_tab()
        }
        change_html(file_data, file_name);
      }
    };
    reader.readAsText(f);

  }
}
