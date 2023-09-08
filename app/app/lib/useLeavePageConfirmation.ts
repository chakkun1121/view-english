import { useEffect } from 'react';
import Router from 'next/router';
import { useBeforeUnload } from 'react-use';

export const useLeavePageConfirmation = (
  showAlert = true,
  message = 'ファイルが保存されていませんがこのまま移動しますか？'
) => {
  useBeforeUnload(showAlert, message);

  useEffect(() => {
    const handler = () => {
      if (showAlert && !window.confirm(message)) {
        throw 'キャンセル';
      }
    };

    Router.events.on('routeChangeStart', handler);

    return () => {
      Router.events.off('routeChangeStart', handler);
    };
  }, [showAlert, message]);
};
