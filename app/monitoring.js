import requestRestart from './utils/crash-application';

window.onerror = function sloohWindowError(msg, url, lineNo, columnNo, error) {
  const BLACK_LIST = ['bootstrap'];
  for (let i = 0; i < BLACK_LIST.length; i += 1) {
    if (msg.indexOf(BLACK_LIST[i].length) >= 0) {
      requestRestart();
      break;
    }
  }
};
