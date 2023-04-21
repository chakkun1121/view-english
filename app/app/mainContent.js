import { Button } from '@mui/material';
import { appVersion } from '../page';
export default function MainContent({ fileID, type }) {
  console.log(fileID, type);
  switch (type) {
    case 'newTab':
      return <NewTab />;
    default:
      return <h1>error</h1>;
  }
}
function NewTab() {
  return (
    <div id="newTab" class="">
      <h1>
        和訳表示サイト
        <spen id="showAppVersison">v{appVersion}</spen>
      </h1>
      <div class="new-tab-file-buttons">
        <Button>和訳ファイルを開く</Button>
        <Button>新しくファイルを作成する</Button>
      </div>
    </div>
  );
}
