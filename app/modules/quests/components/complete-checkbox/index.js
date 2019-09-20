import React from 'react';
import './styles.scss';
import cx from 'classnames';

export const CompleteCheckbox = props => {
  const { completed, onChange, sm, iconUrl } = props;
  return (
    <div className={cx('quest-complete-checkbox', { completed, sm })}>
      {iconUrl ? (
        <img src={iconUrl} alt="" />
      ) : (
        <div className="icon icon-tick" />
      )}
    </div>
  );
};
