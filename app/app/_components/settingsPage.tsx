'use client';
import { useRecoilState } from 'recoil';
import { settingsAtom, settingsMenu } from '../lib/settings';
import { CloseButton } from './CloseButton';
import { useHotkeys } from 'react-hotkeys-hook';

export default function SettingsPage({ close }: { close: () => void }) {
  useHotkeys('esc', close, {
    preventDefault: true,
  });
  const [settings, setSettings] = useRecoilState(settingsAtom);
  return (
    <section className="select-none">
      <div className="flex p-2">
        <h2 className="flex-1">設定</h2>
        <CloseButton close={close} />
      </div>
      <div className="flex flex-col gap-4 p-4">
        {settingsMenu.map((setting) => (
          <label className="p-2 rounded bg-gray-100 flex items-center">
            <input
              type="checkbox"
              checked={settings[setting.key]}
              onChange={(e) => setSettings({ ...settings, [setting.key]: e.target.checked })}
              className="flex-none"
            />
            <span className="flex-1">
              {setting.title}
              {setting.isFlag && ' (flag)'}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
