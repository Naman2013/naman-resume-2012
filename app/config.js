export const HASH = 'hash';

const VALUES = new Map();
VALUES.set('navigationStyle', HASH);

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
