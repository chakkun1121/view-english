function fixWayakuFile(fileData) {
  if (!fileData) return;
  if (!fileData.match(/^\<wayaku/)) {
    //ファイル形式が破壊しているので手動修正
    fileData = `<wayaku>${fileData}</wayaku>`;
  }
  //xml
  const xmlWayaku = new DOMParser().parseFromString(fileData, 'text/xml');
  const brokenFileID = xmlWayaku.getElementsByTagName('wayaku')[0].getAttribute('fileid');
  if (brokenFileID) {
    xmlWayaku.getElementsByTagName('wayaku')[0].removeAttribute('fileid');
    xmlWayaku.getElementsByTagName('wayaku')[0].setAttribute('fileID', brokenFileID);
  }
  const fileID = xmlWayaku.getElementsByTagName('wayaku')
    ? xmlWayaku.getElementsByTagName('wayaku')[0].getAttribute('fileID') ||
      'wayakuFile-' + UUID.generate()
    : 'wayakuFile-' + UUID.generate();
  xmlWayaku.getElementsByTagName('wayaku')[0].setAttribute('fileID', fileID);
  return new XMLSerializer().serializeToString(xmlWayaku);
}
function getWayakuFileID(fileData) {
  if (!fileData) return;
  const xmlWayaku = new DOMParser().parseFromString(fileData, 'text/xml');
  const fileID = xmlWayaku.getElementsByTagName('wayaku')[0].getAttribute('fileID');
  return fileID;
}
