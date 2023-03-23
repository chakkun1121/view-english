window.tab = {
  new: function (title = '新しいタブ') {
    const newTabID = `tab-${UUID.generate()}`;
    const newTabDOM = document.createElement('iframe');
    newTabDOM.src = 'file/file.html';
    newTabDOM.id = newTabID + '-iframe';
    document.getElementById('mainContent').appendChild(newTabDOM);
    const tabDom = document.createElement('div');
    tabDom.id = newTabID;
    tabDom.classList.add('tab');
    tabDom.innerHTML = `
      <button class="celect-view-tab-button reset" id="showTab${newTabID}" onclick='tab.view("${newTabID}")'>${title}</button>
      <button class="tab-close-button reset text-icon close-icon" onclick='tab.close("${newTabID}")'>×</button>
    `;
    document.getElementById('tabs').appendChild(tabDom);
    this.tabInfo.tabs.push({
      tabID: newTabID,
      title: title,
      viewed: true,
    });
    this.view(newTabID);
    return newTabID;
  },
  close: function (tabID = tab.openedTab()) {
    tab.tabInfo.tabs = tab.tabInfo.tabs.filter((tab) => tab.tabID !== tabID);
    //DOMから消去する
    document.getElementById(tabID + '-iframe').remove();
    document.getElementById(tabID + '-tab').remove();
    console.error('指定されたIDのタブは存在しません。もう閉じられたのかもしれません。');
  },
  tabInfo: {
    tabs: [],
    version: appVersion,
  },
  view: function (tabID) {
    if (tabID == null) return;
    tab.tabInfo.tabs.forEach((tab) => {
      tab.viewed = false;
      document.getElementById(tab.tabID + '-iframe').classList.add('hidden');
      document.getElementById(tab.tabID).classList.remove('opened-tab');
    });
    tab.tabInfo.tabs.filter((tab) => tab.tabID == tabID)[0].viewed = true;
    document.getElementById(tabID + '-iframe').classList.remove('hidden');
    document.getElementById(tabID).classList.add('opened-tab');
  },
  title: {
    get: function (tabID = tab.openedTab()) {
      return tab.tabInfo.tabs.filter((tab) => tab.tabID == tabID)[0].title;
    },
    change: function (tabID = tab.openedTab(), title = '新しいタブ') {
      for (let i = 0; i < tab.tabInfo.tabs.length; i++) {
        if (tab.tabInfo.tabs[i].tabID == tabID) {
          tab.tabInfo.tabs[i].title = title;
          return;
        }
      }
      throw `指定されたタブID(${tabID})のタブが見つかりませんでした。`;
    },
  },
  openedTab: function () {
    return tab.tabInfo.tabs.filter((tab) => tab.viewed)[0].tabID;
  },
};
