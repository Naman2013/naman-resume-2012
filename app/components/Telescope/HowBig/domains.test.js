import domains from './domains';

describe('domains', () => {
  it('should have solar system domain', () => {
    expect(domains.SOLAR_SYSTEM).toBeDefined();
    expect(domains.SOLAR_SYSTEM.render).toBeDefined();
    expect(domains.SOLAR_SYSTEM.titleText).toBeDefined();
  });

  it('should have star domain', () => {
    expect(domains.STAR).toBeDefined();
    expect(domains.STAR.render).toBeDefined();
    expect(domains.STAR.titleText).toBeDefined();
  });

  it('should have milky way domain', () => {
    expect(domains.MILKY_WAY).toBeDefined();
    expect(domains.MILKY_WAY.render).toBeDefined();
    expect(domains.MILKY_WAY.titleText).toBeDefined();
  });

  it('should have deep space domain', () => {
    expect(domains.DEEP_SPACE).toBeDefined();
    expect(domains.DEEP_SPACE.render).toBeDefined();
    expect(domains.DEEP_SPACE.titleText).toBeDefined();
  });
});
