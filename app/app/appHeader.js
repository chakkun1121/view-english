'use client';
import { AppBar, Button } from '@mui/material';
import { mainColor } from './page';
export default function AppHeader() {
  return (
    <>
      <AppBar
        position="static"
        sx={{ display: 'flex', flexDirection: 'row', backgroundColor: mainColor }}
      >
        <HeaderButton text="ファイル" />
        <HeaderButton text="編集" />
        <HeaderButton text="表示" />
        <HeaderButton
          text="ヘルプ"
          onClick={() => window.open('https://chakkun1121.github.io/help/view-english')}
        />
      </AppBar>
    </>
  );
}
function HeaderButton({ text = '', onClick = () => {} }) {
  return (
    <Button variant="text" color="primary" onClick={onClick} sx={{ color: 'white' }}>
      {text}
    </Button>
  );
}
