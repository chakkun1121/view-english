'use client';
import { useRecoilState } from 'recoil';
import { settingsAtom, settingsMenu } from '../lib/settings';
import ToggleSwitch from '../../_components/toggleSwitch';
import WinBox from '../../../winbox';

export default function SettingsPage({
  setIsShowSettings,
}: {
  setIsShowSettings: (isShow: boolean) => void;
}) {
  const [settings, setSettings] = useRecoilState(settingsAtom);
  return (
    <WinBox
      title="設定"
      onClose={() => setIsShowSettings(false)}
      noMax={true}
      noFull={true}
      top={60}
      bottom={60}
      x={document.body.clientWidth - (Math.min(document.body.clientWidth, 360) + 20)}
      y={60}
      z={100}
      width={Math.min(document.body.clientWidth, 360)}
      height={document.body.clientHeight - 120}
      className="flex"
    >
      <div className="flex-1 flex flex-col gap-4 p-4 bg-primary h-full">
        {settingsMenu.map((setting) => (
          <ToggleSwitch
            isOn={settings[setting.key]}
            handleToggle={(isChecked) => setSettings({ ...settings, [setting.key]: isChecked })}
            text={setting.title + (setting.isFlag && ' (flag)')}
          />
        ))}
      </div>
    </WinBox>
  );
}
