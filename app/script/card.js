function start_cards() {
  window.open('./card.html', 'cards', 'width=' + screen.availWidth + ',height=' + screen.availHeight)
  let opened_wayaku_file = document.getElementById('file' + resent_tab).innerHTML
  if (!opened_wayaku_file) {
    return;
  }
  console.log(opened_wayaku_file)
  document.getElementById('send_to_cards_window').innerTEXT = opened_wayaku_file
}