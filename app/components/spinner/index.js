import React from 'react';
import TheSpinner from './Spinner';

export const Spinner = props => {
  const { loading, text, transparent } = props;
  return loading ? <TheSpinner text={text} transparent={transparent} /> : null;
};
