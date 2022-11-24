const tab = {
  new: function (title = "新しいタブ", HTMLdata = "", position = "left",) {
    tab.tabInfo[position].push({
      tabID: tab.tabInfo.lastTabID++,
      HTMLdata,
      title
    });
    tab.changeTaborder(tab.tabInfo)
    tab.viewTab(tab.tabInfo.lastTabID)
    tab.tabInfo.lastTabID++
    return tab.tabInfo.lastTabID;
  }
  , close: function (tabID) {

  },
  getTabInfo: function () {
    return tab.tabInfo;
  }
  , changeTaborder(newTabOrderIdArrey) {
    if (!newTabOrderIdArrey) return;
    console.log(newTabOrderIdArrey)
    for (let i = 0; i < newTabOrderIdArrey.left.length; i++) {
      document.getElementById('leftTabs').innerHTML += `
        <div class="tab">
          <button class="celect-view-tab-button reset" onclick="tab.view(${newTabOrderIdArrey.left[i].tabID})">${newTabOrderIdArrey.left[i].title}</button>
          <button class="tab-close-button reset" onclick="tab.close(${newTabOrderIdArrey.left[i].tabID})">×</button>
        </div>
      `
      console.log(newTabOrderIdArrey.left[i].title)
    }
  }
  , tabInfo: {
    left: [],
    right: [],
    lastTabID: 0
  }
  , viewTab: function (tabID) {
    if (!tabID) return;
    //表示するIDのタブが右に置くか左に置くかと表示するHTMLdataを取得する
    //それを表示する
  }
  , viewedTabID: {
    left: null,
    right: null
  },
  newTabHTMLData: `
    <h1>和訳表示サイト${appVersion}</h1>
    <button onclick="openWayakuFile()">和訳ファイルを開く</button>
  `
}