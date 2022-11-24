document.getElementById('headerButtons').innerHTML += `
  <button type="button" class="tool-bar-button" id="changeStyleButton" onclick="changeStyle();">表示切替</button>
`
//英文、和訳のスタイルの変更
let wayakuStyle = 0;
function changeStyle() {
  const root = document.querySelector(':root');
  const en_class = document.getElementsByClassName('en');
  const ja_class = document.getElementsByClassName('ja');
  switch (wayakuStyle) {
    case 0:
      //英文を隠す
      root.style.setProperty("--en-color", 'white');
      root.style.setProperty("--ja-color", "black")
      style = 1;
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
      let ja_color = settings_json.ja_color
      let en_color = settings_json.en_color
      root.style.setProperty("--en-color", en_color);
      root.style.setProperty("--ja-color", ja_color)
      style = 2;
      break;
    case 2:
      root.style.setProperty("--en-color", 'black');
      root.style.setProperty("--ja-color", "black")
      style = 0;
      break;
  }
}