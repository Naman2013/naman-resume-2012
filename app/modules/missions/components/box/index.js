import React from 'react';

export const Box = props => {
  const { children } = props;
  return <div className="box">{children}</div>;
};
