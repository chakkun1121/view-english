function saveWayaku(tabID = tab.openedTab()) {
  const wayakuArrary = viewHTMLtoArray(tab.getHTMLcontent(tabID))
  const title = arrayToText(viewHTMLtoArray(tab.getHTMLcontent(tabID)))[0] + ".wayaku"
  const wayakuData = arrayToWayaku(wayakuArrary)
  downloadWayaku(title, wayakuData)
}
function downloadWayaku(fileName, data) {
  const blob = new Blob([data], { type: 'application/dxf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = fileName;
  a.href = url;
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="saveWayaku()">保存</button>
`
finishedScriptNumber++