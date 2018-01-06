import requestRestart from './utils/crash-application';

window.onerror = function sloohWindowError(event, source, lineno, colno, error) {
  requestRestart();
};

throw new Error();
