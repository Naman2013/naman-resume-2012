import React from 'react';
import './styles.scss';

export const Box = props => {
  const { header, children } = props;
  return (
    <div className="box">
      <div className="box-header">
        <h3 className="h3-custom">{header}</h3>
      </div>
      <div className="box-body">{children}</div>
    </div>
  );
};
