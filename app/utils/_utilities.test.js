import SETTINGS from '../config';
import generateInlineURL from './generateInlineURL';
import purgeHashURL from './purgeHashURL';

describe('purge hash from url', () => {
  const TEST_URL = '#telescope-details/123/123';
  const TEST_EXPECTED_RESULT = 'telescope-details/123/123';

  it('should remove the hash from the URL', () => {
    expect(purgeHashURL(TEST_URL)).toBe(TEST_EXPECTED_RESULT);
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
