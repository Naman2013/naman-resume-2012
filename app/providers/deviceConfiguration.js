import { Enum } from 'enumify';

const DESKTOP_MINIMUM_PIXELS = 1024;
const TABLET_MINIMUM_PIXELS = 768;

export const SCREEN_MEDIUM = 768;
export const SCREEN_LARGE = 1024;
export const SCREEN_XLARGE = 1366;


class DeviceConfiguration extends Enum {}
DeviceConfiguration.initEnum({
  DESKTOP: {
    get min() { return DESKTOP_MINIMUM_PIXELS; },
  },
  TABLET: {
    get min() { return TABLET_MINIMUM_PIXELS; },
  },
});

export const isDesktop = currentWidth =>
  currentWidth > DeviceConfiguration.DESKTOP.min;

export const isTablet = currentWidth =>
  !isDesktop(currentWidth) && currentWidth > DeviceConfiguration.TABLET.min;

export const isMobile = currentWidth =>
  !isDesktop(currentWidth) && !isTablet(currentWidth);

export const isScreenMedium = currentWidth => currentWidth >= SCREEN_MEDIUM;
export const isScreenLarge = currentWidth => currentWidth >= SCREEN_LARGE;
export const isScreenXLarge = currentWidth => currentWidth >= SCREEN_XLARGE;

export default DeviceConfiguration;
