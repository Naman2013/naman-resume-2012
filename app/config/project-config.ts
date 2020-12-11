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
  loadHtmlFile?: string;
  GOOGLE_OPTIMIZE_EXPERIMENT_IDS?: { [key: string]: string };
  GOOGLE_API_RECAPTCHA_V3_KEY?: string;
  GOOGLE_API_RECAPTCHA_V2_KEY?: string;
  guestHomepageURL?: string;
};
export type ProjectsConf = {
  [key: string]: any;
};

const loadHtml = (filePath: string): Promise<any> =>
  window
    .fetch(filePath)
    .then(resp => resp.text())
    .then(html =>
      document.body.insertBefore(
        document.createRange().createContextualFragment(html),
        document.body.firstChild
      )
    );

// local var to declare type
const projectsConfLocal: ProjectsConf = projectsConf;

const getProjectConf = (): ProjectConf => {
  const { hostname } = window.location;
  const foundProject = projectsConfLocal[hostname] || projectsConfLocal.default;
  loadHtml(foundProject.loadHtmlFile);
  return { ...projectsConfLocal.default, ...foundProject };
};

export const projectConf = getProjectConf();
export const projectLocale = projectConf.locale;
export const projectProductId = projectConf.productID;
export const projectSentryEnv = projectConf.SENTRY_ENV;
export const projectCookieDomain = projectConf.COOKIE_DOMAIN;
export const projectPubnubConf = {
  PUBNUB_CHANNEL_PREFIX: projectConf.PUBNUB_CHANNEL_PREFIX,
  PUBNUB_FEEDS_SUBKEY: projectConf.PUBNUB_FEEDS_SUBKEY,
  PUBNUB_FEEDS_PUBKEY: projectConf.PUBNUB_FEEDS_PUBKEY,
  PUBNUB_FEEDS_SECRETKEY: projectConf.PUBNUB_FEEDS_SECRETKEY,
};

export const projectGoogleOptimizeExpirianceId =
  projectConf.GOOGLE_OPTIMIZE_EXPERIMENT_IDS;
  
export const googleRecaptchaConfig = {
    CAPTCHA_KEY_V3: projectConf.GOOGLE_API_RECAPTCHA_V3_KEY,
    CAPTCHA_KEY_V2: projectConf.GOOGLE_API_RECAPTCHA_V2_KEY,
}

export const guestDashboardUrl = projectConf.guestHomepageURL;