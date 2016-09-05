export function isNotEmptyObject(obj) {
  return typeof obj === 'object' && Object.keys(obj).length;
}
