import { atom, useRecoilState } from 'recoil';

export interface settingsType {
  isDarkMode: boolean;
}
export const settingsAtom = atom<settingsType>({
  key: 'settings',
  default: {
    isDarkMode: false,
  },
});
export const settingsMenu = [
  {
    key: 'isDarkMode',
    type: 'boolean',
    title: 'ダークモード',
    isFlag: true,
  },
];
