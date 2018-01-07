import requestRestart from './utils/crash-application';

window.onerror = function sloohWindowError(event, source, lineno, colno, error) {
  console.log(event);
  console.log('=========');
  console.log(source);
  console.log('=========');
  console.log(lineno);
  console.log('=========');
  console.log(colno);
  console.log('=========');
  console.log(error);
  console.log('=========');
  requestRestart();
};
