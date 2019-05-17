// @flow

import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

type TDatepicker = {
  onChange: Function,
  value: any,
  outputFormat: string,
};

const handleOnChange = (props: TDatepicker, selectedDate: Moment) => {
  const { onChange, outputFormat } = props;
  onChange(selectedDate && selectedDate.format(outputFormat || 'YYYY-MM-DD'));
};

export const Datepicker = (props: TDatepicker) => {
  const { value, outputFormat } = props;
  const [isFocused, setFocus] = useState(false);
  const [momentValue, setMomentValue] = useState(null);

  useEffect(() => {
    if (value) {
      setMomentValue(moment(value, outputFormat || 'YYYY-MM-DD'));
    }
  }, [outputFormat, value]);

  return (
    <SingleDatePicker
      date={momentValue} // momentPropTypes.momentObj or null
      onDateChange={(selectedDate: Moment) =>
        handleOnChange(props, selectedDate)
      } // PropTypes.func.isRequired
      focused={isFocused} // PropTypes.bool
      onFocusChange={({ focused }) => setFocus(focused)} // PropTypes.func.isRequired
      id="your_unique_id" // PropTypes.string.isRequired,
      numberOfMonths={1}
      hideKeyboardShortcutsPanel
      isOutsideRange={() => false} // making past dates available
    />
  );
};
