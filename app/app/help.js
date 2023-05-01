'use client';
import styles from './help.module.scss';
import { Box, Fab } from '@mui/material';
import { mainColor } from '../page';
import HelpIcon from '@mui/icons-material/Help';
const helpURL = 'https://chakkun1121.github.io/help/view-english';
export default function Help() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab
        color="main"
        aria-label="ヘルプ"
        onClick={() => window.open(helpURL, '_target')}
        className={styles.help}
      >
        <HelpIcon color={mainColor} />
      </Fab>
    </Box>
  );
}
