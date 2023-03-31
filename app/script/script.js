const appEvent = document.getElementById('appEvent');
const appVersion = '4.1.0';
window.onload = function () {
  if ('launchQueue' in window && 'files' in LaunchParams.prototype) {
    launchQueue.setConsumer((launchParams) => {
      if (!launchParams.files.length) {
        return;
      }
      for (const fileHandle of launchParams.files) {
        // Handle the file.
        handleFile(fileHandle);
      }
    });
  }
  if (tab.tabInfo.tabs.length == 0) {
    tab.new();
  }
  creatEvent('shortcutInit');
  document.getElementById('loading').classList.add('loaded');

  //   console.error('File Handling API is not supported!');
  //   document.getElementById('loadErrorMessage').classList.remove('hidden');
  //   document.getElementById(
  //     'loadErrorMessage'
  //   ).innerHTML = `エラー:File Handling APIがサポートされていません。<a href="https://google.com/chrome" target="_blank">chromeからアクセスする</a>か、<a href="../lightVersion">軽量版</a>をご利用ください。バージョン:${appVersion}`;
};
/**
 * イベントを作成して発火させます。
 * @param {String} type
 * @returns 成功時にtrue、失敗時にfalseを返します。
 */
function creatEvent(type) {
  if (!type) return false;
  window.dispatchEvent(new Event(type));
  return true;
}
/**
 * イベントリスナーを追加します。(appEventに追加します)
 * @param {String} type
 * @param {callback} callback
 * @param {*} isDeleate
 * @returns 成功時にtrue、失敗時にfalseを返します。
 */
function creatEventListener(type, callback, isDeleate = false) {
  if (!type) return false;
  window.addEventListener(type, callback);
  return true;
}
async function handleFile(fileSystemFileHandle) {
  const file = await fileSystemFileHandle.getFile();
  let fileName = file.name;
  const fileContents = await file.text();
  let fileType = fileName.split('.').pop(); //拡張子取得
  let fileData;
  if (fileType == 'html') {
    fileData = htmlToWayaku(fileContents);
    const pos = fileName.lastIndexOf('.');
    fileName = fileName.substr(0, pos < 0 ? file.length : pos) + '.wayaku';
  } else if (fileType == 'wayaku') {
    fileData = fileContents;
  } else {
    console.error('拡張子が違います。');
    return;
  }
  fileData = fixWayakuFile(fileData);
  const fileID = getWayakuFileID(fileData);
  //ファイル情報などを保存
  await saveFileInfo(fileName, fileID, fileData, fileSystemFileHandle);
  const openedTab = tab.new();
  document.getElementById(openedTab + '-iframe').src = 'file/file.html?fileId=' + fileID;
}
