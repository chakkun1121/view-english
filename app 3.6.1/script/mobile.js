function view_mobile_menu() {
  if(document.getElementById('mobile_menu').style.display=="block"){
    document.getElementById('mobile_menu').style.display="none";
    document.getElementById('mobile_menu_button').innerHTML="メニュー";
  }else{
    document.getElementById('mobile_menu').style.display="block";
    document.getElementById('mobile_menu_button').innerHTML="×閉じる";
  }
}