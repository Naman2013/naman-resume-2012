import SETTINGS, { HASH } from './config';

describe('isHashHistory', () => {
  it('by default, return true when the history is set to hash', () => {
    if (SETTINGS.isHashHistory()) {
      expect(SETTINGS.isHashHistory()).toBeTruthy();
    }

    expect(SETTINGS.isHashHistory()).toBeFalsy();
  });

  it('when set to anything other than hash, returns false', () => {
    SETTINGS.setHistoryType();
    expect(SETTINGS.isHashHistory()).toBeFalsy();
  });
});

describe('setHistoryType', () => {
  it('changes the history type when called', () => {
    SETTINGS.setHistoryType('sandwich');
    expect(SETTINGS.historyType).toBe('sandwich');
  });
});

describe('resetToDefault', () => {
  it('resets back to hash when reset is called', () => {
    SETTINGS.setHistoryType('sandwiches');
    SETTINGS.resetToDefault();
    expect(SETTINGS.historyType).toBe(HASH);
  });
});

describe('historyType', () => {
  it('should provide back the historyType when called', () => {
    expect(SETTINGS.historyType).toBe(HASH);
  });
});
