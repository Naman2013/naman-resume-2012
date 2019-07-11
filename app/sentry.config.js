import * as Sentry from '@sentry/browser';

const dsnConf = {
  // slooh-llc-test sentry project
  TEST: 'https://ca0d77d796b94c81b5903cd3d17306e1@sentry.io/1501742',
  // webapp sentry project
  PRODUCTION: 'https://bc063dd1bbeb4509a04605076d008c26@sentry.io/264781',
};

const dsn = dsnConf[process.env.SENTRY_ENV];

Sentry.init({ dsn });
