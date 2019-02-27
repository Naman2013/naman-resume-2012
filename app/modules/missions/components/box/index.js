import React from 'react';
import cx from 'classnames';
import './styles.scss';

export const Box = props => {
  const { children, inside } = props;
  const classNames = cx({
    box: true,
    inside,
  });
  return <div className={classNames}>{children}</div>;
};
