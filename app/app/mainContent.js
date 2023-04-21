'use client';
import { Button } from '@mui/material';
import { appVersion } from '../page';
import styles from './app.module.scss';
export default function MainContent({ fileID, type }) {
  console.log(fileID, type);
  switch (type) {
    case 'newTab':
      return <NewTab />;
    default:
      return <h1 className={styles.error}>error</h1>;
  }
}
function NewTab() {
  return (
    <div id="newTab">
      <h1>和訳表示サイト v{appVersion}</h1>
      <div className={styles['new-tab-file-buttons']}>
        <Button>和訳ファイルを開く</Button>
        <Button>新しくファイルを作成する</Button>
      </div>
    </div>
  );
}
