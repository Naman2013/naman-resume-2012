import React from 'react';
import './styles.scss';

export const Popover = props => {
  const { isOpen, onHide, children } = props;
  return isOpen ? (
    <div className="custom-popover animated fadeIn faster">{children}</div>
  ) : null;
};
