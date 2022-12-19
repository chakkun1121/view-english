document.getElementById('headerButtons').innerHTML += `
  <button type="button" class="tool-bar-button" onclick="cards.start();">フラッシュカード</button>
`
document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="cards.start();">フラッシュカードをスタート</button>
`
const cards = {
  start: function (tabID = tab.openedTab()) {
    const wayakuArrary = (viewHTMLtoArray(tab.HTMLcontent.get(tabID)))
    localStorage.setItem('cards', JSON.stringify(wayakuArrary))
    if (JSON.stringify(wayakuArrary).length < 500) {
      window.open("../cards/card.html?file=" + encodeURIComponent(JSON.stringify(wayakuArrary)))
      return;
    }
    window.open('../cards/card.html')
  }
}





finishedScriptNumber++