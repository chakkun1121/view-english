window.onload = (() => {
  const req = new XMLHttpRequest();
  req.addEventListener("load", function () {
    console.log(JSON.parse(this.responseText));
    settingsJson = JSON.parse(this.responseText)
    document.getElementById("settingsMain").innerHTML = `<h3>準備完了</h3>`
    viewSettings(settingsJson)
  });
  req.open("GET", "settings.json")
  req.send();
})
let settingsJson = {};
function viewSettings() {
  const nowSettingsJson = JSON.parse(localStorage.getItem('settings')) || {}
  console.log(nowSettingsJson)
  let settingsMainHTML = "";
  settingsJson.map(function (value) {
    settingsMainHTML += `
    <div class="setting">
      <label>${value.name}
        <input type="${value.settingInputType}" value="${nowSettingsJson[value.savedName] || value.Initial}" checked="${nowSettingsJson[value.savedName] === true || value.Initial === true ? true : false}" class="setting-input" onchange="saveSetting('${value.savedName}')" id="settingInput_${value.savedName}">
      </label>
    </div>
    `
  })
  document.getElementById('settingsMain').innerHTML = settingsMainHTML
}
function saveSetting(savedName) {
  const nowSettingsJson = JSON.parse(localStorage.getItem('settings')) || {}
  //↓clickedで処理する者らの処理が不調
  console.log(settingsJson[savedName].settingInputType = "checkbox" ? document.getElementById("settingInput_" + savedName).checked : document.getElementById("settingInput_" + savedName).value)
  nowSettingsJson[savedName]
}