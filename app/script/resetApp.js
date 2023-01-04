function resetApp() {
  localStorage.removeItem("tabInfo")
  localStorage.removeItem("cards")
  updata()
}
document.getElementById('headerFileMenu').innerHTML += `
  <button class="header-file-menu-button" onclick="resetApp()">アプリをリセット</button>
`
finishedScriptNumber++