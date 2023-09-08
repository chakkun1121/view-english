'use client';

import { openWayakuFile } from '../lib/openWayakuFile';

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
