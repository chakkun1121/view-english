document.getElementById('headerButtons').innerHTML += `
  <button type="button" class="tool-bar-button" onclick="cards.start();">フラッシュカード</button>
`;
document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="cards.start();">フラッシュカードをスタート</button>
`;
const cards = {
  start: function (tabID = tab.openedTab()) {
    const wayakuArrary = viewHTMLtoArray(tab.HTMLcontent.get(tabID));
    localStorage.setItem('cards', JSON.stringify(wayakuArrary));
    const subwindow = window.open(
      '../cards/card.html',
      'window_name',
      'width=1000,height=800,scrollbars=yes'
    );
    window.cardTabID = tabID;
  },
};
function editFileFromCards(tabID, changedWayakuArrary) {
  console.log(tabID);
  console.log(changedWayakuArrary);
}
finishedScriptNumber++;
