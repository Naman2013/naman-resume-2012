import React from 'react';
import TheSpinner from './Spinner';

export const Spinner = props => {
  const { loading, text, transparent, style } = props;
  return loading ? <TheSpinner text={text} transparent={transparent} style={style}/> : null;
};
