/**
 * 拡張子が.wayakuかを判断します。
 * @param {String} fileTitle
 * @returns
 */
export function isWayakuTitle(fileTitle: string) {
  if (!fileTitle) return;
  return fileTitle.split('.').pop() == 'wayaku';
}
