export declare interface IAccountPreferences extends StandardResponse {
  pageHeading1: number;
  explanationText: string;
  gravityEarnedInThisRequest: boolean;
  settings: Array<AccountPreferencesItem>;
}

export declare interface AccountPreferencesItem {
  settingsKey: string;
  description: string;
  valueType: string;
  currentValue: boolean | string;
  possibleValues: object;
}
