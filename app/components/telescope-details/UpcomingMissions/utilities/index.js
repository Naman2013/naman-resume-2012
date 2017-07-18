import moment from 'moment';

export function convertStartTime(timestamp) {
  if (!timestamp) {
    return '';
  }
  return moment.unix(timestamp).format('hh:mmA');
}
