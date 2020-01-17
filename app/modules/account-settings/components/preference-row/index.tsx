import React from 'react';
import './styles.scss';
import { Toggle } from 'app/modules/account-settings/components/preference-row/controls/toggle';
import { Dropdown } from 'app/modules/account-settings/components/preference-row/controls/dropdown';

type OptionToggleRowProps = {
  type: string;
  label: string;
  value: string | boolean;
  settingsKey: string;
  possibleValues: object;
  onChange: (settingsKey: string, settingsValue: string | boolean) => void;
};

const PreferenceControlsMapping: any = {
  toggle: Toggle,
  dropdown: Dropdown,
};

export const PreferenceRow: React.FC<OptionToggleRowProps> = React.memo(
  props => {
    const { value, possibleValues, label, type, settingsKey, onChange } = props;

    const PreferenceControl = PreferenceControlsMapping[type];

    return (
      <div className="preference-row i-box-white">
        <div className="preference-label">{label}</div>

        <div className="preference-control">
          <PreferenceControl
            settingsKey={settingsKey}
            value={value}
            possibleValues={possibleValues}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
);
