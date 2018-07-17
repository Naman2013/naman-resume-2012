import convertToDecimal from './convertToDecimal';

describe('convertToDecimal', () => {
  it('should take any number and convert it to decimal', () => {
    const halfWay = 50;
    const quarterWay = 25;
    const oneFloat = 5.25;

    expect(convertToDecimal(halfWay)).toEqual(0.5);
    expect(convertToDecimal(quarterWay)).toEqual(0.25);
    expect(convertToDecimal(oneFloat)).toEqual(0.0525);
  });

  describe('when not provided any arguments', () => {
    it('should return 0', () => {
      expect(convertToDecimal()).toEqual(0);
    });
  });
});
