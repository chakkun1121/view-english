'use client';
import { Button } from '@mui/material';
import { appVersion } from '../page';
import styles from './newTab.module.scss';
export default function NewTab() {
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
