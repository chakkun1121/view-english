import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface settingsType {
  isDarkMode: boolean;
}
const { persistAtom } = recoilPersist({
  //追加
  key: 'settings',
  storage: typeof window === 'undefined' ? undefined : localStorage,
});
export const settingsAtom = atom<settingsType>({
  key: 'settings',
  default: {
    isDarkMode: false,
  },
  effects_UNSTABLE: [persistAtom],
});
export const settingsMenu = [
  {
    key: 'isDarkMode',
    type: 'boolean',
    title: 'ダークモード',
    isFlag: true,
  },
];
