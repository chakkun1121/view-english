'use client';
import { Button } from '@mui/material';

export default function AppHeader() {
  return (
    <>
      <HeaderButton text="ファイル" />
      <HeaderButton text="編集" />
      <HeaderButton text="表示" />
      <HeaderButton text="ヘルプ" />
    </>
  );
}
function HeaderButton({ text, onClick = () => {} }) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {text}
    </Button>
  );
}
