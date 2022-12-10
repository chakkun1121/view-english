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
    callback: function () { tab.changeTaborder() }
  },
  {
    key: "ctrl+1",
    function: "1番目のタブを表示します。",
    callback: function () { tab.view(1) }
  },
  {
    key: "ctrl+2",
    function: "2番目のタブを表示します。",
    callback: function () { tab.view(2) }
  },
  {
    key: "ctrl+e",
    function: "ファイルを編集します",
    callback: function () { editFile() }
  },
  {
    key: "ctrl+n",
    function: "新しいタブファイルの作成",
    callback: function () { newFile() }
  },
  {
    key: "ctrl+o",
    function: "ファイルを開きます",
    callback: function () { }
  },
  {
    key: "ctrl+r",
    function: "最新の状態に更新",
    callback: function () { tab.adaptationTabInfoToHTML() }
  },

  {
    key: "ctrl+s",
    function: "保存",
    callback: function () { saveWayaku() }
  },
  {
    key: "ctrl+t",
    function: "新しいタブを開く",
    callback: function () { tab.new() }
  },
  {
    key: "ctrl+w",
    function: "タブを閉じる",
    callback: function () { tab.close() }
  },
  {
    key: "alt+f",
    function: "フラッシュカードを開始する",
    callback: function () { cards.start() }
  }
]
appEvent.addEventListener('init', function () {
  for (let i = 0; i < shortcutList.length; i++) {
    shortcut.add(shortcutList[i].key, shortcutList[i].callback)
  }
})
finishedScriptNumber++
