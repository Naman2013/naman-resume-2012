export const HASH = 'hash';
export const NON_HASH = 'non_hash';

const VALUES = new Map();
VALUES.set('navigationStyle', '');

const SETTINGS = {
  isHashHistory() {
    return VALUES.get('navigationStyle') === HASH;
  },
  setHistoryType(newHistoryType = '') {
    VALUES.set('navigationStyle', newHistoryType);
  },
  resetToDefault() {
    VALUES.set('navigationStyle', HASH);
  },
  get historyType() {
    return VALUES.get('navigationStyle');
  },
};

export default SETTINGS;
