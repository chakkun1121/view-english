//履歴関連
let open_history_tab=null
function view_histories() {
  if(open_history_tab){
    close_tab(open_history_tab);
  }
  new_tab();
  open_history_tab=resent_tab
  change_tab_name(resent_tab, "履歴")
  tabs_information[resent_tab].type = "system ";
  tabs_information[resent_tab].title = "履歴";

  document.getElementById('content' + resent_tab).innerHTML = `
    <div class="history-page-header">
      <h2>最近開いたタブ</h2>
      <button type="submit" onclick="delete_histories();">履歴をすべて消去</button>
    </div>
    <div class="view-histories" id="view_history${resent_tab}"></div>
  `;
  let histories = JSON.parse(localStorage.getItem('histories'))
  if (!histories) {
    document.getElementById('view_history' + resent_tab).innerHTML = `<h3>見つかりませんでした</h3>`;
    return;
  }
  for (let i = 0; i < histories.length; i++) {
    let history_file_title = histories[i].title
    document.getElementById('view_history' + resent_tab).innerHTML = document.getElementById('view_history' + resent_tab).innerHTML + `<li><button  onclick='change_html_as_name("${history_file_title}")'> ${history_file_title} </button></li>`
  }
}
function delete_histories() {
  localStorage.removeItem('histories');
  document.getElementById('view_history' + resent_tab).innerHTML = `<h3>すべて消去しました。</h3>`;
  view_announce('履歴を消去しました');
}