import React from 'react';
import Responsive from 'react-responsive';
import { SCREEN_MEDIUM, SCREEN_LARGE } from 'app/styles/variables/breakpoints';

export const Desktop = props => {
  return (
    <Responsive {...props} minWidth={SCREEN_LARGE} />
  );
};

export const Tablet = props => {
  return (
    <Responsive
      {...props}
      minWidth={SCREEN_MEDIUM}
      maxWidth={SCREEN_LARGE - 1}
    />
  );
};

export const Mobile = props => {
  return (
    <Responsive {...props} maxWidth={SCREEN_MEDIUM - 1} />
  );
};
