import React from 'react';
import TheSpinner from './Spinner';

export const Spinner = props => {
  const { loading, text } = props;
  return loading ? <TheSpinner text={text} /> : null;
};
