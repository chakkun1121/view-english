import { useState } from 'react';

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

  const handleFileChange = async () => {
    const fileText = await loadFile();
    setWayakuData(fileText);
  };

  return (
    <div>
      <button onClick={handleFileChange}>ファイルを選択する</button>
      <div>{wayakuData}</div>
    </div>
  );
}

export default WayakuApp;
