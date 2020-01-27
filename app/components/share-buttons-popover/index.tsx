import React from 'react';
import cx from 'classnames';
import './styles.scss';

export const ShareButtonsPopover = (props: any) => {
  const { children, isOpen } = props;
  return (
    <div className={cx('share-buttons-popover', { open: isOpen })}>
      {children}
    </div>
  );
};
