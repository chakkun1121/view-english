shortcut.add('space', function () {
  if (mode == "cards") {
    showAnswer()
  }
})
shortcut.add('enter', function () {
  switch (mode) {
    case "home":
      startCards()
      break;
    case "cards":
      nextProblem()
      break;
    case "result":
      window.history.length == 1 ? window.close() : alert('タブを閉じるのに失敗しました。')
      break;
  }
})
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