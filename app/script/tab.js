const tab = {
  new: function (title = "新しいタブ", HTMLdata = tab.newTabHTMLData, position = "left",) {
    tab.tabInfo[position].push({
      tabID: tab.tabInfo.lastTabID + 1,
      HTMLdata,
      title
    });
    tab.changeTaborder(tab.tabInfo)
    tab.view(tab.tabInfo.lastTabID + 1)
    tab.tabInfo.lastTabID++
    return tab.tabInfo.lastTabID;
  }
  , close: function (tabID) {
    // 閉じるタブを探してtabInfoから消去する
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].tabID == tabID) {
        tab.tabInfo.left.splice(i, 1)
      }
    }
    document.getElementById('rightTabs').innerHTML = ""
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      if (tab.tabInfo.right[i].tabID == tabID) {
        tab.tabInfo.right.splice(i, 1)
      }
    }
    // 変更後、それで並び替えさせる
    tab.changeTaborder(tab.tabInfo)
    // その後、前のタブを表示する
  },
  getTabInfo: function () {
    return tab.tabInfo;
  }
  , changeTaborder(newTabOrderIdArrey) {
    if (!newTabOrderIdArrey) return;
    document.getElementById('leftTabs').innerHTML = ""
    for (let i = 0; i < newTabOrderIdArrey.left.length; i++) {
      document.getElementById('leftTabs').innerHTML += `
        <div class="tab">
          <button class="celect-view-tab-button reset" onclick="tab.view(${newTabOrderIdArrey.left[i].tabID})">${newTabOrderIdArrey.left[i].title}</button>
          <button class="tab-close-button reset" onclick="tab.close(${newTabOrderIdArrey.left[i].tabID})">×</button>
        </div>
      `
    }
    document.getElementById('rightTabs').innerHTML = ""
    for (let i = 0; i < newTabOrderIdArrey.right.length; i++) {
      document.getElementById('rightTabs').innerHTML += `
        <div class="tab">
          <button class="celect-view-tab-button reset" onclick="tab.view(${newTabOrderIdArrey.right[i].tabID})">${newTabOrderIdArrey.right[i].title}</button>
          <button class="tab-close-button reset" onclick="tab.close(${newTabOrderIdArrey.right[i].tabID})">×</button>
        </div>
      `
    }
  }
  , tabInfo: {
    left: [],
    right: [],
    lastTabID: 0
  }
  , view: function (tabID) {
    if (tabID == null) return;
    //表示するIDのタブが右に置くか左に置くかと表示するHTMLdataを取得する
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].tabID == tabID) {
        document.getElementById('mainContentsLeft').innerHTML = tab.tabInfo.left[i].HTMLdata;
        return;
      }
    }
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      if (tab.tabInfo.right[i].tabID == tabID) {
        document.getElementById('mainContentsRight').innerHTML = tab.tabInfo.right[i].HTMLdata;
        return;
      }
    }
  }
  ,
  newTabHTMLData: `
  <div class="new-tab">
    <h1>和訳表示サイト${appVersion}</h1>
    <button onclick="openWayakuFile()">和訳ファイルを開く</button>
  </div>
  `
}