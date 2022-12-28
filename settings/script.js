window.onload = (() => {
  const req = new XMLHttpRequest();
  req.addEventListener("load", function () {
    settingsJson = JSON.parse(this.responseText)
    viewSettings(settingsJson)
  });
  req.open("GET", "settings.json")
  req.send();
})
let settingsJson = {};
function viewSettings() {
  const nowSettingsJson = JSON.parse(localStorage.getItem('settings')) || {}
  settingsJson.map(function (value, indexNumber) {
    document.getElementById('settingsMain').innerHTML += `
    <div class="setting">
      <label>${value.flag ? "flag(試験運用版) " + value.name : value.name}
        <input
          type="${value.settingInputType}" 
          value="${nowSettingsJson[value.savedName] || value.initial}" 
          ${(nowSettingsJson[value.savedName] === true) || (value.initial === true) ? 'checked' : ''}
          class="setting-input"
          onchange="saveSetting('${indexNumber}')" 
          id="settingInput_${value.savedName}">
      </label>
    </div>
    `
    if (nowSettingsJson[value.savedName] === true || value.initial === true) {
      document.getElementById('settingInput_' + value.savedName).checked = true
    }
  })
}
function saveSetting(itemNumber) {
  const nowSettingsJson = JSON.parse(localStorage.getItem('settings')) || {}
  //↓clickedで処理する者らの処理が不調
  const value = settingsJson[itemNumber].settingInputType == "checkbox" ? document.getElementById("settingInput_" + settingsJson[itemNumber].savedName).checked : document.getElementById("settingInput_" + settingsJson[itemNumber].savedName).value
  nowSettingsJson[settingsJson[itemNumber].savedName] = value
  localStorage.setItem('settings', JSON.stringify(nowSettingsJson))
}