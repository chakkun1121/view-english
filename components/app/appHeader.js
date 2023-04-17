export default function appHeader() {
  return (
    <>
      <div id="headerButtons">
        <button
          type="button"
          class="tool-bar-button"
          id="fileButton"
          onclick="document.querySelector('#headerFileMenu').classList.toggle('header-file-menu-opened')"
        >
          ファイル
        </button>
        <HeaderBotton onClick={changeStyle} text="表示切替" />
        <HeaderBotton onClick={cards.start} text="フラッシュカード" />
      </div>
      <div id="headerFileMenu">
        <HeaderFileMenuButton onClick={changeStyle} text="表示切替" />
        <HeaderFileMenuButton onClick={cards.start} text="フラッシュカード" />
        <HeaderFileMenuButton onClick={editFile} text="編集" />
        <HeaderFileMenuButton onClick={window.open('../settings', '_target')} text="設定" />
        <HeaderFileMenuButton onClick={saveWayaku} text="保存" />
        <HeaderFileMenuButton onClick={print} text="印刷" />
        <HeaderFileMenuButton onClick={updata} text="アプリの手動更新" />
        <HeaderFileMenuButton onClick={resetApp} text="アプリをリセット" />
      </div>
    </>
  );
}
function HeaderBotton({ onClick, text }) {
  return (
    <button class="header-file-menu-button" onClick={onClick}>
      {text}
    </button>
  );
}
function HeaderFileMenuButton({ onClick, text }) {
  return (
    <button class="header-file-menu-button" onClick={onClick}>
      {text}
    </button>
  );
}
