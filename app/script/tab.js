const tab = {
  new: function (HTMLdata, position = "left") {
    tab.tabInfo[position].push({
      tabId: tab.tabInfo.lastTabId++,
      HTMLdata
    });
    tab.viewTab(tab.tabInfo.lastTabId)
    tab.tabInfo.lastTabId++
    return tab.tabInfo.lastTabId;
  }
  , close: function (tabID) {

  },
  getTabInfo: function () {
    return tab.tabInfo;
  }
  , changeTaborder(newTabOrderIdArrey) {
    if (!newTabOrderIdArrey) return;
  }
  , tabInfo: {
    left: [],
    right: [],
    lastTabId: 0
  }
  , viewTab: function (tabID) {
    if (!tabID) return;
    //表示するIDのタブが右に置くか左に置くかと表示するHTMLdataを取得する
    //それを表示する
  }
  , viewedTabID: {
    left: null,
    right: null
  }
}