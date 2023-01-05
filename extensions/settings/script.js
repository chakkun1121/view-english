window.onload = function () {
  if (localStorage.getItem('wayakuExtensions')) {
    main.innerText = JSON.parse(localStorage.getItem('wayakuExtensions')).join('\n')
  }
}
main.addEventListener('input', function (e) {
  saveButton.style.display = "block"
})
shortcut.add('ctrl+s', function () {
  save()
})
function save() {
  saveButton.innerText = "保存中"
  if (!checkFile(main.innerText)) {
    alert('何か問題があるようです。')
    return;
  }
  const mainArrary = main.innerText.split('\n').filter(Boolean)
  console.log(mainArrary)
  localStorage.setItem("wayakuExtensions", JSON.stringify(mainArrary))
  saveButton.innerText = "保存"
  saveButton.style.display = "none"
}
function checkFile(text) {
  const mainArrary = main.innerText.split('\n').filter(Boolean)
  let error;
  mainArrary.map(function (value) {
    if (value.match(/^data:text\/javascript\,/) == null) {
      error = true
    }
  })
  return !error;
}