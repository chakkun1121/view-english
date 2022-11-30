function editFile() {
  let title, main
  let wayakuArrary = viewHTMLtoArray(tab.getHTMLcontent(tab.openedTab()))
  if (wayakuArrary) {
    [title, main] = arrayToText(wayakuArrary)
  } else {
    title = '新しいファイル'
    main = '英文、日本語の順に改行して入力してください。(これは必ず消してください。)'
  }
  const editHTML =
    `<div class="edit-file"><div class="edit-header"><input value="${title}" class="edit-title" onchange="editChangeHTML()" id="editTitle"><button class="edit-filish" onclick="editToText(${tab.openedTab()})">完了</button></div><textarea id="editMain" onchange="editChangeHTML()" class="edit-main">${main}</textarea></div>`
  tab.viewHTMLcontent(tab.openedTab(), editHTML, title)
  tab.changeTaborder()
  tab.view()
}
function editChangeHTML() {
  tab.changeHTMLcontentOnlyTabInfo(tab.openedTab(), `<div class="edit-file"><div class="edit-header"><input value="${document.getElementById('editTitle').value}" class="edit-title" id="editTitle" onchange="editChangeHTML()"><button class="edit-filish" onclick="editToText(${tab.openedTab()})">完了</button></div><textarea id="editMain" onchange="editChangeHTML()" class="edit-main">${document.getElementById('editMain').value}</textarea></div>`)
}
document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="editFile()">編集</button>
`
finishedScriptNumber++