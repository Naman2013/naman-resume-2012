import SETTINGS from '../config';
import purgeHashURL from './purgeHashURL';

export default function generateInlineURL(URL) {
  if (SETTINGS.isHashHistory()) {
    return URL;
  }

  return purgeHashURL(URL);
}
