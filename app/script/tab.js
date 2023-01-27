const tab = {
  new: function (title = "新しいタブ", HTMLdata = this.newTabData, position = "left", purpose = "newtab") {
    const newTabID = `tab-${UUID.generate()}`;
    HTMLdata = HTMLdata.replace(/<tabID\/>/g, `"${newTabID}"`)
    tab.tabInfo[position].push({
      tabID: newTabID,
      HTMLdata,
      title,
      purpose
    });
    tab.view(newTabID)
    tab.save()
    return newTabID;
  },
  close: function (tabID = tab.openedTab()) {
    // 閉じるタブを探してtabInfoから消去する
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].tabID == tabID) {
        tab.tabInfo.left.splice(i, 1)
        // その後、前のタブを表示する
        if (tab.tabInfo.left.length) {
          tab.view(tab.tabInfo.left[i == 0 ? i : i - 1].tabID)
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
        tab.view(tab.tabInfo.right[1 == 0 ? i : i - 1].tabID)
        tab.save()
        return;
      }
    }
    console.error('指定されたIDのタブは存在しません。もう閉じられたのかもしれません。')
  },
  tabInfo: {
    left: [],
    right: [],
    version: appVersion
  },
  view: function (tabID) {
    if (tabID == null) return;
    //表示するIDのタブが右に置くか左に置くかと表示するHTMLdataを取得する
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      tab.tabInfo.left[i].viewed = false
      if (tab.tabInfo.left[i].tabID == tabID) {
        tab.tabInfo.left[i].viewed = true
      }
    }
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      tab.tabInfo.right[i].viewed = false
      if (tab.tabInfo.right[i].tabID == tabID) {
        tab.tabInfo.left[i].viewed = true
      }
    }
    tab.save()
    tab.adaptationTabInfoToHTML()
  },
  newTabData: `
      <div class="new-tab">
        <h1>和訳表示サイト${appVersion}</h1>
        <button onclick='openViewWayaku(<tabID/>)'>和訳ファイルを開く</button>
      </div>`
  ,
  save: function (isNotAdapt) {
    requestIdleCallback(function () {
      localStorage.setItem('tabInfo', JSON.stringify(tab.tabInfo))
    }, {
      timeout: 10000
    })
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
    change: function (tabID = tab.openedTab(), HTMLcontent, title,purpose) {
      if (title) tab.title.change(tabID, title)
      if(purpose) tab.purpose.change(tabID,purpose)
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
      console.error(`指定されたタブID(${tabID})のタブが見つかりませんでした。`)
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
  tabHTMLdata: `
    <div class="tab">
      <button class="celect-view-tab-button reset" onclick='tab.view(<tabID/>)'><title/></button>
      <button class="tab-close-button reset text-icon close-icon" onclick='tab.close(<tabID/>)'>×</button>
    </div>
  `,
  adaptationTabInfoToHTML: function () {
    let isFindViewed = [false, false]
    document.getElementById('leftTabs').innerHTML = ""
    for (let i = 0; i < tab.tabInfo.left.length; i++) {
      if (tab.tabInfo.left[i].viewed) {
        document.getElementById('mainContentLeft').innerHTML = tab.tabInfo.left[i].HTMLdata;
        isFindViewed[0] = true
      }
      document.getElementById('leftTabs').innerHTML += this.tabHTMLdata.replace(/<tabID\/>/g, `"${this.tabInfo.left[i].tabID}"`).replace(/<title\/>/g, this.tabInfo.left[i].title)
    }
    if (!isFindViewed[0]) {
      document.getElementById('mainContentLeft').innerHTML = "タブが開かれていません。"

    }
    document.getElementById('rightTabs').innerHTML = ""
    for (let i = 0; i < tab.tabInfo.right.length; i++) {
      if (tab.tabInfo.right[i].viewed) {
        document.getElementById('mainContentRight').innerHTML = tab.tabInfo.right[i].HTMLdata;
      }
      document.getElementById('rightTabs').innerHTML += this.tabHTMLdata.replace(/<tabID\/>/g, `"${this.tabInfo.left[i].tabID}"`).replace(/<title\/>/g, this.tabInfo.left[i].title)
    }
  }
}
if (localStorage.getItem("tabInfo")) {
  if (JSON.parse(localStorage.getItem('tabInfo')).version == appVersion) {
    tab.tabInfo = JSON.parse(localStorage.getItem('tabInfo'))
    tab.adaptationTabInfoToHTML()
  } else {
    localStorage.removeItem("tabInfo")
  }
}
// 読み込み時の処理
finishedScriptNumber++