import projectsConf from '../../project-config.json';

export type ProjectConf = {
  SENTRY_ENV?: string;
  PUBNUB_CHANNEL_PREFIX?: string;
  COOKIE_DOMAIN?: string;
  locale: string;
  productID: number | string;
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
