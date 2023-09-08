/**
 * .html->.wayaku
 * @param {string} HTMLdata
 * @returns {string} wayakuData
 */
export function htmlToWayaku(HTMLdata: string): string {
  if (!HTMLdata) return;
  //改行を消す
  HTMLdata = HTMLdata.replace(/\r?\n/g, '');
  let start = HTMLdata.indexOf('<h1 class="title">');
  HTMLdata = HTMLdata.slice(start);
  let back = HTMLdata.indexOf('</div>');
  HTMLdata = HTMLdata.slice(0, -1 * (HTMLdata.length - back));
  return HTMLdata;
}
