'use client';
import WinBox from '../../../winbox';

export function HelpPage({
  setIsShowHelpPage,
}: {
  setIsShowHelpPage: (isShowHelpPage: boolean) => void;
}) {
  return (
    <WinBox
      title="ヘルプ"
      noFull={true}
      y={60}
      z={100}
      url="help?header=false"
      themeColor="#7aa1d6"
      onClose={() => setIsShowHelpPage(false)}
    />
  );
}
