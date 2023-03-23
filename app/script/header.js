function changeStyle() {
  const iframeWindow = document.getElementById(tab.openedTab() + '-iframe').contentWindow;
  iframeWindow.changeStyle();
}
const card = {};
card.start = function () {
  const iframeWindow = document.getElementById(tab.openedTab() + '-iframe').contentWindow;
  iframeWindow.card.start();
};
function editFile() {
  const iframeWindow = document.getElementById(tab.openedTab() + '-iframe').contentWindow;
  iframeWindow.editFile();
}
function saveWayaku() {
  const iframeWindow = document.getElementById(tab.openedTab() + '-iframe').contentWindow;
  iframeWindow.saveFile();
}
window.print = function () {
  const iframeWindow = document.getElementById(tab.openedTab() + '-iframe').contentWindow;
  iframeWindow.print();
};
