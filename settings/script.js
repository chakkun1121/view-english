window.onload = (() => {
  const req = new XMLHttpRequest();
  req.addEventListener("load", function () {
    console.log(this.responseText);
    document.getElementById("settingsMain").innerHTML = `<h3>準備完了</h3>`
  });
  req.open("GET", "settings.json")
  req.send();
})