const shortcutList = [
  // {
  //   key: "f1",
  //   function: "ヘルプを表示",
  //   callback: ''
  // },
  // {
  //   key: "f2",
  //   function: "ファイル名の変更",
  //   callback: ""
  // },
  {
    key: "f5",
    function: "最新の状態に更新",
    callback: tab.changeTaborder
  },
  {
    key: "ctrl+1",
    function: "1番目のタブを表示します。",
    callback: function () { tab.view(1) }
  },
  {
    key: "ctrl+r",
    function: "最新の状態に更新",
    callback: tab.changeTaborder
  },
  {
    key: "ctrl+s",
    function: "保存",
    callback: saveWayaku
  }
]
for (let i = 0; i < shortcutList.length; i++) {
  shortcut.add(shortcutList[i].key, shortcutList[i].callback)
}
finishedScriptNumber++