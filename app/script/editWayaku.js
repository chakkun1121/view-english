/**
 * ファイルを編集します。
 */
function editFile(tabID = tab.openedTab()) {
  let title = '',
    main = '';
  let wayakuArrary = viewHTMLtoArray(tab.HTMLcontent.get(tabID));
  console.log(wayakuArrary);
  if (wayakuArrary) {
    [title, main] = arrayToText(wayakuArrary);
  }
  tab.HTMLcontent.change(tab.openedTab(), getEditWayakuTabData(title, main), title);
  tab.purpose.change(tabID, 'editWayaku');
  tab.view();
}
function editChangeHTML() {
  tab.HTMLcontent.change(
    tab.openedTab(),
    getEditWayakuTabData(editTitle.value, editMain.value),
    editTitle.value,
    true
  );
}
let editWayakuTabData = `
<div class="edit-file">
  <div class="edit-header">
    <input value="<title/>" class="edit-title" id="editTitle" onchange="editChangeHTML()" placeholder="タイトルを入力">
    <button class="edit-filish" onclick="finishEdit()">完了</button>
  </div>
  <textarea id="editMain" onchange="editChangeHTML()" class="edit-main" placeholder="英文、日本語の順に改行して入力してください。"><editMain/></textarea>
</div>
`;
function getEditWayakuTabData(title, main) {
  return editWayakuTabData.replace(/<title\/>/g, title).replace(/<editMain\/>/g, main);
}
function finishEdit(tabID = tab.openedTab()) {
  const title = document.getElementById('editTitle').value;
  const data = document.getElementById('editMain').value;
  const wayakuData = arrayToViewHTML(textToArray(title, data));
  tab.purpose.change(tabID, 'wayakuContent');
  tab.HTMLcontent.change(tabID, wayakuData, title);
  tab.save();
  tab.view(tabID);
}
function newFile() {
  tab.new();
  tab.view();
  editFile();
}

document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="editFile()">編集</button>
`;
finishedScriptNumber++;
