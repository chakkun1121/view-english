shortcut.add('space', function () {
  if (mode == "cards") {
    showAnswer()
  }
})
shortcut.add('enter', nextProblem)
hotkeys('space,right', function (e, handler) {
  e.preventDefault()
  if (mode == "cards") {
    switch (handler.key) {
      case 'space':
        showAnswer()
        break;
      case 'right':
        nextProblem()
        break;
      default:
        console.error('hotkeys.jsがバグりました。')
        break;
    }
  }
})