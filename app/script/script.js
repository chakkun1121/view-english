const appEvent = document.getElementById('appEvent');
const appVersion = '4.1.0';
window.onload = function () {
  document.getElementById('loading').classList.add('loaded');
};
/**
 * イベントを作成して発火させます。
 * @param {String} type
 * @returns 成功時にtrue、失敗時にfalseを返します。
 */
function creatEvent(type) {
  if (!type) return false;
  window.dispatchEvent(new Event(type));
  return true;
}
/**
 * イベントリスナーを追加します。(appEventに追加します)
 * @param {String} type
 * @param {callback} callback
 * @param {*} isDeleate
 * @returns 成功時にtrue、失敗時にfalseを返します。
 */
function creatEventListener(type, callback, isDeleate = false) {
  if (!type) return false;
  window.addEventListener(type, callback);
  return true;
}
