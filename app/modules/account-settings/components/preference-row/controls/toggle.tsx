import React from 'react';
import { Form } from 'react-bootstrap';

type OptionToggleRowProps = {
  value: boolean;
  settingsKey: string;
  onChange: (settingsKey: string, settingsValue: boolean) => void;
};

export const Toggle: React.FC<OptionToggleRowProps> = React.memo(props => {
  const { value, settingsKey, onChange } = props;

  return (
    <Form.Check
      label=""
      id={settingsKey}
      checked={value}
      onChange={(): void => onChange(settingsKey, !value)}
    />
  );
});
