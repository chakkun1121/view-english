//設定画面用
let open_setting_tab = null
function open_settings() {
  if (open_setting_tab) {
    close_tab(open_setting_tab);
  }
  openURLasNewtab('https://view-english.chakkun1121haru.repl.co/settings/settings.html', "setitings", null, function () {
    console.log('a')
    let settings_json = JSON.parse(localStorage.getItem('settings'));
    if (!settings_json) {
      settings_json = {
        en_color: "#ffa500",
        ja_color: "#000000",
        darkmode: false
      }
    }
    if (settings_json.en_color) {
      document.getElementById('en_color').value = settings_json.en_color;
    }
    if (settings_json.ja_color) {
      document.getElementById('ja_color').value = settings_json.ja_color;
    }
  })
}

function set_en_color() {
  let en_color = document.getElementById('en_color').value;
  console.log(en_color)
  localStorage.setItem('custom_en_color', en_color)
}
function set_ja_color() {
  let ja_color = document.getElementById('ja_color').value;
  console.log(ja_color)
  localStorage.setItem('custom_ja_color', ja_color)
}
function set_settings() {
  let settings_json = JSON.parse(localStorage.getItem('settings'));
  if (!settings_json) {
    settings_json = {
      en_color: "#ffa500",
      ja_color: "#000000",
      darkmode: false
    }
  }
  let en_color = document.getElementById('en_color').value;
  let ja_color = document.getElementById('ja_color').value;
  let isDarkMode = document.getElementById('isDarkMode').checked;
  if (en_color) {
    settings_json.en_color = en_color
  }
  if (ja_color) {
    settings_json.ja_color = ja_color
  }
  if (isDarkMode) {
    settings_json.darkmode = true;
    changeColorMode("black")
  } else {
    settings_json.darkmode = false;
    changeColorMode('white')
  }
  const jsonString = JSON.stringify(settings_json);
  localStorage.setItem('settings', jsonString);
  alert("設定を保存しました。")
}
function changeColorMode(color) {
  if (!color) {
    if (localStorage.getItem('settings')) {
      color = JSON.parse(localStorage.getItem('settings')).darkmode
    } else {
      color = "white"
    }
  }
  if (color == "black" || color === true) {
    document.getElementById("darkModeCss").href = "main style/darkmode.css"
  } else {
    document.getElementById("darkModeCss").href = "404.css"//←見つからないが、問題なし
  }
}
