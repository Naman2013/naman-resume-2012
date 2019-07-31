import React from 'react';
import './styles.scss';
import cx from 'classnames';

export const CompleteCheckbox = props => {
  const { completed, onChange, sm } = props;
  return (
    <div className={cx('quest-complete-checkbox', { completed, sm })}>
      <div className="icon icon-tick" />
    </div>
  );
};
