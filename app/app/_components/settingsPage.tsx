'use client';
import { useRecoilState } from 'recoil';
import { settingsAtom } from '../lib/settings';
import { CloseButton } from './CloseButton';

export default function SettingsPage({ close }: { close: () => void }) {
  const [settings, setSettings] = useRecoilState(settingsAtom);
  return (
    <section>
      <div className="flex">
        <h2 className="flex-1">設定</h2>
        <CloseButton close={close} />
      </div>
    </section>
  );
}
