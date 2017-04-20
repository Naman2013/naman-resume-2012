import { images300x250 } from '../../components/missions/mission-ad';

export function isNotEmptyObject(obj) {
  return typeof obj === 'object' && Object.keys(obj).length;
}

export function getRandomAdvertisementIndex() {
  return Math.floor(Math.random() * images300x250.length)
}
