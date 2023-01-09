shortcut.add('space', function () {
  if (mode == "card") {
    answer.style.color = 'black';
  }
})
shortcut.add('enter', nextProblem)
hotkeys('space,right', function (e, handler) {
  e.preventDefault()
  switch (handler.key) {
    case 'space':
      showAnswer()
      break;
    case 'right':
      nextProblem()
      break;
  }
})