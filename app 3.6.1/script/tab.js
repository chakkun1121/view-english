//tab関連
let tab_number = 0
let resent_tab = 0
//タブの情報を入れる。
let tabs_information = [null,]
function new_tab() {
  let tab_left = document.getElementById('tab_left')
  let tab_left_code = document.getElementById('tab_left').innerHTML;
  tab_number++
  tabs_information.push({ tabID: tab_number, type: "system", title: "新しいタブ", open_data: getNowYMD() });
  tab_left.innerHTML =
    `${tab_left_code}
      <div class="tab tab${tab_number}">
        <input id="TAB${tab_number}" type="button" class="tabswitch" onclick="view_tab(${tab_number})" value="新しいタブ">
        <button tyle="submit" onclick="close_tab(${tab_number})" aria-label="タブを閉じる">×</button>
      </div>`
  let contents_code = document.getElementById('main_contents').innerHTML;
  let contents = document.getElementById("main_contents");
  contents.innerHTML = contents_code + `
      <div class="content" id="content${tab_number}">
          <h1>和訳表示サイト v ${now_version}</h1>
          <label class="input-file-label"><input type="button" class="input-file"  onclick="open_files_from_input()" value="表示するファイルを選択"></label>
          <button onclick="view_histories()">最近開いたファイル</button>
      </div>`
  view_tab(tab_number);
  return tab_number;
}
function view_tab(view_tab_number) {
  if (resent_tab != 0) {
    //表示中のタブを消す
    let hide_tab = document.getElementById(`content${resent_tab}`);
    hide_tab.style.display = "none";
  }
  //指定されたタブを表示 
  resent_tab = view_tab_number;
  let view_tab_ = document.getElementById(`content${view_tab_number}`)
  view_tab_.style.display = "block";
}
/**
*後ろのタブを表示(不調)
*/
function view_next_tab() {
  let search_tab = 0
  let loop_number = 0
  for (search_tab = resent_tab + 1; search_tab = resent_tab; search_tab++) {
    if (search_tab > tab_number) {
      loop_number++
      if (loop_number >= 3) {
        console.error('タブが開かれていない可能性があります。')
        new_tab()
        return;
      }
      search_tab = 0
    }
    if (!search_tab == 0 && !search_tab > tab_number) {
      if (tabs_information[search_tab].tabID) {
        view_tab(search_tab)
        return;
      }
    }
  }
  console.error('タブが１つも開かれていません')
  new_tab()
}
function view_front_tab() {
  let search_tab = 0
  let loop_number = 0
  for (search_tab = resent_tab - 1; search_tab < resent_tab; search_tab--) {
    if (search_tab <= 0) {
      loop_number++
      if (loop_number >= 3) {
        console.error('タブが開かれていない可能性があります。')
        new_tab()
        return;
      }
      search_tab = tab_number
    }
    if (tabs_information[search_tab].tabID) {
      view_tab(search_tab)
      return;
    }
  }
  console.error('タブが１つも開かれていません')
  new_tab()
}
function close_tab(close_tab) {
  //指定されたタブを消去
  if (close_tab <= tab_number) {
    tabs_information[close_tab].type = "closed";
    tabs_information[close_tab].tabID = null;
    tabs_information[close_tab].title = null;
    document.getElementsByClassName('tab' + close_tab)[0].style.display = "none"
    document.getElementById('content' + close_tab).innerHTML = ""
    document.getElementById('content' + close_tab).style.display = "none"
    view_front_tab();
    if (tabs_information.length == 1) {
      new_tab();
    }
  } else {
    console.error(tab_number + '番目のタブは閉じれません。')
  }
}
/**
* tabの名前を変更
*    tab_number:変更するタブの番号
*    name:変更する名前
*/
function change_tab_name(tab_number, name) {
  tabs_information[tab_number].title = name;
  document.getElementById('TAB' + tab_number).value = name;
}
/**
* 指定したURLを新しいタブ(アプリ内)で開く
  */
function openURLasNewtab(url,class_,id,callback){
  new_tab()
  document.getElementById('content'+resent_tab).innerText="読み込み中"
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    let html=xhr.response;
    html=html.replace(/\n/g,'');
    let title=html;
    title=title.replace(/^.*\<title\>/,"")
    title=title.replace(/\<\/title\>.*/,"")
    change_tab_name(resent_tab,title)
    if(title=="Not Found"){
      document.getElementById('content'+resent_tab).innerHTML="見つかりませんでした"
      return;
    }
    html=html.replace(/^\<\!DOCTYPE html\>/,"")
    html=html.replace(/\<html\>.*\<body\>/i,"");
    html=html.replace(/<\/body\>.*\<\/html\>/i,'')
    html=html.replace(/\<style.*\<\/style>/g,'')
    html=html.replace(/\<script.*\<\/script>/g,'')
    // html=html.replace(/\<link.*>/g,'')
    //todo:上のが調子悪いから<link>タブも消せるようにする

    console.log(html)
    if(!class_){
      class_="html-content"
    }
    if(!id){
       document.getElementById('content'+resent_tab).innerHTML=`
      <div class="${class_}">${html}</div>`   
    }else{
      document.getElementById('content'+resent_tab).innerHTML=`
      <div id="${id}" class="${class_}">${html}</div>`   
    }
    if(callback){
      callback();
    }
  }
  xhr.send();
}