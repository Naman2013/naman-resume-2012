import SETTINGS from '../config';
import generateInlineURL from './generateInlineURL';
import purgeHashURL from './purgeHashURL';
import useAbsoluteURL from './useAbsoluteURL';

describe('purge hash from url', () => {
  const TEST_URL_A = '#telescope-details/123/123';
  const TEST_EXPECTED_RESULT_A = 'telescope-details/123/123';

  const TEST_URL_B = 'https://saturn.slooh.com/working-saturn/dist/#/discussions/main/most-recent';
  const TEST_EXPECTED_RESULT_B = '/discussions/main/most-recent';

  const TEST_URL_C = '/discussions/main/most-recent';
  const TEST_EXPECTED_RESULT_C = '/discussions/main/most-recent';

  it('should remove the hash from the URL', () => {
    expect(purgeHashURL(TEST_URL_A)).toBe(TEST_EXPECTED_RESULT_A);
    expect(purgeHashURL(TEST_URL_B)).toBe(TEST_EXPECTED_RESULT_B);
    expect(purgeHashURL(TEST_URL_C)).toBe(TEST_EXPECTED_RESULT_C);
  });
});

describe('generate inline URL based on the history type global', () => {
  it('should return the hashed URL when history mode is hashed', () => {
    const testURL = generateInlineURL('#/test-url');
    expect(testURL).toBe('#/test-url');
  });

  it('should purge the hash when the setting is non-hash', () => {
    SETTINGS.setHistoryType();
    const testURL = generateInlineURL('#/test-url');
    expect(testURL).toBe('/test-url');
  });
});

describe('use absolute URL', () => {
  const TEST_A = 'https://www.amazon.com/sandwiches';
  const TEST_B = 'https://www.slooh.com';
  const TEST_C = 'slooh.com';
  const TEST_D = 'slooh.com/join.php';

  it('should return true when non-slooh domain', () => {
    expect(useAbsoluteURL(TEST_A)).toBeTruthy();
    expect(useAbsoluteURL(TEST_B)).toBeFalsy();
    expect(useAbsoluteURL(TEST_C)).toBeFalsy();
    expect(useAbsoluteURL()).toBeFalsy();
    expect(useAbsoluteURL(TEST_D)).toBeTruthy();
  });
});
