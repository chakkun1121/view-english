'use client';
import { AppBar, Button, Toolbar, Box } from '@mui/material';

export default function AppHeader() {
  return (
    <>
      <AppBar position="static" sx={{ display: 'flex', flexDirection: 'row' }}>
        <HeaderButton text="ファイル" />
        <HeaderButton text="編集" />
        <HeaderButton text="表示" />
        <HeaderButton text="ヘルプ" />
      </AppBar>
    </>
  );
}
function HeaderButton({ text, onClick = () => {} }) {
  return (
    <Button variant="text" color="primary" onClick={onClick} sx={{ color: 'white' }}>
      {text}
    </Button>
  );
}
