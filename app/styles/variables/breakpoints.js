export const SCREEN_SMALL = 320;
export const SCREEN_MEDIUM = 768;
export const SCREEN_LARGE = 1024;
export const SCREEN_XLARGE = 1366;

function createMediaQuery(size = 0) {
  return `screen and (min-width: ${size}px)`;
}

export const screenMedium = createMediaQuery(SCREEN_MEDIUM);
export const screenLarge = createMediaQuery(SCREEN_LARGE);
export const screenXLarge = createMediaQuery(SCREEN_XLARGE);

export const defaultScale = [screenMedium, screenLarge, screenXLarge];
export const tileScale = [createMediaQuery(620), createMediaQuery(940), createMediaQuery(940)];
