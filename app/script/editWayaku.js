function editFile() {
  let title, main
  let wayakuArrary = viewHTMLtoArray(tab.getHTMLcontent(tab.openedTab()))
  if (file) {
    [title, main] = arrayToText(wayakuArrary)
  } else {
    title = '新しいファイル'
    main = '英文、日本語の順に改行して入力してください。(これは必ず消してください。)'
  }
  const editHTML =
    `
    <div class="edit-file">
      <div class="edit-header">
        <input value="${title}" class="edit-title" id="edit_title${resent_tab}">
        <button class="edit-filish" onclick="edit_to_text(${resent_tab})">完了</button>
      </div>
      <textarea id="editMain" onchange="editChangeHTML" class="edit-main">
        ${main}
      </textarea>
    </div>
  `
  viewHTMLcontent(tab.openedTab(), editHTML, title)
}
finishedScriptNumber++