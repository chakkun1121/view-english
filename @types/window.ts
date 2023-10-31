// WindowWithLaunchQueueを追加する
interface WindowWithLaunchQueue extends Window {
  launchQueue?: {
    setConsumer: (callback: ({ files }: { files: FileSystemFileHandle[] }) => void) => void;
  };
}
