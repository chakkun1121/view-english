//function key
hotkeys('f1,f2,f4,f5', function(e, handler) {
  e.preventDefault()
  switch (handler.key) {
    /*case "f1":
      view_help();
      break;*/
    default:
      break;
  }
})
shortcut.add('f1', open_help);
//一文字
hotkeys('shift+/,?', function(e) {
  e.preventDefault()
  open_help();
})

//ctrl+なにか
shortcut.add('ctrl+e', function(e) {
  e.preventDefault();
  edit_file();
})
shortcut.add('ctrl+f', function(e) {
  e.preventDefault()
  start_cards()
})
shortcut.add('ctrl+h', function(e) {
  e.preventDefault()
  view_histories();
})
shortcut.add('ctrl+n', function(e) {
  e.preventDefault();
  new_file();
})
shortcut.add('ctrl+o', function(e) {
  open_files_from_input();
})
shortcut.add('ctrl+r', function(e) {
  e.preventDefault()
})
shortcut.add('ctrl+s', function(e) {
  e.preventDefault()
  save_file_as_newfile()
})
shortcut.add('ctrl+t', function(e) {
  e.preventDefault()
  new_tab()
})
shortcut.add('ctrl+w', function(e) {
  e.preventDefault()
  close_tab(resent_tab)
})
shortcut.add('ctrl+/', function(e) {
  e.preventDefault()
  open_help();
})
hotkeys('ctrl+/', function(e) {
  e.preventDefault()
  open_help();
})
shortcut.add("ctrl+tab", function(e) {
  e.preventDefault()
  view_next_tab()
})
//alt+なにか
shortcut.add("alt+1", function(e) {
  e.preventDefault()
  document.getElementById('file_contents').style.display = "block";
  file_button_mouse = true
})
shortcut.add('alt+2', function(e) {
  e.preventDefault();
  window.print()
})
shortcut.add("alt+3", change_style)
shortcut.add('alt+4', open_settings)

shortcut.add('shift+/', function(e) {
  e.preventDefault()
  view_help()
})

//ctrl+alt+なにか
shortcut.add("ctrl+shift+s", function(e) {
  e.preventDefault();
  save_file_as_newfile()
})
shortcut.add("ctrl+shift+tab", function(e) {
  e.preventDefault()
  view_front_tab()
})
shortcut.add("ctrl+shift+r",function(e){
  e.preventDefault()
  console.info("updata")
  updata();
})