import React from 'react';
import { Container } from 'react-bootstrap';
import { PreferenceRow } from 'app/modules/account-settings/components/preference-row';
import {
  AccountPreferencesItem,
  IAccountPreferences,
} from 'app/modules/account-settings/types.ts';
import './styles.scss';

type AccountPreferencesProps = {
  accountPreferences: IAccountPreferences;
  setAccountPreference: (payload: object) => void;
};

export const AccountPreferences: React.FC<AccountPreferencesProps> = React.memo(
  props => {
    const { accountPreferences, setAccountPreference } = props;

    const { pageHeading1, explanationText, settings } = accountPreferences;

    const setAccountPreferenceAction = (
      settingsKey: string,
      settingsValue: string | boolean
    ) => {
      setAccountPreference({ settingsKey, settingsValue });
    };

    return (
      <Container className="account-preferences">
        <div className="account-preferences-header i-box-white">
          <div className="account-preferences-header-inner">
            <h2 className="h-2 h-2-lg h-2-bold">{pageHeading1}</h2>

            <hr className="hr" />

            {explanationText}
          </div>

          <div className="account-preferences-header-icon">
            <div className="icon-wrapper">
              <div className="icon-inner">
                <span className="icon-notifications" />
              </div>
            </div>
          </div>
        </div>

        <div className="account-preferences-items">
          {settings &&
            settings.map((item: AccountPreferencesItem) => (
              <PreferenceRow
                {...item}
                key={item.settingsKey}
                type={item.valueType}
                label={item.description}
                settingsKey={item.settingsKey}
                value={item.currentValue}
                onChange={setAccountPreferenceAction}
              />
            ))}
        </div>
      </Container>
    );
  }
);
