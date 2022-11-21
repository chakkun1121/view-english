shortcut.add('space', function() {
  if (mode == "card") {
    document.getElementById('answer').style.color = 'black';
  }
})
shortcut.add('enter', next_problem)
hotkeys('space,right', function(e, handler) {
  e.preventDefault()
  switch (handler.key) {
    case 'space':
      document.getElementById('answer').style.color = 'black';

      break;
    case 'right':
      next_problem()
      break;
  }
})