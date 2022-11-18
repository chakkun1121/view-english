//ファイルボタン用
let file_button_mouse = false
let file_contents_mouse = false
const file_button = document.getElementById('file_button')
file_button.addEventListener('mouseover', function() {
  document.getElementById('file_contents').style.display = "block";
  file_button_mouse = true
})
file_button.addEventListener('onclick', function() {
  document.getElementById('file_contents').style.display = "block";
  file_button_mouse = true
})
file_button.addEventListener('mouseout', function() {
  file_button_mouse = false;
})
document.getElementById('file_contents').addEventListener('mouseover', function() {
  file_contents_mouse = true;
})
document.getElementById('file_contents').addEventListener('mouseout', function() {
  file_contents_mouse = false

})
setInterval(function() {
  if ((!file_button_mouse) && (!file_contents_mouse)) {
    document.getElementById('file_contents').style.display = "none";
  }
}, 100)
//英文、和訳のスタイルの変更
let style = 0;
function change_style() {
  const root = document.querySelector(':root');
  const en_class = document.getElementsByClassName('en');
  const ja_class = document.getElementsByClassName('ja');
  if (style == 0) {
    //英文を隠す
    root.style.setProperty("--en-color", 'white');
    root.style.setProperty("--ja-color","black")
    style = 1;
  } else if (style == 1) {
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
    root.style.setProperty("--ja-color",ja_color)
    style = 2;
  } else {
    root.style.setProperty("--en-color", 'black');
    root.style.setProperty("--ja-color","black")
    style = 0;
  }
}