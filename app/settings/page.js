import SettingMenu from './settingMenu';
import styles from './settings.module.scss';
export default function SettingsPage() {
  // settings.jsonを読み込む
  const settings = require('./settings.json')?.settings || [];
  return (
    <>
      <title>設定|和訳表示サイト</title>
      <header className={styles.header}>
        <h1>
          <a href="../">和訳表示サイト</a>の設定
        </h1>
      </header>
      <main className={styles.main}>
        <div className={styles['settings-header']}>
          <h2>設定一覧</h2>
          <p>下から変更したい設定を指定してください(設定は自動保存されます)</p>
        </div>
        <div id="settingsMain">
          <SettingMenu settings={settings} />
        </div>
      </main>
    </>
  );
}
