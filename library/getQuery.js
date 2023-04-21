'use client';
/**
 * 
 * @returns {Object} queryObj
 */
export function getQuery() {
  const query = window.location.href.split('?')[1];
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
