import { convertStartTime } from './';

describe('convertStartTime', () => {
  it('should return empty when invalid time is provided', () => {
    expect(convertStartTime()).toBe('');
  });

  it('should return the time format as hh:mmA', () => {
    expect(convertStartTime(1499570100)).toBe('11:15PM');
  });
});
