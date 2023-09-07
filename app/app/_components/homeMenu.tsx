'use client';

import { openWayakuFile } from '../lib/wayaku';

export function HomeMenu({ setFileContent }) {
  return (
    <>
      <section>
        <button
          onClick={async () => {
            const file = await openWayakuFile();
            setFileContent(file);
          }}
        >
          ファイルを開く
        </button>
      </section>
    </>
  );
}
