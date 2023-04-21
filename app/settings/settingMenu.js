'use client';
import { Checkbox, FormControlLabel, List, ListItem } from '@mui/material';
import styles from './settings.module.scss';

export default function SettingMenu({ settings = [] }) {
  return (
    <List>
      {settings?.map((setting) => {
        return (
          <Setting
            title={setting.name}
            type={setting.settingInputType}
            value={setting.initial}
            ID={setting.savedName}
            isFlag={setting.flag}
            key={setting.savedName}
          />
        );
      })}
    </List>
  );
}
function Setting({ title = '', type = '', value = '', ID = '', isFlag = false }) {
  switch (type) {
    case 'checkbox':
      return (
        <ListItem className={styles.setting}>
          <FormControlLabel control={<Checkbox />} label={title} />
        </ListItem>
      );
    default:
      return (
        <ListItem className={styles.setting} key={ID}>
          <label>
            {isFlag ? 'flag(試験運用版)' : ''}
            {title}
            <input type={type} value={value} className="setting-input" id={ID} />
          </label>
        </ListItem>
      );
  }
}
