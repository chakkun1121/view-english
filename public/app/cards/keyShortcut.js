shortcut.add('enter', function () {
  switch (mode) {
    case 'home':
      startCards();
      break;
    case 'cards':
      nextProblem();
      break;
    case 'result':
      viewErrorAndClose();
      break;
  }
});
hotkeys('space,right', function (e, handler) {
  e.preventDefault();
  if (mode == 'cards') {
    switch (handler.key) {
      case 'space':
        showAnswer();
        break;
      case 'right':
        nextProblem();
        break;
      default:
        console.error('hotkeys.jsがバグりました。');
        break;
    }
  }
});
