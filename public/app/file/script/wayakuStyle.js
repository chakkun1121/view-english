//英文、和訳のスタイルの変更
let wayakuStyle = 0;
/**
 * 和訳ファイルのスタイルを変更します。
 */
function changeStyle() {
  switch (wayakuStyle) {
    case 0:
      changeStyleAsColor('white');
      wayakuStyle = 1;
      break;
    case 1:
      //カスタム表示
      let settingsJson = JSON.parse(localStorage.getItem('wayakuSettings')) || {};
      let jaColor = settingsJson.jacolor || '#000000';
      let enColor = settingsJson.encolor || '#ffa500';
      changeStyleAsColor(enColor, jaColor);
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
function changeStyleAsColor(enColor = '#000000', jaColor = '#000000') {
  const root = document.querySelector(':root');
  root.style.setProperty('--en-color', enColor);
  root.style.setProperty('--ja-color', jaColor);
}
