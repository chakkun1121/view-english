function resetApp() {
  localStorage.removeItem("tabInfo")
  localStorage.removeItem("cards")
  localStorage.removeItem("wayakuSettings")
  localStorage.removeItem("wayakuExtensions")
  updata()
}
document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="resetApp()">アプリをリセット</button>
`
finishedScriptNumber++