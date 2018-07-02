import { Enum } from 'enumify';

const DESKTOP_MINIMUM_PIXELS = 769;
const TABLET_MAXIMUM_PIXELS = 768;
const TABLET_MINIMUM_PIXELS = 641;
const MOBILE_MAXIMUM_PIXELS = 640;
const MOBILE_MINIMUM_PIXELS = 0;

class DeviceConfiguration extends Enum {}
DeviceConfiguration.initEnum({
  DESKTOP: {
    get min() { return DESKTOP_MINIMUM_PIXELS; },
  },
  TABLET: {
    get max() { return TABLET_MAXIMUM_PIXELS; },
    get min() { return TABLET_MINIMUM_PIXELS; },
  },
  MOBILE: {
    get max() { return MOBILE_MAXIMUM_PIXELS; },
    get min() { return MOBILE_MINIMUM_PIXELS; },
  },
});

export const isDesktop = currentWidth =>
  currentWidth > DeviceConfiguration.DESKTOP.min;

export const isTablet = currentWidth =>
  currentWidth > DeviceConfiguration.TABLET.min &&
  currentWidth < DeviceConfiguration.TABLET.max;

export const isMobile = currentWidth =>
  currentWidth > DeviceConfiguration.MOBILE.min &&
  currentWidth < DeviceConfiguration.MOBILE.max;

export default DeviceConfiguration;
