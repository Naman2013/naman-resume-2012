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
export type ProjectConf = {
  locale: string;
  SENTRY_ENV?: string;
  PUBNUB_CHANNEL_PREFIX?: string;
  COOKIE_DOMAIN?: string;
  productID: number;
};
export type ProjectsConf = {
  [key: string]: ProjectConf;
};
const langConf: ProjectsConf = {
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

export const getProjectConf = (): ProjectConf => {
  const { hostname } = window.location;
  return langConf[hostname] || langConf.default;
};

export const getProjectLocale = () => getProjectConf().locale;
