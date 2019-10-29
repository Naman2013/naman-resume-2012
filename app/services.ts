import { MOBILE_SIZE, TABLET_SIZE, DESKTOP_SIZE } from 'app/constants.ts';

export const isExtraMobileDevice = (): boolean => {
  return screen.width < MOBILE_SIZE;
};

export const isMobileDevice = (): boolean => {
  return screen.width < TABLET_SIZE;
};

export const isDesktopDevice = (): boolean => {
  return screen.width >= DESKTOP_SIZE;
};
