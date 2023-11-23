'use client';
import WinBox from '../../../winbox';
import { themeColor } from '../../meta';

export function HelpPage({
  setIsShowHelpPage,
}: {
  setIsShowHelpPage: (isShowHelpPage: boolean) => void;
}) {
  return (
    <WinBox
      title="ヘルプ"
      noFull={true}
      top={document.body.clientWidth < 768 ? 0 : 60}
      bottom={document.body.clientWidth < 768 ? 60 : 0}
      x={document.body.clientWidth - (Math.min(document.body.clientWidth, 360) + 12)}
      y={60}
      z={100}
      width={Math.min(document.body.clientWidth, 360)}
      height={document.body.clientHeight - 70}
      url="embeddedHelpPage"
      themeColor={themeColor}
      noMax={true}
      onClose={() => setIsShowHelpPage(false)}
    />
  );
}
