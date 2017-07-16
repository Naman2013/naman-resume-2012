import moment from 'moment';

export function convertStartTime(timestamp = 0) {
  return moment.unix(timestamp).format('hh:mmA');
}
