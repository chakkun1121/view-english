const shortcutList = [
  // {
  //   key: "f1",
  //   function: "ヘルプを表示",
  //   callback: ''
  // },
  {
    key: 'f2',
    function: 'ファイル名の変更',
    callback: function () {
      editFile();
    },
  },
  {
    key: 'ctrl+e',
    function: 'ファイルを編集します',
    callback: function () {
      editFile();
    },
  },
  {
    key: 'ctrl+n',
    function: '新しいタブファイルの作成',
    callback: function () {
      newFile();
    },
  },
  {
    key: 'ctrl+o',
    function: 'ファイルを開きます',
    callback: function () {},
  },
  {
    key: 'ctrl+s',
    function: '保存',
    callback: function () {
      saveWayaku();
    },
  },
  {
    key: 'ctrl+t',
    function: '新しいタブを開く',
    callback: function () {},
  },
  {
    key: 'ctrl+w',
    function: 'タブを閉じる',
    callback: function () {},
  },
  {
    key: 'alt+f',
    function: 'フラッシュカードを開始する',
    callback: function () {
      cards.start();
    },
  },
];
window.addEventListener('shortcutInit', function () {
  shortcutList.forEach((shortcutList) => {
    shortcut.add(shortcutList.key, shortcutList.callback);
  });
});
