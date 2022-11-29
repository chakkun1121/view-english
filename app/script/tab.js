const tab = {
  new: function (title = "新しいタブ", HTMLdata = tab.getNewTabHTMLdata(), position = "left") {
    tab.tabInfo[position].push({
      tabID: tab.tabInfo.lastTabID + 1,
      HTMLdata,
      title
    });
    tab.changeTaborder(tab.tabInfo)
    tab.view(tab.tabInfo.lastTabID + 1)
    tab.tabInfo.lastTabID++
    tab.saveTabInfo()
    return tab.tabInfo.lastTabID;
  }
  , close: function (tabID) {
    let closedTab;
    // 閉じるタブを探してtabInfoから消去する
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].tabID == tabID) {
        tab.tabInfo.left.splice(i, 1)
        tab.saveTabInfo()
        // 変更後、それで並び替えさせる
        tab.changeTaborder(tab.tabInfo)
        // その後、前のタブを表示する
        if (tab.tabInfo.left.length) {
          tab.view(i)
          return;
        }
        document.getElementById('mainContentsLeft').innerText = "タブが開かれていません。"
        return;
      }
    }
    document.getElementById('rightTabs').innerHTML = ""
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      if (tab.tabInfo.right[i].tabID == tabID) {
        tab.tabInfo.right.splice(i, 1)
        tab.saveTabInfo()
        // 変更後、それで並び替えさせる
        tab.changeTaborder(tab.tabInfo)
        // その後、前のタブを表示する
        tab.view(i)
        return;
      }
    }
    console.error('指定されたIDのタブは存在しません。もう閉じられたのかもしれません。')
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
          <button class="tab-close-button reset" onclick="tab.close(${newTabOrderIdArrey.left[i].tabID})">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `
    }
    document.getElementById('rightTabs').innerHTML = ""
    for (let i = 0; i < newTabOrderIdArrey.right.length; i++) {
      document.getElementById('rightTabs').innerHTML += `
        <div class="tab">
          <button class="celect-view-tab-button reset" onclick="tab.view(${newTabOrderIdArrey.right[i].tabID})">${newTabOrderIdArrey.right[i].title}</button>
          <button class="tab-close-button reset" onclick="tab.close(${newTabOrderIdArrey.right[i].tabID})">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `
    }
    tab.saveTabInfo()
  }
  , tabInfo: {
    left: [],
    right: [],
    lastTabID: 0
  }
  , view: function (tabID = tab.openedTab()) {
    if (tabID == null) return;
    //表示するIDのタブが右に置くか左に置くかと表示するHTMLdataを取得する
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      tab.tabInfo.left[i].viewed = false

      if (tab.tabInfo.left[i].tabID == tabID) {
        tab.tabInfo.left[i].viewed = true
        document.getElementById('mainContentsLeft').innerHTML = tab.tabInfo.left[i].HTMLdata;
        tab.saveTabInfo()
        return;
      }
    }
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      tab.tabInfo.right[i].viewed = false
      if (tab.tabInfo.right[i].tabID == tabID) {
        tab.tabInfo.left[i].viewed = true
        document.getElementById('mainContentsRight').innerHTML = tab.tabInfo.right[i].HTMLdata;
        tab.saveTabInfo()
        return;
      }
    }
  }
  ,
  getNewTabHTMLdata: function () {
    return `
      <div class="new-tab">
        <h1>和訳表示サイト${appVersion}</h1>
        <button onclick="openViewWayaku(${tab.tabInfo.lastTabID + 1})">和訳ファイルを開く</button>
      </div>
  `
  },
  saveTabInfo: function () {
    localStorage.setItem('tabInfo', JSON.stringify(tab.tabInfo))
  },
  viewHTMLcontent: function (tabID, HTMLcontent, title) {
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].tabID == tabID) {
        tab.tabInfo.left[i].HTMLdata = HTMLcontent
        tab.tabInfo.left[i].title = title
        tab.changeTaborder(tab.tabInfo)
        tab.saveTabInfo()
        return;
      }
    }
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      if (tab.tabInfo.right[i].tabID == tabID) {
        tab.tabInfo.right[i].HTMLdata = HTMLcontent
        tab.tabInfo.right[i].title = title
        tab.changeTaborder(tab.tabInfo)
        tab.saveTabInfo()

        return;
      }
    }
  }, getHTMLcontent: function (tabID) {
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].tabID == tabID) {
        return tab.tabInfo.left[i].HTMLdata
      }
    }
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      if (tab.tabInfo.right[i].tabID == tabID) {
        return tab.tabInfo.right[i].HTMLdata

      }
    }
  }, changeTabName: function (tabID, newName) {

  }, openedTab: function (position = "left") {
    if (position = "right") {
      for (let i = 0; i < tab.tabInfo.right.length; i++) {
        if (tab.tabInfo.right[i].viewed) {
          return tab.tabInfo.right[i].tabID

        }
      }
    }
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].viewed) {
        return tab.tabInfo.left[i].tabID
      }
    }
  },
  changeHTMLcontentOnlyTabInfo: function (tabID = tab.openedTab(), data) {
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].tabID == tabID) {
        tab.tabInfo.left[i].HTMLdata = data;
        tab.saveTabInfo()
        return;
      }
    }
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      if (tab.tabInfo.right[i].tabID == tabID) {
        tab.tabInfo.right[i].HTMLdata = data;
        tab.saveTabInfo()
        return;
      }
    }


  }

}


if (localStorage.getItem("tabInfo")) {
  tab.tabInfo = JSON.parse(localStorage.getItem('tabInfo'))
  tab.changeTaborder(tab.tabInfo)
}
// 読み込み時の処理
finishedScriptNumber++