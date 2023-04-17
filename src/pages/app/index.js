import { Head } from 'next/document';
import { useState } from 'react';
import { changeStyle } from '/components/script/wayakuStyle';
import AppHeader from '/components/app/appHeader';

async function loadFile() {
  // "Open File" ダイアログを開く
  if (!window.showOpenFilePicker) {
    console.error('showOpenFilePickerが利用できません。和訳表示サイト軽量版をご利用ください。');
    return new Error('showOpenFilePickerが利用できません。和訳表示サイト軽量版をご利用ください。');
  }
  const fhList = await window.showOpenFilePicker({
    types: [
      {
        description: 'wayakuファイル',
        accept: {
          'application/dxf': ['.wayaku'],
        },
      },
      {
        description:
          '和訳HTMLファイル(配布終了ずみだが互換性を保つためにあります。そろそろ廃止しますので和訳ファイルに変換してください。)',
        accept: {
          'text/html': ['.html'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: true,
    mode: 'readwrite',
  });
  const file = await fhList[0].getFile();
  return file.text();
}

function WayakuApp() {
  const [wayakuData, setWayakuData] = useState('');
  const [contents, setContents] = useState('');
  const [viewedTabID, setViewedTabID] = useState('');
  const openFile = async () => {
    const fileText = await loadFile();
    setWayakuData(fileText);
  };

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>和訳表示サイト</title>
        <link rel="apple-touch-icon" href="/apple.png" async />
        <link rel="icon" href="../favicon.ico" id="favicon" async />
        <link rel="manifest" href="manifest.webmanifest" defer />
        {/* アプリ本体はあまり内容がないためクロール禁止 */}
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#7aa1d6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="canonical" content="https://chakkun1121.github.io/view-english/app/" />
        <meta
          name="description"
          content="和訳表示サイトのアプリ本体です。ローカルに保存されている和訳ファイル(.wayakuなど)を表示、編集できます。"
        />
      </Head>

      <div id="loading">
        <div class="loader"></div>
        <h1>
          読み込み中です。しばらくお待ち下さい。万が一このまましばらく起動しなかったら、
          <a href="https://forms.gle/7dTCpKn1NGKahxPR8" target="_blank">
            お問い合わせ
          </a>
          ください。
        </h1>
        <div id="loadErrorMessage"></div>
      </div>
      <AppHeader />
      <div class="tabs">
        <div id="tabs">
          <Tabs />
        </div>
        <div class="new-tab-button">
          <button class="reset text-icon" onclick="tab.new()" aria-label="新しいタブを開く">
            +
          </button>
        </div>
      </div>
      <div id="mainContent">
        <Contents wayakuData={wayakuData} />
      </div>
      <div class="help-button">
        <a href="/help/view-english/" target="_blank">
          ?
        </a>
      </div>
    </>
  );
}
function Contents(wayakuData) {
  return <Content wayakuData={wayakuData} />;
}
function Content(wayakuData) {
  return <div id="content">{wayakuData}</div>;
}

function Tabs() {}
function Tab() {}

export default WayakuApp;
