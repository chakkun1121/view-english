// 機能しないが無視
window.print = function (tabID = tab.openedTab()) {
  const wayakuArrary = viewHTMLtoArray(tab.getHTMLcontent(tabID))
  const title = arrayToText(viewHTMLtoArray(tab.getHTMLcontent(tabID)))[0]
  const wayakuData = arrayToWayaku(wayakuArrary)
  console.log(wayakuData)
  window.open().document.innerHTML = wayakuData
  // `
  //   <title>${title}</title>
  //   ${wayakuData}
  // `
}
document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="print()">印刷</button>
`

finishedScriptNumber++