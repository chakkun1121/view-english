document.getElementById('headerButtons').innerHTML += `
  <button type="button" class="tool-bar-button" id="changeStyleButton" onclick="cards.start();">フラッシュカードの開始</button>
`
const cards = {
  start: function (tabID = tab.openedTab()) {
    const wayakuArrary = (viewHTMLtoArray(tab.getHTMLcontent(tabID)))
    console.log(wayakuArrary)
    window.open("https://chakkun1121.github.io/view-english/cards?file=" + JSON.stringify(wayakuArrary))
  }
}





finishedScriptNumber++