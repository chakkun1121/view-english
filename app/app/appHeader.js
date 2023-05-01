'use client';
import { AppBar, Button } from '@mui/material';
import { mainColor } from '../page';
import { Box } from '@mui/system';
import { useState } from 'react';

import styles from './appHeader.module.scss';
export default function AppHeader() {
  const [isOpenedFileMenu, setIsOpenedFileMenu] = useState(false);
  return (
    <>
      <AppBar
        position="static"
        sx={{ display: 'flex', flexDirection: 'row', backgroundColor: mainColor }}
      >
        <HeaderButton text="ファイル" onClick={() => setIsOpenedFileMenu(!isOpenedFileMenu)} />
        <HeaderButton text="編集" />
        <HeaderButton text="表示" />
        <HeaderButton
          text="ヘルプ"
          onClick={() => window.open('https://chakkun1121.github.io/help/view-english')}
        />
      </AppBar>
      <Box className={`${isOpenedFileMenu ? styles.opened : styles.closed} ${styles['file-menu']}`}>
        <HeaderFileMunuButton text="開く" />
      </Box>
    </>
  );
}
function HeaderButton({ text = '', onClick = () => {} }) {
  return (
    <Button variant="text" color="primary" onClick={onClick} sx={{ color: 'black' }}>
      {text}
    </Button>
  );
}
function HeaderFileMunuButton({ text = '', onClick = () => {} }) {
  return (
    <Button variant="text" color="primary" onClick={onClick} sx={{ color: 'black' }}>
      {text}
    </Button>
  );
}
