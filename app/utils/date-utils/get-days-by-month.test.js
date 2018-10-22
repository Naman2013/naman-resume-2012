import getDaysByMonth from './get-days-by-month';

describe('getDaysByMonth', () => {
  it('given a year and month, provide the correct amount of days - including leap year', () => {
    const daysInJan = getDaysByMonth(1, 2018);
    const daysInFeb = getDaysByMonth(2, 2018);
    const daysInPreviousLeapYear = getDaysByMonth(2, 2016);
    expect(daysInJan).toEqual(31);
    expect(daysInFeb).toEqual(28);
    expect(daysInPreviousLeapYear).toEqual(29);
  });
});
