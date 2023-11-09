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
      top={60}
      bottom={60}
      x={document.body.clientWidth - (Math.min(document.body.clientWidth, 360) + 12)}
      y={60}
      z={100}
      width={Math.min(document.body.clientWidth, 360)}
      height={document.body.clientHeight - 120}
      url="embeddedHelpPage"
      themeColor="#7aa1d6"
      noMax={true}
      onClose={() => setIsShowHelpPage(false)}
    />
  );
}
