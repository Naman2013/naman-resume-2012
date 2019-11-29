import { MOBILE_SIZE, TABLET_SIZE, DESKTOP_SIZE } from 'app/constants.ts';

export const isExtraMobileDevice = (): boolean => {
  return window.screen.width < MOBILE_SIZE;
};

export const isMobileDevice = (): boolean => {
  return window.screen.width < TABLET_SIZE;
};

export const isMobileScreen = (): boolean => {
  return window.innerWidth <= MOBILE_SIZE;
};

export const isTabletScreen = (): boolean => {
  const screenWidth = window.innerWidth;
  return screenWidth > MOBILE_SIZE && screenWidth <= TABLET_SIZE;
};

export const isDesktopDevice = (): boolean => {
  return window.screen.width >= DESKTOP_SIZE;
};
