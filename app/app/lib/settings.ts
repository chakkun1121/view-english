import { atom, useRecoilState } from 'recoil';

export interface settingsType {}
export const settingsAtom = atom<settingsType>({
  key: 'settings',
  default: {},
});

