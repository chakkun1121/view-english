const now_version = "3.6.1";//<-少しでも公式バージョンにしたあとに変更があれば変える
window.onload = init;
//読み込み時
function init() {
  //ダークモードなら変更
  changeColorMode();
  //読み込み中ページを閉じる  
  document.getElementById('main_contents').style.display = "block";
  document.getElementById('loader_main').style.display = "none";
  document.title = "和訳表示サイト v" + now_version
  //対応ブラウザか確認
  var userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('chrome') !== -1) {
    browser = "Google Chrome";
  } else {
    view_announce('サポート対象外のブラウザ(chrome以外)をお使いのようです。できれば<a href="https://google.com/chrome" target="_target">chrome</a>を使用してください。')
  }
  //fileAPI対応か確認
  if ('launchQueue' in window) {
    console.log('File Handling API is supported!');
    launchQueue.setConsumer(launchParams => {
      handleFiles(launchParams.files);
    });
  } else {
    console.error('File Handling API is not supported!');
    view_announce("ファイルAPI非対応です。<a href='https://chrome.com/' target='_target'>chrome</a>で開いてください。")
  } document.getElementById('main_contents').innerHTML = ""
  new_tab();
  check_version();
  check_announce();
  send_history();
  setInterval(check_announce, 60000);
  //fileAPIからのファイル取得
  async function handleFiles(files) {
    for (const file of files) {
      const blob = await file.getFile();
      blob.handle = file;
      const text = await blob.text();
      window.localStorage.setItem(file.name, text)
      if (tabs_information[resent_tab].title == "新しいタブ") {
      } else {
        new_tab()
      }
      change_html(text, file.name)
    }
  }
  //urlでのモート、ファイル設定を確認
  const url_mode = getParam('mode')
  if (url_mode == 'help') {
    open_help();
  }
  if (url_mode == "settings") {
    open_settings()
  }
  const url_file = getParam('file')
  if (url_file) {
    const title = getParam('title')
    if (title) {
      localStorage.setItem(title, url_file)
    }
    change_html(url_file, title)
    return;
  }
  const url_title = getParam('title');
  if (url_title) {
    if (tabs_information[resent_tab].title == "新しいタブ") { } else {
      new_tab()
    }
    if (localStorage.getItem(url_title)) {
      change_html(localStorage.getItem(url_title), url_title)
    }
  }
}
//アプリページに更新
function change_html(file, title) {
  tabs_information[resent_tab].type = "file";
  tabs_information[resent_tab].title = "title";
  if (title) {
    change_tab_name(resent_tab, title)
  } else {
    change_tab_name(resent_tab, 'ファイル表示')
    console.error('titleが指定されていません。')
  }
  let arr = wayaku_to_arr(file)
  file = arr_to_viewHTML(arr)
  //historiesにファイルタイトルを入れる。
  let histories = JSON.parse(localStorage.getItem('histories'))
  if (histories) {
    histories.unshift({ "title": title, "date": getNowYMD() });
    localStorage.setItem('histories', JSON.stringify(histories))
  } else {
    localStorage.setItem('histories', JSON.stringify([{ "title": title, "date": getNowYMD() }]))
  }
  const output = document.getElementById('content' + resent_tab)
  output.innerHTML = `
  <div id="file${resent_tab}" class="file">${file}</div>`;
  output.style.display = "block"
}
function change_html_as_name(file_name) {
  new_tab()
  if (!file_name) {
    console.error('ファイル名は必須です。')
    return 0;
  }
  file = localStorage.getItem(file_name)
  if (!file) {
    console.error(file_name + 'というファイルは見つかりませんでした。');
    view_announce(file_name + 'というファイルは見つかりませんでした。');
    return 404;
  }
  change_html(file, file_name);
  return 200;
}
