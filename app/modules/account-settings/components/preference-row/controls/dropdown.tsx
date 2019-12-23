import React from 'react';
import { Select } from 'app/components/common/select';

type OptionToggleRowProps = {
  value: boolean;
  settingsKey: string;
  possibleValues: any;
  onChange: (settingsKey: string, settingsValue: string) => void;
};

export const Dropdown: React.FC<OptionToggleRowProps> = React.memo(props => {
  const { value, possibleValues, settingsKey, onChange } = props;

  const options = Object.keys(possibleValues).map(item => ({
    label: item,
    value: possibleValues[item],
  }));

  return (
    <Select
      handleChange={(value: string): void => onChange(settingsKey, value)}
      options={options}
      value={value}
    />
  );
});
