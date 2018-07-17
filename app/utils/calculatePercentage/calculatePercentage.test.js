import calculatePercentage from './calculatePercentage';

describe('calculatePercentage', () => {
  it('given number `x` and percentage `y`, returns the number that represents the percentage of `x`', () => {
    expect(calculatePercentage(50, 50)).toEqual(25);
    expect(calculatePercentage(100, 25)).toEqual(25);
    expect(calculatePercentage(100, 200)).toEqual(200);
  });

  describe('default behavior', () => {
    it('when given no arguments, returns 0', () => {
      expect(calculatePercentage()).toEqual(0);
    });
  });
});
