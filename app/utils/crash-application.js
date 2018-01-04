/**
  Utilities and methods associated with crashing the application
  these methods should only use native browser APIs.
  Due to the nature of these events we are working in a space of uncertainty,
  meaning there is no gurantee that even the UI libraries have loaded
  correctly.
*/

import renderVanilla from './render-vanilla';

export function requestRestart() {
  console.log('Paint application restart');
}
