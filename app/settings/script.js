const app = document.querySelector('main');
function Main() {
  return <h2>設定一覧</h2>
}
function settingsHeader() {
  return <>
    <h2>設定一覧</h2>
    <p>下から変更したい設定を指定してください</p>
  </>
}
ReactDOM.render(<Main/>, app)