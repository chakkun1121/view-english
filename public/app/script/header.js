function changeStyle() {
  const iframeWindow = document.getElementById(tab.openedTab() + '-iframe').contentWindow;
  iframeWindow.changeStyle();
}
cards = {};
cards.start = function () {
  const iframeWindow = document.getElementById(tab.openedTab() + '-iframe').contentWindow;
  iframeWindow.cards.start();
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
function newFile() {
  const iframeWindow = document.getElementById(tab.openedTab() + '-iframe').contentWindow;
  iframeWindow.createFile();
}
window.print = function () {
  const iframeWindow = document.getElementById(tab.openedTab() + '-iframe').contentWindow;
  iframeWindow.print();
};
