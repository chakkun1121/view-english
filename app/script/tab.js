const tab = {
  new: function (title = "新しいタブ", HTMLdata = tab.getNewTabHTMLdata(), position = "left", purpose = "newtab") {
    tab.tabInfo[position].push({
      tabID: tab.tabInfo.lastTabID + 1,
      HTMLdata,
      title,
      purpose
    });
    tab.view(tab.tabInfo.lastTabID + 1)
    tab.tabInfo.lastTabID++
    tab.save()
    return tab.tabInfo.lastTabID;
  },
  close: function (tabID = tab.openedTab()) {
    // 閉じるタブを探してtabInfoから消去する
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].tabID == tabID) {
        tab.tabInfo.left.splice(i, 1)
        // 変更後、それで並び替えさせる
        // その後、前のタブを表示する
        if (tab.tabInfo.left.length) {
          tab.view(i - 1)
          tab.save()
        }
        tab.save()
        return;
      }
    }
    document.getElementById('rightTabs').innerHTML = ""
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      if (tab.tabInfo.right[i].tabID == tabID) {
        tab.tabInfo.right.splice(i, 1)
        // 変更後、それで並び替えさせる
        // その後、前のタブを表示する
        tab.view(i - 1)
        tab.save()
        return;
      }
    }
    console.error('指定されたIDのタブは存在しません。もう閉じられたのかもしれません。')
  },
  tabInfo: {
    left: [],
    right: [],
    lastTabID: 0
  },
  view: function (tabID = tab.openedTab()) {
    if (tabID == null) return;
    //表示するIDのタブが右に置くか左に置くかと表示するHTMLdataを取得する
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      tab.tabInfo.left[i].viewed = false
      if (tab.tabInfo.left[i].tabID == tabID) {
        tab.tabInfo.left[i].viewed = true
        tab.save()
        return;
      }
    }
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      tab.tabInfo.right[i].viewed = false
      if (tab.tabInfo.right[i].tabID == tabID) {
        tab.tabInfo.left[i].viewed = true
        tab.save()
        return;
      }
    }
  },
  getNewTabHTMLdata: function () {
    return `
      <div class="new-tab">
        <h1>和訳表示サイト${appVersion}</h1>
        <button onclick="openViewWayaku(${tab.tabInfo.lastTabID + 1})">和訳ファイルを開く</button>
      </div>
  `
  },
  save: function (isNotAdapt) {
    localStorage.setItem('tabInfo', JSON.stringify(tab.tabInfo))
    if (!isNotAdapt) tab.adaptationTabInfoToHTML()
  },
  HTMLcontent: {
    get: function (tabID = tab.openedTab()) {
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
    },
    change: function (tabID = tab.openedTab(), HTMLcontent) {
      for (let i = 0; i < tab.tabInfo.left.length; i++) {
        if (tab.tabInfo.left[i].tabID == tabID) {
          tab.tabInfo.left[i].HTMLdata = HTMLcontent
          tab.save()
          return;
        }
      }
      for (let i = 0; i < tab.tabInfo.right.length; i++) {
        if (tab.tabInfo.right[i].tabID == tabID) {
          tab.tabInfo.right[i].HTMLdata = HTMLcontent
          tab.save()
          return;
        }
      }
    }
  },
  title: {
    get: function (tabID = tab.openedTab()) {
      for (let i = 0; i < tab.tabInfo.left.length; i++) {
        if (tab.tabInfo.left[i].tabID == tabID) {
          return tab.tabInfo.left[i].title
        }
      }
      for (let i = 0; i < tab.tabInfo.right.length; i++) {
        if (tab.tabInfo.right[i].tabID == tabID) {
          return tab.tabInfo.right[i].title
        }
      }
    },
    change: function (tabID = tab.openedTab(), title = "新しいタブ") {
      for (let i = 0; i < tab.tabInfo.left.length; i++) {
        if (tab.tabInfo.left[i].tabID == tabID) {
          tab.tabInfo.left[i].title = title
          tab.save()
          return;
        }
      }
      for (let i = 0; i < tab.tabInfo.right.length; i++) {
        if (tab.tabInfo.right[i].tabID == tabID) {
          tab.tabInfo.right[i].title = title
          tab.save()
          return;
        }
      }
    }
  },
  purpose: {
    get: function (tabID = tab.openedTab()) {
      for (let i = 0; i < tab.tabInfo.left.length; i++) {
        if (tab.tabInfo.left[i].tabID == tabID) {
          return tab.tabInfo.left[i].purpose
        }
      }
      for (let i = 0; i < tab.tabInfo.right.length; i++) {
        if (tab.tabInfo.right[i].tabID == tabID) {
          return tab.tabInfo.right[i].purpose
        }
      }
    },
    change: function (tabID = tab.openedTab(), purpose = "新しいタブ") {
      for (let i = 0; i < tab.tabInfo.left.length; i++) {
        if (tab.tabInfo.left[i].tabID == tabID) {
          tab.tabInfo.left[i].purpose = purpose
          tab.save(true)
          return;
        }
      }
      for (let i = 0; i < tab.tabInfo.right.length; i++) {
        if (tab.tabInfo.right[i].tabID == tabID) {
          tab.tabInfo.right[i].purpose = purpose
          tab.save(ture)
          return;
        }
      }
    }
  },
  openedTab: function (position = "left") {
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
  adaptationTabInfoToHTML: function () {
    let isFindViewed = [false, false]
    document.getElementById('leftTabs').innerHTML = ""
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].viewed) {
        document.getElementById('mainContentLeft').innerHTML = tab.tabInfo.left[i].HTMLdata;
        isFindViewed[0] = true
      }
      document.getElementById('leftTabs').innerHTML += `
        <div class="tab">
          <button class="celect-view-tab-button reset" onclick="tab.view(${tab.tabInfo.left[i].tabID})">${tab.tabInfo.left[i].title}</button>
          <button class="tab-close-button reset" onclick="tab.close(${tab.tabInfo.left[i].tabID})">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `
    }
    if (!isFindViewed[0]) {
      document.getElementById('mainContentLeft').innerHTML = "タブが開かれていません。"

    }
    document.getElementById('rightTabs').innerHTML = ""
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      if (tab.tabInfo.right[i].viewed) {
        document.getElementById('mainContentRight').innerHTML = tab.tabInfo.right[i].HTMLdata;
      }
      document.getElementById('rightTabs').innerHTML += `
        <div class="tab">
          <button class="celect-view-tab-button reset" onclick="tab.view(${tab.tabInfo.right[i].tabID})">${tab.tabInfo.right[i].title}</button>
          <button class="tab-close-button reset" onclick="tab.close(${tab.tabInfo.right[i].tabID})">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `
    }
  }
}
if (localStorage.getItem("tabInfo")) {
  tab.tabInfo = JSON.parse(localStorage.getItem('tabInfo'))
  tab.adaptationTabInfoToHTML()
}
// 読み込み時の処理
finishedScriptNumber++