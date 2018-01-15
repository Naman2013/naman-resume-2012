import requestRestart from './utils/crash-application';

window.onerror = function sloohWindowError(msg, url, lineNo, columnNo, error) {
  console.warn('CRASH: Application crash detected.');
  // requestRestart();
};
