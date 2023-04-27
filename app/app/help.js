'use client';
import { Fab } from '@mui/material';
import styles from './help.module.scss';
import { mainColor } from '../page';
import HelpIcon from '@mui/icons-material/Help';

export default function Help() {
  return (
    <a href="https://chakkun1121.github.io/help/view-english" target="_blank">
      <Fab color={mainColor} aria-label="ヘルプ" className={styles.help}>
        <HelpIcon color={mainColor} sx={{ m: 1 }} />
      </Fab>
    </a>
  );
}
