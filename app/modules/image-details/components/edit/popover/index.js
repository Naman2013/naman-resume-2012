import React from 'react';
import './styles.scss';

export const Popover = props => {
  const { isOpen, onHide, children, header } = props;
  return isOpen ? (
    <div className="custom-popover animated fadeIn faster">
      {header ? <h2 className="custom-popover-header">{header}</h2> : null}
      <div className="custom-popover-body">{children}</div>
    </div>
  ) : null;
};
