const app = document.querySelector('main');
function Main() {
  return <>
    <Settingsheader />
    <Rendsettings />
  </>
}
function Settings() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", function () {
    console.log(this.responseText);
    Rendsettings(<h3>準備完了</h3>)
  });
  req.addEventListener("error", function () {
    Rendsettings(<>
      <h3 className="error">インターネット接続に失敗しました。</h3>
      <p>エラーコード:{error}</p>
    </>)
  });
  req.open("GET", "settings.json")//なぜか動かない
  req.send();
  Rendsettings(<></>)
}
function Rendsettings({ settings }) {
  return <>{settings}</>
}
function Settingsheader() {
  return <div className="settings-header">
    <h2>設定一覧</h2>
    <p>下から変更したい設定を指定してください</p>
  </div>
}
ReactDOM.render(<Main />, app)