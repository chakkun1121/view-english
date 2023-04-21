'use client';
/**
 * クエリパラメータを取得する
 * @returns {Object} queryObj
 */
export function getQuery(href) {
  const query = href?.split('?')[1];
  if (query) {
    const queryObj = {};
    query.split('&').forEach((q) => {
      const [key, value] = q.split('=');
      queryObj[key] = value;
    });
    return queryObj;
  }
  return null;
}
