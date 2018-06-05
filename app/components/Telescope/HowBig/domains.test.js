import domains from './domains';

describe('domains', () => {
  it('should have solar system domain', () => {
    expect(domains.SOLAR_SYSTEM).toBeDefined();
  });

  it('should have star domain', () => {
    expect(domains.STAR).toBeDefined();
  });

  it('should have milky way domain', () => {
    expect(domains.MILKY_WAY).toBeDefined();
  });

  it('should have deep space domain', () => {
    expect(domains.DEEP_SPACE).toBeDefined();
  });
});
