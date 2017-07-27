import purgeHashURL from './purgeHashURL';

describe('purge hash from url', () => {
  const TEST_URL = '#telescope-details/123/123';
  const TEST_EXPECTED_RESULT = 'telescope-details/123/123';

  it('should remove the hash from the URL', () => {
    expect(purgeHashURL(TEST_URL)).toBe(TEST_EXPECTED_RESULT);
  });
});
