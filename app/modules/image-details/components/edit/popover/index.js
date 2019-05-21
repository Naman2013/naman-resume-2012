import React from 'react';
import './styles.scss';

export const Popover = props => {
  const { isOpen, onHide, children, header, fullSize } = props;
  const cls = 'custom-popover animated fadeIn faster';
  return isOpen ? (
    <div className={fullSize ? `${cls} full-size` : cls}>
      {header ? <h2 className="custom-popover-header">{header}</h2> : null}
      <div className="custom-popover-body">{children}</div>
    </div>
  ) : null;
};
