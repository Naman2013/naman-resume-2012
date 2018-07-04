import { Enum } from 'enumify';

const DESKTOP_MINIMUM_PIXELS = 1024;
const TABLET_MINIMUM_PIXELS = 768;

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
  currentWidth > DeviceConfiguration.TABLET.min &&
  currentWidth < DeviceConfiguration.DESKTOP.min;

export const isMobile = currentWidth =>
  !isDesktop(currentWidth) && !isTablet(currentWidth)

export default DeviceConfiguration;
