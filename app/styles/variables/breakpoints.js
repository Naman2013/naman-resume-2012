export const SCREEN_SMALL = 320;
export const SCREEN_MEDIUM = 768;
export const SCREEN_LARGE = 1024;
export const SCREEN_XLARGE = 1366;

function createMediaQuery(size = 0) {
  return `screen and (min-width: ${size}px)`;
}
function createTabletMediaQuery() {
  return `screen and (max-width: ${SCREEN_LARGE}px) and (min-width: ${SCREEN_MEDIUM}px),`;
}

function createMobileMediaQuery() {
  return `screen and (min-width: ${SCREEN_SMALL}px) and (max-width: ${SCREEN_MEDIUM}px)`;
}

function createSmallMobileMediaQuery() {
  return `screen and (min-width: ${SCREEN_SMALL}px) and (max-width: 375px)`;
}

export const screenMedium = createMediaQuery(SCREEN_MEDIUM);
export const screenLarge = createMediaQuery(SCREEN_LARGE);
export const screenXLarge = createMediaQuery(SCREEN_XLARGE);
export const screenTablet = createTabletMediaQuery();
export const screenMobile = createMobileMediaQuery();
export const screenSmallMobile = createSmallMobileMediaQuery();

export const defaultScale = [screenMedium, screenLarge, screenXLarge];
export const tileScale = [
  createMediaQuery(620),
  createMediaQuery(940),
  createMediaQuery(940),
];
