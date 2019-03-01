import React from 'react';
import './styles.scss';

export const Box = props => {
  const { header, children } = props;
  return (
    <div className="box">
      <div className="box-header">{header}</div>
      <div className="box-body">{children}</div>
    </div>
  );
};
