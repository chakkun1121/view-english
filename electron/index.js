const electron = require('electron');

electron.app.on('ready', () => {
  // インスタンスを変数に格納しておきます。
  const browserWindow = new electron.BrowserWindow({ autoHideMenuBar: true });
  browserWindow.loadURL(`https://chakkun1121.github.io/view-english/app`);
});
