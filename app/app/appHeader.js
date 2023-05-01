'use client';
import { mainColor } from '../page';
import { useState } from 'react';

import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import styles from './appHeader.module.scss';
export default function AppHeader() {
  const [isOpenedFileMenu, setIsOpenedFileMenu] = useState(false);
  return (
    <>
      <Box
        position="static"
        sx={{ display: 'flex', flexDirection: 'row', backgroundColor: mainColor }}
      >
        <Menu>
          <MenuButton as={Button}>ファイル</MenuButton>
          <MenuList>
            <MenuItem>開く</MenuItem>
          </MenuList>
        </Menu>
        <HeaderButton text="編集" />
        <HeaderButton text="表示" />
        <HeaderButton
          text="ヘルプ"
          onClick={() => window.open('https://chakkun1121.github.io/help/view-english')}
        />
      </Box>
    </>
  );
}
function HeaderButton({ text = '', onClick = () => {} }) {
  return (
    <Button variant="text" color="primary" onClick={onClick}>
      {text}
    </Button>
  );
}
