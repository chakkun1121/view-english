'use client';
import { useRecoilState } from 'recoil';
import { settingsAtom, settingsMenu } from '../lib/settings';
import { CloseButton } from './CloseButton';
import { useHotkeys } from 'react-hotkeys-hook';
import ToggleSwitch from '../../_components/toggleSwitch';

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
          <label className="p-2 rounded dark:bg-gray-800 bg-gray-100 flex items-center">
            <ToggleSwitch
              isOn={settings[setting.key]}
              handleToggle={(isChecked) => setSettings({ ...settings, [setting.key]: isChecked })}
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
