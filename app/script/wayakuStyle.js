document.getElementById('headerButtons').innerHTML += `
  <button class="tool-bar-button" onclick="changeStyle();">表示切替</button>
`
document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="changeStyle()">表示切替</button>
`
//英文、和訳のスタイルの変更
let wayakuStyle = 0;
/**
 * 和訳ファイルのスタイルを変更します。
 */
function changeStyle() {
  switch (wayakuStyle) {
    case 0:
      changeStyleAsColor("white")
      wayakuStyle = 1;
      break;
    case 1:
      //カスタム表示
      let settings_json = JSON.parse(localStorage.getItem('settings'));
      if (!settings_json) {
        settings_json = {
          en_color: "#ffa500",
          ja_color: "#000000"
        }
      }
      let jaColor = settings_json.ja_color
      let enColor = settings_json.en_color
      changeStyleAsColor(enColor, jaColor)
      wayakuStyle = 2;
      break;
    case 2:
      changeStyleAsColor();
      wayakuStyle = 0;
      break;
  }
}
/**
 * 指定した色に変更します。
 * @param {String} enColor 
 * @param {String} jaColor 
 */
function changeStyleAsColor(enColor = "#000000", jaColor = "#000000") {
  const root = document.querySelector(':root');
  root.style.setProperty("--en-color", enColor)
  root.style.setProperty("--ja-color", jaColor)
}
finishedScriptNumber++