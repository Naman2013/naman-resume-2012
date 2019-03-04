import React from 'react';
import TheSpinner from './Spinner';

export const Spinner = props => {
  const { loading } = props;
  return loading ? <TheSpinner /> : null;
};
