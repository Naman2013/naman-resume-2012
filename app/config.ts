export const HASH = 'hash';
export const NON_HASH = 'non_hash';

const VALUES = new window.Map();
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

// MultiLanguage
export type LangItemConf = {
  locale: string;
  productID: number;
};
export type LangItemsConf = {
  [key: string]: LangItemConf;
};
const langConf: LangItemsConf = {
  'change.slooh.cn': {
    locale: 'cn',
    productID: 2,
  },
  'orion.slooh.com': {
    locale: 'orion-test-locale',
    productID: 123,
  },
  default: {
    locale: 'en',
    productID: 1,
  },
};

export const getLangConf = (): LangItemConf => {
  const hostname: string = window.location.hostname;
  return langConf[hostname] || langConf.default;
};
