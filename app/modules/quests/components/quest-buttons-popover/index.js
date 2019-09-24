import React from 'react';
import cn from 'classnames';
import './styles.scss';

export const QuestButtonsPopover = props => {
  const { children, isOpen } = props;

  return (
    <div className={cn('quest-buttons-popover', { open: isOpen })}>
      {children}
    </div>
  );
};
