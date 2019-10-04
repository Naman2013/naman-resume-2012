import projectsConf from '../../project-config.json';

export type ProjectConf = {
  SENTRY_ENV?: 'PRODUCTION' | 'TEST';
  COOKIE_DOMAIN?: string;
  locale: 'en' | 'cn';
  productID: number | string;
  PUBNUB_CHANNEL_PREFIX?: 'prod' | 'dev';
  PUBNUB_FEEDS_SUBKEY?: string;
  PUBNUB_FEEDS_PUBKEY?: string;
  PUBNUB_FEEDS_SECRETKEY?: string;
};
export type ProjectsConf = {
  [key: string]: any;
};

// local var to declare type
const projectsConfLocal: ProjectsConf = projectsConf;

const getProjectConf = (): ProjectConf => {
  const { hostname } = window.location;
  const foundProject = projectsConfLocal[hostname] || projectsConfLocal.default;
  return { ...projectsConfLocal.default, ...foundProject };
};

export const projectConf = getProjectConf();
export const projectLocale = projectConf.locale;
export const projectSentryEnv = projectConf.SENTRY_ENV;
export const projectCookieDomain = projectConf.COOKIE_DOMAIN;
export const projectPubnubConf = {
  PUBNUB_CHANNEL_PREFIX: projectConf.PUBNUB_CHANNEL_PREFIX,
  PUBNUB_FEEDS_SUBKEY: projectConf.PUBNUB_FEEDS_SUBKEY,
  PUBNUB_FEEDS_PUBKEY: projectConf.PUBNUB_FEEDS_PUBKEY,
  PUBNUB_FEEDS_SECRETKEY: projectConf.PUBNUB_FEEDS_SECRETKEY,
};
