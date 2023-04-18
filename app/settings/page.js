export default function SettingsPage() {
  // settings.jsonを読み込む
  const settings = require('./settings.json');
  return (
    <>
      <title>設定|和訳表示サイト</title>
      <header>
        <h1>
          <a href="../">和訳表示サイト</a>の設定
        </h1>
      </header>
      <main>
        <div class="settings-header">
          <h2>設定一覧</h2>
          <p>下から変更したい設定を指定してください(設定は自動保存されます)</p>
        </div>
        <div id="settingsMain">
          {settings.map((setting) => (
            <Setting
              title={setting.name}
              type={setting.settingInputType}
              value={setting.initial}
              ID={setting.savedName}
              isFlag={setting.flag}
              key={setting.savedName}
            />
          ))}
        </div>
      </main>
    </>
  );
}

function Setting({ title, type, value, ID, isFlag }) {
  return (
    <div class="setting" key={ID}>
      <label>
        {isFlag ? 'flag(試験運用版)' : ''}
        {title}
        <input type={type} value={value} className="setting-input" id={ID} />
      </label>
    </div>
  );
}
